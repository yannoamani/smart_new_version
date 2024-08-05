import { FlatList,ActivityIndicator , View, Text, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./styles/edtStyle";
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
            <View style={style.card}>
                <Pressable onPress={() => {
                        navigation.navigate("EditSched", { expR: item });
                    }}
                    //disabled = {isBeforeToday()}
                >
                    <Text style={style.itemCard}>
                        Jour : {item.jour}
                    </Text>
                    <View style={{height:10}}></View>
                    <Text style={style.itemCard}>
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
                        color="red"
                    />
                </Pressable>
            </View>
        );
    };

    return (
        <View style={style.container}>
                {data ? (
                        <FlatList
                        style={{ width: "100%" }}
                        renderItem={renderItem}
                        data={data}
                        ListEmptyComponent={<Text style={styles.titleText}>Aucune plages horaires</Text>}
                        keyExtractor={item => item.id.toString()}
                        onRefresh={fetchOffers}
                        refreshing={refreshing} />
                ) : (
                    <ActivityIndicator  style={{ flex: 1 ,alignItems: 'center', justifyContent: 'center'}}size="large" color="black" />
                )}
                <Ionicons name="add-circle-outline" onPress={() => goToAddSched()} size={65} style={{
                            position: "absolute",
                            right: 10, bottom: 10, color: "black"
                        }} />
        </View>
    );
}
