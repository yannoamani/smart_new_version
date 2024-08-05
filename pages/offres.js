import {
  FlatList,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Alert,
  LogBox,
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
      <View style={offerStyle.card}>
        <Pressable
          onPress={() => {
            //  navigation.navigate("Offer", { id: item.id, already: item });
            getData(item);
          }}
        >
         <View style={offerStyle.item}>
         <View style={offerStyle.image}>
            <Image
              source={{
                uri: "https://new.newpowerjuca.com/templates/empower/images/job.png",
              }}
              style={offerStyle.imageSize}
            />
          </View>
          <View style={{width:'2%'}}></View>
          <Text  style={offerStyle.title}  numberOfLines={1}
        ellipsizeMode="tail">{item.nom_offre.toUpperCase()} - {item.entreprise.nom.toUpperCase()}</Text>
         </View>
         <View style={{height:10}}></View>
         <Text style={offerStyle.categorie}>{item.categorie.categorie}</Text>
         <View style={{height:10}}></View>
         <View style={offerStyle.containerRow}>
         <Ionicons
                name={ "location-sharp"}
                color={'gray'}  
                size={24}
              ></Ionicons>
              <View style={{width:5}}></View>
              <Text style={offerStyle.categorie}>{item.lieu}</Text>
              
            

         </View>
         {/* <View style={{height:10}}></View> */}
        
        {/* <Text style={style1.expire}>L'offre prend fin le {item.fin.split(' ')[0]}</Text> */}




          <Text style={style1.posteItem}>
            {/* {token}
                        Offre : {item.nom_offre.toUpperCase()} ({item.categorie.categorie}) {"\n"}
                        Du {item.debut.split(' ')[0]} au {item.fin.split(' ')[0]} */}
          </Text>
          {/* <Text style={styles.itemText}>
            Lieu : {item.lieu.toUpperCase()}, Employeur :{" "}
            {item.entreprise.nom.toUpperCase()}
          </Text>
          <Text style={styles.itemText}>
            Posté le : {time.date} à {time.hour}
          </Text> */}
          <Text style={offerStyle.publlication}>
            Posté le {time.date} à {time.hour}
          </Text>
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
