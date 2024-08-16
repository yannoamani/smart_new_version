import { FlatList, View,StyleSheet, Text,Image, Pressable, ScrollView } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Contacts() {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [already, setAlready] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true)
    const token = AsyncStorage.getItem('token')
    const getOffers = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('get_who_contact_student');
            setData(res.data.entreprises);
            setLoading(false)
            console.log("contacts", res.data);
            console.log("count", data.length);
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
        //const intervalId = setInterval(fetchOffers, 60000);

        // // Clean up the interval when the component unmounts
        //return () => clearInterval(intervalId);
    }, []);

    const renderItem = ({ item }) => {
    const time = displayDate(item.created_at);
  

    return (
      <View style={ style.container}>
        <Pressable
          onPress={() => {
            navigation.navigate("Contact", { data: item });
            
           // console.log(item.favoris)
            
           
          }}
        >
         <View style={style.rate}> 
         <Text style={style.titleText}>{item.pivot.offre.nom_offre.toUpperCase()}</Text>
      
         </View>
          <Text style={style.lieu}>{item.pivot.offre.nom_offre.lieu}</Text>
          
          <Text style={style.entreprise}>{item.nom}</Text>
          <View style={style.rowinfo}>
          <View style={style.contimage}>
            <Image source={require("../assets/emploijeune.png")} style={style.image}></Image>
          </View>
          <Text  numberOfLines={3} ellipsizeMode="tail" style={style.description}> {item.pivot.offre.description.toUpperCase().replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  ')}</Text>

          </View>
        
        </Pressable>
        
    
      </View>
    );
  };

    return (
        <View style={style.allContainer}>
    
                {data ? (
                    <FlatList
                        style={{ width: "100%" }}
                        renderItem={renderItem}
                        data={data}
                        keyExtractor={item => item.pivot.id}
                        onRefresh={fetchOffers}
                        refreshing={refreshing}
                        ListEmptyComponent={
                        <View style={{  }}>
                            <Text style={{ color: "gray", fontSize: 20, textAlign: "center",  }} >Aucune donnée</Text>
                        </View>
                        
                        }
                    />
                ) : (
                    <Text style={styles.titleText}>Aucune donnée</Text>
                )}
    
        </View>
    );
}
const style = StyleSheet.create({
    allContainer: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: "#F1F2F4",
        paddingHorizontal: 10,
        
    },
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
    flexShrink: 1 
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
  welcome:{
    fontSize:13,
    fontWeight:"300",
    marginBottom:5
  },
  name:{
    fontSize:15,
    fontWeight:"700",
    
    marginBottom:5
  },
})
