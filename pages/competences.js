import { FlatList, View, Text, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Skills() {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [skills, setSkills] = useState();
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
            const res = await axios.get('GetAllCompetences');
            setData(res.data.data);
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };

    const getUserSkills = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('getCompetenceByStudents');
            setSkills(res.data.data.competences);
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Echec de récupération de données", error.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            setRefreshing(false);
        }
    };

    const fetchOffers = () => {
        setRefreshing(true);
        getOffers();
        getUserSkills()
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
        return (
            <View style={{
                //width: "98%",
                borderWidth: 2,
                borderColor: '#87CEEB',
                backgroundColor: '#87CEEB',
                //marginBottom: 5,
                padding: "4%",
                margin: "2%",
                borderRadius: 15,
                // backgroundColor: 'gray'
              }}>
                <Text style={{
                    color: 'white',
                    // textAlign: 'left',
                    paddingHorizontal: "2%",
                    //height: '60%'
                    }}
                >
                    {item.competence.toUpperCase()}
                </Text>
                <Ionicons
                    onPress={() => {
                        Alert.alert("Ajouter ?",'Voulez-vous ajouter cette compétence à votre profil ?',[
                            {text: 'OUI', onPress: async () => {
                                try {
                                    const del = await axios.post('addCompetences', {
                                        competence: [item.id]
                                    })
                                    Alert.alert("Réussi", 'Compétence ajoutée au profil', [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
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
                    top: '20%',
                    //margin: '2%'
                    }}
                    name="add-circle-outline"
                    size={30}
                    color="white"
                />
            </View>
        );
    };

    const renderItem2 = ({ item }) => {
        return (
            <View style={{
                //width: "98%",
                borderWidth: 2,
                borderColor: '#87CEEB',
                backgroundColor: '#87CEEB',
                //marginBottom: 5,
                padding: "4%",
                margin: "2%",
                borderRadius: 15,
                // backgroundColor: 'gray'
              }}>
                <Text style={{
                    color: 'white',
                    // textAlign: 'left',
                    paddingHorizontal: "2%",
                    //height: '60%'
                    }}
                >
                    {item.competence.toUpperCase()}
                </Text>
                <Ionicons
                    onPress={() => {
                        Alert.alert("Supprimer ?",'Voulez-vous supprimer cette compétence de votre profil ?',[
                            {text: 'OUI', onPress: async () => {
                                try {
                                    //return console.log(item.id);
                                    const del = await axios.delete('deleteCompetencesOfStudents/'+ item.id)
                                    Alert.alert("Réussi", 'Compétence supprimée au profil', [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
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
                    top: '20%',
                    //margin: '2%'
                    }}
                    name="trash-outline"
                    size={30}
                    color="white"
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {data || skills ? (
                    <View style={styles.container1}>
                        <Text>
                            Toutes les compétences
                        </Text>
                        <FlatList
                            style={{ width: "100%" }}
                            renderItem={renderItem}
                            data={data}
                            keyExtractor={item => item.id.toString()}
                            onRefresh={fetchOffers}
                            refreshing={refreshing}
                            scrollEnabled={true} 
                        />
                        {/* <Text>
                            {JSON.stringify(data)}
                        </Text> */}
                        <Text>
                            Mes compétences
                        </Text>
                        <FlatList
                            style={{ width: "100%" }}
                            renderItem={renderItem2}
                            data={skills}
                            keyExtractor={item => item.id.toString()}
                            onRefresh={fetchOffers}
                            refreshing={refreshing} 
                            scrollEnabled={true}
                        />
                        {/* <Text>
                            {JSON.stringify(skills)}
                        </Text> */}
                    </View>
            ) : (
                <Text style={styles.titleText}>Loading...</Text>
            )}
        </View>
    );
}
