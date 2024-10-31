import { FlatList,ActivityIndicator , View, Text, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./styles/edtStyle";
import { displayDate } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import translateText from "../pages/store/TranslationUtils"
import { useSelector } from 'react-redux';

export default function Schedules() {
    const lang = useSelector((state) => state.translate.lang);
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const token = AsyncStorage.getItem('token')
    const [Traduction, setTraduction] = useState({
        Jour: 'Jour',
        De: 'De',
        A: 'à',
        Supprimer: 'Supprimer',
        soustitre:"Voulez-vous supprimer cette plage d'horaires ?",
        Yes:"Oui",
        No:"Non"
    });
    const translate = async () => {
        const jour = await translateText(Traduction.Jour, lang);
        const de = await translateText(Traduction.De, lang);
        const a = await translateText(Traduction.A, lang);
        const supprimer = await translateText(Traduction.Supprimer, lang);
        const soustitre = await translateText(Traduction.soustitre, lang);
        const Yes = await translateText(Traduction.Yes, lang);
        const No = await translateText(Traduction.No, lang);
        setTraduction({
            Jour: jour,
            De: de,
            A: a,
            Supprimer: supprimer,
            soustitre: soustitre,
            Yes: Yes,
            No: No
        })
    }

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
        translate();

        // Set up an interval to fetch offers every 1 minute
        const intervalId = setInterval(fetchOffers, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [lang]);

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
                 {Traduction.Jour} : {item.jour}
                    </Text>
                    <View style={{height:10}}></View>
                    <Text style={style.itemCard}>
                    {Traduction.De} {time[0]} {Traduction.A} {time[1]}
                    </Text>
                    <Ionicons
                        onPress={() => {
                            Alert.alert(Traduction.Supprimer, Traduction.soustitre,[
                                {text: Traduction.No, onPress: async () => console.log('NON')},
                                {text: Traduction.Yes, onPress: async () => {
                                    try {
                                        const del = await axios.delete('delete_schedule/'+ item.id)
                                        fetchOffers()
                                    } catch (error) {
                                        Alert.alert("Echec", error.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                    }
                                }},
                              
                            ], { cancelable: true })
                            
                        }}
                        style={{
                        position: "absolute",
                        right: '2%',
                        top: '10%',
                        //margin: '2%'
                        }}
                        name="trash-outline"
                        size={25}
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
                            right: 10, bottom: 10, color: "#F38B2B"
                        }} />
        </View>
    );
}
