import { FlatList, View, Text, ScrollView, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Offer({route}) {
    const { id } = route.params;
    const { already } = route.params;
    const [data, setData] = useState();
    const [desc, setDesc] = useState();
    
    const getOffer = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            // const user = await AsyncStorage.getItem('user')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            // console.log(JSON.parse(user));
            const offer = await axios.get('detail_offre/'+ id)
            setData(offer.data.data);
            //console.log(offer.data);
            const res = await axios.get('get_offres_postule');
            //console.log("res",res.data.data.offres);
            console.log(already);
            //return console.log(already);
            if (offer.data.data.description[0] === '<') {
                setDesc(offer.data.data.description.replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  '))
            }
        } catch (error) {
            console.log(error);
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
                        <Ionicons name="briefcase" size={20} /> {data.nom_offre}
                        ({data.categorie.categorie.toUpperCase()})
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
                        Periode : Du {data.debut} au {data.fin}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="location-outline" size={20} color="#87CEEB" /> &nbsp;
                        Lieu : {data.lieu}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="contrast-outline" size={20} color="#87CEEB" /> &nbsp;
                        Job du : {data.pointage}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="cash-outline" size={20} color="#87CEEB" /> &nbsp;
                        Salaire : {data.salaire}
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
                        Entreprise : {data.entreprise.nom}
                    </Text>
                    <Text style={styles.basicText}>
                        <Ionicons name="mail-outline" size={20} color="#87CEEB" /> &nbsp;
                        Mail : {data.entreprise.email}
                    </Text>
                    {
                        (already == false || new Date(data.debut) > new Date()) ? 
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
                                const dat = await axios.post('postule_offre', {offre_id: data.id})
                                Alert.alert("Réussi", "Vous avez postulé", [{ text: 'OK'}])
                                console.log(dat)
                            } catch (error) {
                                Alert.alert("Réussi", JSON.stringify(error), [{ text: 'OK'}])
                            }
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20
                            }}>
                                Postuler
                            </Text>
                        </Pressable> : 
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'red'
                        }}>
                            Offre expirée / Vous avez déjà postulé à cette offre
                        </Text>
                    }
                </View>
            ) : (
                <Text style={styles.titleText}>Loading...</Text>
            )}
        </View>
    )
}
