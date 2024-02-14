import { FlatList, View, Text, Pressable, ScrollView } from "react-native";
import styles from '../styles';
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
            <View style={styles.item}>
                <Pressable onPress={() => {
                    navigation.navigate("Appliance", { id: item.id });
                }}>
                    <Text style={styles.itemText}>
                        Offre : {item.nom_offre.toUpperCase()} ({item.categorie.categorie}) {"\n"}
                        Du {item.debut} au {item.fin}
                    </Text>
                    <Text style={styles.itemText}>
                        Lieu : {item.lieu.toUpperCase()}, Employeur : {item.entreprise.nom.toUpperCase()}
                    </Text>
                    <Text style={styles.itemText}>
                        Posté le : {time.date} à {time.hour}
                    </Text>
                    <Text style={{
                            position: "absolute",
                            right: '2%',
                            bottom: '1%'
                        }}>
                    {
                        item.pivot.recruit == 1 ?
                        <Ionicons color={"lightgreen"} name="checkmark-done-circle-outline" size={25} /> : <></>
                    }
                    </Text>
                </Pressable>
            </View>
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
