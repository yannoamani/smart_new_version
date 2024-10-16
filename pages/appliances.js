import { FlatList, View, Text, Pressable, StyleSheet, Image,ScrollView ,ActivityIndicator} from "react-native";
// import styles from '../pages/styles/offerStyle';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate, isDateTimeGreaterThanCurrent } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export default function AppliancesList() {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [refreshing, setRefreshing] = useState(false);
      const [policeBold, setPolices] = useState("Poppins_700Bold");
  const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
  const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");

    const toLowerCase = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    const getOffers = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('get_offres_postule');
            console.log("La liste de de mes offres", res.data.data.offres);
            setData(res.data.data.offres);
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
    console.log("abonnement",mabonnement);
    
    if (isDateTimeGreaterThanCurrent(mabonnement.echeance)) {
      // console.log("Vous ", abonement);
      verifierabonement();
      clearInterval(interval);
      
    }
    else{
    return ;
    }
   }

    
  }, 1000);

        // Set up an interval to fetch offers every 1 minute
        // const intervalId = setInterval(fetchOffers, 60000);

        // // Clean up the interval when the component unmounts
        // return () => clearInterval(intervalId);
    }, []);

    const renderItem = ({ item }) => {
        const time = displayDate(item.created_at);
        return (
            <Pressable onPress={() => {
                navigation.navigate("Appliance", { id: item.id , detailsOffres: item });
            }}>
           <View style={styles.card}>
    <View style={styles.item}>
        <View style={styles.iconContainer}>
            {item.pivot.recruit === 1 ? (
                <Ionicons name="checkmark-circle" size={25} color="#1A9E47" />
            ) : new Date() > new Date(item.fin) ? (
                <Ionicons name="close-circle-outline" size={25} color="red" />
            ) : (
                <Ionicons name="hourglass" size={25} color="#FFD233" />
            )}
        </View>
        <View style={styles.infoContainer}>
            <Text style={[styles.title,{fontFamily:policeRegular}]} numberOfLines={1} ellipsizeMode="tail">
                {item.nom_offre} - {item.entreprise.nom}
            </Text>
            <Text style={[styles.sub,{fontFamily:policeRegular}]} numberOfLines={1}>
                {item.categorie.categorie}
            </Text>
        </View>
    </View>

    <View style={styles.locationContainer}>
        <Ionicons name="location-outline" color={'black'} size={24} />
        <Text style={[styles.locationText,{fontFamily:policeLight}]}>{item.lieu}</Text>
    </View>
</View>

          
            
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            {/* <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    width: '100%',
                    padding: '0.5%',
                }}
            > */}
                {data ? (
                    <FlatList
                        style={{ width: "100%" }}
                        renderItem={renderItem}
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        onRefresh={fetchOffers}
                        refreshing={refreshing}
                    />
                ) : (
                    <View style={{height:'100%',justifyContent:'center',alignItems:'center', }}>
        <ActivityIndicator size="large" color="#F38B2B" />

        </View>
                )}
            {/* </ScrollView> */}
        </View>
    );
    
}
const styles = StyleSheet.create({
    container:{
    flex: 1,
    padding:10,
    backgroundColor:'#F1F2F4'
 },
 
    card: {
        backgroundColor: '#FFFFFF', // Couleur de fond de la carte
        borderRadius: 10, // Coins arrondis
        padding: 15, // Espacement interne
        marginVertical: 10, 
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2, 
        shadowRadius: 5, 
        elevation: 3, 
    },
    item: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
    },
    iconContainer: {
        width: 35, // Largeur fixe pour l'icône
        alignItems: 'center', // Centre l'icône
    },
    infoContainer: {
        flex: 1, // Prend tout l'espace restant
        paddingLeft: 10, // Espacement à gauche
    },
    title: {
        fontSize: 16, // Taille de la police du titre
        fontWeight: 'bold', // Mettre le titre en gras
        color: '#333', // Couleur du texte
    },
    sub: {
        fontSize: 14, // Taille de la police du sous-titre
        color: '#666', // Couleur du sous-titre
    },
    locationContainer: {
        flexDirection: 'row', // Alignement horizontal
        alignItems: 'center', // Alignement vertical
        marginTop: 10, // Espacement supérieur
    },
    locationText: {
        marginLeft: 5, // Espacement à gauche
        color: '#444', // Couleur du texte de localisation
        fontSize: 14, // Taille de la police de localisation
    },
});


