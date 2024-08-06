import {
  FlatList,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Alert,
  LogBox,
  StyleSheet
} from "react-native";
import styles from "../styles";
import style1 from "../offerStyle.js";
import offerStyle from "../pages/styles/offerStyle.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import style from "../offerStyle.js";

export default function List() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [already, setAlready] = useState(false);
  const [userId, setUserId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const token = AsyncStorage.getItem("token");
  const getOffers = async () => {
    try {
      data;
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      const res = await axios.get("list_offres");
      setData(res.data.data);
      console.log(res.data.data[0]);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const fetchOffers = () => {
    //setRefreshing(true);
    getOffers();
  };

  useEffect(() => {
    // Fetch offers when the component mounts
    fetchOffers();

    // Set up an interval to fetch offers every 1 minute
    // const intervalId = setInterval(fetchOffers, 60000);

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);
  const getData = async (item) => {
    try {
      // setAlready(false);
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // console.log(item);
        const user = JSON.parse(value);
        setUserId(user.id);
        const getusersId = [];
        const offres = item.students;

        // console.log('La liste etudiants',offres.find((element) => element['id'] == user.id));
        // navigation.navigate("Offer", { id: item.id, already: already });

        offres.forEach((offre) => {
          getusersId.push(offre["pivot"]["student_id"]);
        });

        if (getusersId.includes(user.id)) {
          console.log("tu as deja");
          // setAlready(true);
          // Alert.alert("Désolé", "Tu as déja postuler  à cette offre", [{ text: "OK", onPress: () => console.log("OK") }], { cancelable: true });
          navigation.navigate("Offer", { id: item.id, already: true , detailsOffres: item});
        } else {
          navigation.navigate("Offer", { id: item.id, already: false , detailsOffres: item});
        }

        console.log(getusersId);

        //  navigation.navigate("Offer", { id: item.id, already: false });
      }
    } catch (e) {
      console.error("Error reading value", e);
    }
  };

  const renderItem = ({ item }) => {
    const time = displayDate(item.created_at);
    return (
      <View style={ mystyle.container}>
        <Pressable
          onPress={() => {
            //  navigation.navigate("Offer", { id: item.id, already: item });
            getData(item);
          }}
        >
          <Text style={mystyle.titleText}>{item.nom_offre.toUpperCase()}</Text>
          <Text style={mystyle.lieu}>{item.lieu}</Text>
          
          <Text style={mystyle.entreprise}>{item.entreprise.nom}</Text>
          <View style={mystyle.rowinfo}>
          <View style={mystyle.contimage}>
            <Image source={require("../assets/emploijeune.png")} style={mystyle.image}></Image>
          </View>
          <Text  numberOfLines={3} ellipsizeMode="tail" style={mystyle.description}> {item.description.toUpperCase().replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  ')}</Text>

          </View>
        
        </Pressable>
      </View>
    );
  };

  return (
    <View style={offerStyle.container}>
      <View
      // style={{
      //     width: '100%',
      //     padding: '0.5%',
      // }}
      >
        {data ? (
          <FlatList
            style={{ width: "100%" }}
            renderItem={renderItem}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={fetchOffers}
            refreshing={refreshing}
            ListEmptyComponent={
              <Text style={styles.titleText}>Aucune offre</Text>
            }
          />
        ) : (
          <Text style={styles.titleText}>Loading...</Text>
        )}
      </View>
    </View>
  );
}

const mystyle = StyleSheet.create({
  container: {
  padding: 15,
  borderRadius: 15,
  backgroundColor: "white",
 
 
 
  marginTop: 30,
  shadowColor: '#000', // Couleur de l'ombre
  shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
  shadowOpacity: 0.5,
  shadowRadius: 2, // Rayon de l'ombre
 


  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#F38B2B",
    marginBottom: 7,
  },
  lieu: {
    fontSize: 10,
    fontWeight: "500",
    color: "#000",
    marginBottom: 7,
  },
  entreprise: {
    fontSize: 10,
    fontWeight: "300",
    color: "#000",
    marginBottom: 7,
  },
  rowinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contimage:{
    width: 43,
    height: 43,
   
    marginRight: 10,
   
  },
  image:{
  width: "100%",
  height: "100%",
 resizeMode: "contain"
  },
  description: {
    fontSize: 10,
    fontWeight: "300",
    color: "#000000",
  flex: 1
  },
});
