import { FlatList, View,StyleSheet, Text,Image, Pressable, ScrollView,ActivityIndicator } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate, isDateTimeGreaterThanCurrent } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import translateText from "../pages/store/TranslationUtils"
import { useSelector } from 'react-redux';


export default function Contacts() {
  const lang = useSelector((state) => state.translate.lang);
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [already, setAlready] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true)
    const token = AsyncStorage.getItem('token')
    const [policeBold, setPolices] = useState("Poppins_700Bold");
    const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
    const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");

    const getOffers = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('get_who_contact_student');
           
            setLoading(false)
            const myoffers=res.data.entreprises;
            const translateAll= await Promise.all(
                myoffers.map(async (offer) => {
                    return {
                        ...offer,
                        nom_offre: await translateText(offer.pivot.offre.nom_offre, lang),
                        description: await translateText(offer.pivot.offre.description, lang),
                    }
                })
            )
            setData(translateAll);
            console.log("contacts ", data);
            console.log("count");
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };
    const verifierabonement = async () => {
    try {
      // data;
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      const res = await axios.get("handleAbonnementExpired");
      setData(res.data.data);
     console.log('verification de mon paiement',res.data);
    } catch (error) {
      console.log(error);
       console.log("verifier paiement",error.response.data.message);
     
    }
    
  }

    const fetchOffers = () => {
        //setRefreshing(true);
        getOffers();
    };

    useEffect(() => {
        // Fetch offers when the component mounts
        fetchOffers();
        const interval= setInterval(async () => {
      const abonement = await AsyncStorage.getItem('abonnement');
        // console.log("abonnement",abonement);
   if (abonement) {
    const mabonnement = JSON.parse(abonement);
    // console.log("abonnement",mabonnement);
    
    if (isDateTimeGreaterThanCurrent(mabonnement.echeance)) {
      console.log("Vous ", abonement);
      verifierabonement();
      clearInterval(interval);
      
    }
    else{
    return ;
    }
   }

    
  }, 1000);

        

        // Set up an interval to fetch offers every 1 minute
        //const intervalId = setInterval(fetchOffers, 60000);

        // // Clean up the interval when the component unmounts
        //return () => clearInterval(intervalId);
    }, [lang]);

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
         <Text style={style.titleText}>{item.nom_offre.toUpperCase()}</Text>
      
         </View>
          <Text style={style.lieu}>{item.pivot.offre.nom_offre.lieu}</Text>
          
          <Text style={style.entreprise}>{item.nom}</Text>
          <View style={style.rowinfo}>
          <View style={style.contimage}>
            <Image source={require("../assets/emploijeune.png")} style={style.image}></Image>
          </View>
          <Text  numberOfLines={3} ellipsizeMode="tail" style={style.description}> {item.description.toUpperCase().replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  ')}</Text>

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
                  <View style={{height:'100%',justifyContent:'center',alignItems:'center', }}>
        <ActivityIndicator size="large" color="#F38B2B" />

        </View>
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
