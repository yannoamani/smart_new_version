import { FlatList, View, Text, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Schedules() {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const token = AsyncStorage.getItem('token')
    const goToAddSched = () => {
        navigation.navigate("AddSched");
    }
    const getOffers = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('get_schedule');
            setData(res.data.data);
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };

    const fetchOffers = () => {
        setRefreshing(true);
        getOffers();
    };

    useEffect(() => {
        // Fetch offers when the component mounts
        fetchOffers();

        // Set up an interval to fetch offers every 1 minute
        const intervalId = setInterval(fetchOffers, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const renderItem = ({ item }) => {
        const time = item.First_horaire.split('-')
        const isBeforeToday = () => {
            const today = new Date()
            const date = new Date(item.jour)
            return today > date
        }
        return (
            <View style={styles.item}>
                <Pressable onPress={() => {
                        navigation.navigate("EditSched", { expR: item });
                    }}
                    //disabled = {isBeforeToday()}
                >
                    <Text style={styles.itemText}>
                        Jour : {item.jour}
                    </Text>
                    <Text style={styles.itemText}>
                        De {time[0]} à {time[1]}
                    </Text>
                    <Ionicons
                        onPress={() => {
                            Alert.alert("Supprimer ?",'Voulez-vous supprimer cette plage horaire ?',[
                                {text: 'OUI', onPress: async () => {
                                    try {
                                        const del = await axios.delete('delete_schedule/'+ item.id)
                                        fetchOffers()
                                    } catch (error) {
                                        Alert.alert("Echec", error.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                    }
                                }},
                                {text: 'NON', onPress: async () => console.log('NON')},
                            ], { cancelable: true })
                            
                        }}
                        style={{
                        position: "absolute",
                        right: '2%',
                        top: '10%',
                        //margin: '2%'
                        }}
                        name="trash-outline"
                        size={30}
                        color="white"
                    />
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.container}>
                {data ? (
                        <FlatList
                        style={{ width: "100%" }}
                        renderItem={renderItem}
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        onRefresh={fetchOffers}
                        refreshing={refreshing} />
                ) : (
                    <Text style={styles.titleText}>Loading...</Text>
                )}
                <Ionicons name="add-circle-outline" onPress={() => goToAddSched()} size={65} style={{
                            position: "absolute",
                            right: 10, bottom: 10, color: "black"
                        }} />
        </View>
    );
}
