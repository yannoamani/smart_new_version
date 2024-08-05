import { FlatList, View, Text, Pressable, ScrollView } from "react-native";
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
            console.log("contacts", res.data.entreprises);
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
        const time = displayDate(item.pivot.offre.created_at);
        return (
            <View style={styles.item}>
                <Pressable onPress={() => {
                    navigation.navigate("Contact", { data: item });
                }}>
                    <Text style={styles.itemText}>
                        {/* {token} */}
                        Offre : {item.pivot.offre.nom_offre.toUpperCase()} ({item.pivot.offre.categorie.categorie}) {"\n"}
                        Du {item.pivot.offre.debut} au {item.pivot.offre.fin}
                    </Text>
                    <Text style={styles.itemText}>
                        Lieu : {item.pivot.offre.lieu.toUpperCase()}, Employeur : {item.nom.toUpperCase()}
                    </Text>
                    <Text style={styles.itemText}>
                        Posté le : {time.date} à {time.hour}
                    </Text>
                    <Text style={{
                            position: "absolute",
                            right: '3%',
                            bottom: '3%'
                        }}>
                    {
                        item.pivot.recruit == 1 ?
                        <Ionicons color={"darkgreen"} name="checkmark-done-circle-outline" size={35} /> :
                        item.pivot.recruit == 2 ?
                        <Ionicons color={"red"} name="close-circle-outline" size={35} /> :
                        null
                    }
                    </Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: '100%',
                    padding: '0.5%',
                }}
            >
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
        </View>
    );
}
