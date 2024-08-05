import { FlatList, View, Text, Pressable,  Image,ScrollView } from "react-native";
import styles from '../pages/styles/offerStyle';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export default function AppliancesList() {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [refreshing, setRefreshing] = useState(false);

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
            console.log(res.data.data.offres);
            setData(res.data.data.offres);
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

    const renderItem = ({ item }) => {
        const time = displayDate(item.created_at);
        return (
            <Pressable onPress={() => {
                navigation.navigate("Appliance", { id: item.id , detailsOffres: item });
            }}>
            <View style={styles.card}>
            <View style={styles.item}>
               
                   <View style={styles.image}>
             {
                item.pivot.recruit==1?  <Ionicons name="checkmark-circle" size={30} color="green"></Ionicons>: <Ionicons name="hourglass" size={30} color="orange"></Ionicons>
             }
                   </View>
                   <View style={{width:3}}></View>
                   <Text  style={styles.title}  numberOfLines={1}
        ellipsizeMode="tail">{item.nom_offre.toUpperCase()} - {item.entreprise.nom.toUpperCase()}</Text>
           <View style={{height:10}}></View>
         
                  </View>
                  <Text style={styles.categorie}>{item.categorie.categorie}</Text>
         <View style={{height:10}}></View>
         <View style={styles.containerRow}></View>
         <View style={styles.containerRow}>
         <Ionicons
                name={ "location-sharp"}
                color={'gray'}  
                size={24}
              ></Ionicons>
              <View style={{width:5}}></View>
              <Text style={styles.categorie}>{item.lieu}</Text>
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
                    <Text style={styles.titleText}>Loading...</Text>
                )}
            {/* </ScrollView> */}
        </View>
    );
}
