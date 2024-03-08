import { FlatList, View, Text, ScrollView, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Contact({route}) {
    const { data } = route.params;
    const navigation = useNavigation();
    const { already } = route.params;
    //const [data, setData] = useState();
    const [desc, setDesc] = useState();
    
    const getOffer = async () => {
        try {
            if (data.pivot.offre.description[0] === '<') {
                setDesc(data.pivot.offre.description.replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  '))
            }
            const res = await axios.put('confirmAlarm/'+ data.pivot.id);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getOffer()
    }, []);

    return (
        <View 
            style={styles.containerOffer}
        >
            {data ? (
                <View >
                    <Text style={styles.basicTitleText}>
                        <Ionicons name="briefcase" size={20} /> {data.pivot.offre.nom_offre}
                        ({data.pivot.offre.categorie.categorie.toUpperCase()})
                    </Text>
                    {desc ? 
                        <Text style={styles.basicText}>
                            {
                               "-"+ desc.join('\n-')
                            }
                        </Text>
                        : (
                        <Text style={{ textAlign: 'center' }}>
                            Néant
                        </Text>
                    )}
                    <Text style={{
                        borderBottomWidth: 1,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        // paddingHorizontal: '20%',
                        marginBottom: '2%',
                        marginTop: '2%'
                    }}>
                        Détails de l'offre :
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="calendar-outline" size={20} color="#87CEEB" /> &nbsp;
                        Periode : Du {data.pivot.offre.debut} au {data.pivot.offre.fin}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="location-outline" size={20} color="#87CEEB" /> &nbsp;
                        Lieu : {data.pivot.offre.lieu}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="contrast-outline" size={20} color="#87CEEB" /> &nbsp;
                        Paiement par : {data.pivot.offre.pointage}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="cash-outline" size={20} color="#87CEEB" /> &nbsp;
                        Salaire : {data.pivot.offre.salaire}
                    </Text>
                    <Text style={{
                        borderBottomWidth: 1,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        // paddingHorizontal: '20%',
                        marginBottom: '2%',
                        marginTop: '2%'
                    }}>
                        Détails de l'entreprise :
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="business-outline" size={20} color="#87CEEB" /> &nbsp;
                        Entreprise : {data.nom}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="mail-outline" size={20} color="#87CEEB" /> &nbsp;
                        Mail : {data.email}
                    </Text>
                    {
                        (data.pivot.contrat == 0 && new Date(data.pivot.offre.debut) > new Date()) ? 
                        <Pressable style={{
                            backgroundColor: '#87CEEB',
                            width: "30%",
                            marginTop: 10,
                            alignSelf: 'center',
                            borderRadius: 20,
                            padding: "2%"
                        }} onPress={async () => {
                            try {
                                const token = await AsyncStorage.getItem('token')
                                if (token) {
                                    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                                }
                                Alert.alert('Répondre', 'Voulez-vous accepter ou refuser cette offre ?', [
                                    {text: 'Refuser', onPress: async () => {
                                        const dat = await axios.put('changeStatutJob/'+data.pivot.offre.id, {contrat: 2})
                                        Alert.alert("Réussi", "Vous avez refusé l'offre avec succès", [{ text: 'OK'}])
                                    }},
                                    {text: 'Accepter', onPress: async () => {
                                        const dat = await axios.put('changeStatutJob/'+data.pivot.id, {contrat: 1})
                                        Alert.alert("Réussi", "Vous avez accepté l'offre avec succès", [{ text: 'OK'}])
                                    }}
                                ], {cancelable: true})
                                navigation.navigate('Contacts')
                            } catch (error) {
                                Alert.alert("Echec", JSON.stringify(error.message), [{ text: 'OK'}], {cancelable: true})
                            }
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20
                            }}>
                                Répondre
                            </Text>
                        </Pressable> : 
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'red'
                        }}>
                            Offre expirée / Offre déjà acceptée
                        </Text>
                    }
                </View>
            ) : (
                <Text style={styles.titleText}>Loading...</Text>
            )}
        </View>
    )
}
