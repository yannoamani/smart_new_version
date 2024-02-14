import { FlatList, View, Text, ScrollView, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function Profile() {
    const [data, setData] = useState();
    const [skills, setSkills] = useState(null);
    const [exps, setExps] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()
    const getUser = async () => {
        try {
            const temp = await AsyncStorage.getItem('user')
            setData(JSON.parse(temp))
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    }
    const getSkills = async () => {
        try {
            const skills = await axios.get('getCompetenceByStudents')
            if (skills.data.data.competences.length > 0) {
                setSkills(skills.data.data.competences)
            }
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    }
    const getExps = async () => {
        try {
            const exps = await axios.get('GetMyExperiences')
            console.log("exps", exps);
            if (exps.data.data.length > 0) {
                setExps(exps.data.data)
            }
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    }
    const fetchData = () => {
        setRefreshing(true);
        getUser()
        getExps()
        getSkills()
    };
    useEffect(() => {
        // Fetch offers when the component mounts
        fetchData();

        // Set up an interval to fetch offers every 1 minute
        const intervalId = setInterval(fetchData, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    return (
        <View 
            style={styles.containerOffer}
        >
            {data ? (
                <View>
                    <Text style={styles.titleText}>
                        {/* <Ionicons name="briefcase" size={25} /> &nbsp; */}
                        {data.nom.toUpperCase() + " " + data.prenoms.toUpperCase()}
                    </Text>
                    {skills ? 
                        <Text numberOfLines={3}>
                            {
                            skills.map((skill, index) => (
                                <React.Fragment key={index}>
                                    - {skill.competence.toUpperCase()}{' '}
                                </React.Fragment>
                            ))
                            }
                        </Text>                      
                        : (
                        <Text style={{ 
                                textAlign: 'center',
                                // fontSize: 18,
                            }}
                        >
                            Néant
                        </Text>
                    )}
                    <Text style={{
                        borderBottomWidth: 1,
                        // paddingHorizontal: '20%',
                        marginBottom: '2%',
                        marginTop: '2%',
                        color: "#87CEEB",
                        fontWeight: 'bold'
                    }}>
                        * Informations personnelles
                    </Text>
                    <View style={styles.roundedContainer}>
                        <Text style={styles.basicText}>
                            <Ionicons name="ribbon-outline" size={20} color="#87CEEB" /> &nbsp;
                            Diplome : {data.diplome}
                        </Text>
                        <Text style={styles.basicText}>
                            <Ionicons name="home-outline" size={20} color="#87CEEB" /> &nbsp;
                            Habitat : {data.commune}, {data.quartier}
                        </Text>
                        <Text style={styles.basicText}>
                            <Ionicons name="mail-outline" size={20} color="#87CEEB" /> &nbsp;
                            Email : {data.email}
                        </Text>
                        <Text style={styles.basicText}>
                            <Ionicons name="call-outline" size={20} color="#87CEEB" /> &nbsp;
                            Contact : {data.phone}
                        </Text>
                    </View>
                    <Text style={{
                        borderBottomWidth: 1,
                        // paddingHorizontal: '20%',
                        marginBottom: '2%',
                        marginTop: '2%',
                        color: "#87CEEB",
                        fontWeight: 'bold'
                    }}>
                        * Mes expériences
                    </Text>
                    <ScrollView style={styles.roundedContainer}>
                        {exps ? 
                            exps.map((exp, index) => (
                                <Pressable 
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate('EditExp', {expR: exp})
                                    }}
                                    style= {{
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                <Text style={{
                                    fontSize: 14,
                                    marginBottom: '2%',
                                }}>
                                    - {exp.poste.toUpperCase()} - {exp.entreprise.toUpperCase()} {"\n"}
                                    Du {new Date(exp.dateDebut).toLocaleString('en-GB').split(',')[0]} au {new Date(exp.dateFin).toLocaleString('en-GB').split(',')[0]}
                                </Text>
                                <Ionicons
                                    onPress={() => {
                                        Alert.alert("?",'Voulez-vous supprimer cette expérience ?',[
                                            {text: 'OUI', onPress: async () => {
                                                try {
                                                    const del = await axios.delete('deleteMyExperience/'+ exp.id)
                                                    fetchData()
                                                } catch (error) {
                                                    Alert.alert("Echec", error.message, [{text: 'OK', onPress: async () => console.log('OK')}], { cancelable: true })
                                                }
                                            }},
                                            {text: 'NON', onPress: async () => console.log('NON')},
                                        ], { cancelable: true })
                                        
                                    }}
                                    style={{
                                    position: "absolute",
                                    right: '2%',
                                    top: '10%'
                                    }}
                                    name="trash-outline"
                                    size={20}
                                    color="#87CEEB"
                                />
                                </Pressable>
                            ))                          
                            : (
                            <Text style={{ 
                                textAlign: 'center',
                                fontSize: 18,
                            }}>
                                Loading...
                            </Text>
                        )}
                    </ScrollView>
                </View>
            ) : (
                <Text style={styles.titleText}>Loading...</Text>
            )}
            <View style={styles.credits}>
            <Pressable style={{
                borderTopColor: 'black',
                borderTopWidth: 1,
                paddingVertical: 5,
            }}>

            </Pressable>
            <Text onPress={async () => {
                    navigation.navigate('Scheds')
                }} style={styles.basicText}>
                    <Ionicons name="calendar-outline" size={20} />
                    &nbsp;Mes Plages Horaires
                </Text>
                <Text onPress={async () => {
                    navigation.navigate('Editer')
                }} style={styles.basicText}>
                    <Ionicons name="flask-outline" size={22} />
                    &nbsp;Ajouter expérience
                </Text>
                <Text onPress={async () => {
                    navigation.navigate('Skills')
                }} style={styles.basicText}>
                    <Ionicons name="library-outline" size={22} />
                    &nbsp;Ajouter compétence
                </Text>
                <Text onPress={async () => {
                    Alert.alert('Se déconnecter', 'Voulez-vous vous déconnecter', [
                        {text: 'OUI', onPress: async () => {
                            try {
                                axios.get('auth_logout')
                                await AsyncStorage.multiRemove(['user', 'token'])
                                navigation.navigate('Auth')
                            } catch (error) {
                                console.log(error);
                            }
                        }}, {text: 'NON'}
                    ], {cancelable: true})
                }} style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    width: '100%',
                    textAlign: 'center',
                    color: 'red'
                  }}>
                    <Ionicons name="log-out-outline" size={20} />
                    Se déconnecter
                </Text>
            </View>
        </View>
    )
}