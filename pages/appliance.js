import { FlatList, View, Text, ScrollView, Pressable, Modal, TextInput } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Appliance({route}) {
    const { id } = route.params;
    const [data, setData] = useState();
    const [note, setNote] = useState();
    const [comment, setComment] = useState();
    const [desc, setDesc] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    
    const getOffer = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const offer = await axios.get('detail_offre/'+ id)
            //console.log("offer",offer.data.data.offre.description);
            console.log(offer.data.data);
            setData(offer.data.data);
            if (offer.data.data.description[0] === '<') {
                //console.log("."+offer.data.data.description.replace(/<[^>]*>/g, ' ').toUpperCase().trim()+".");
                setDesc(offer.data.data.description.replace(/<[^>]*>/g, ' ').trim().toUpperCase().split('  '))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const rateComp = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const offer = await axios.get('rate_entreprise/', {

            })
            console.log(offer.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOffer()
    }, []);

    return (
            <ScrollView 
            contentContainerStyle={styles.containerOffer}
            showsVerticalScrollIndicator={false}
            >
                {data ? (
                    <View>
                        <Text style={styles.titleText}>
                            <Ionicons name="briefcase" size={25} /> &nbsp;
                            {data.nom_offre} ({data.categorie.categorie.toUpperCase()})
                        </Text>
                        {desc ? 
                            <Text style={styles.basicText}>
                                {
                                    desc.join('\n')
                                }
                            </Text>
                            : (
                            <Text style={{ textAlign: 'center' }}>
                                ...
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
                        <Modal 
                            visible={isModalVisible}
                            animationType='slide'
                        >
                            <View style={styles.modalView}>
                                <TextInput
                                    placeholder='Entrez votre note'
                                    value={note}
                                    onChangeText={text => setNote(text)}
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    placeholder='Entrez votre commentaire'
                                    value={comment}
                                    onChangeText={text => setComment(text)}
                                    style={styles.textInput}
                                />
                                {/* <Loader loading={loading} /> */}
                                <Pressable 
                                    onPress={rateComp} 
                                    style={styles.Button}
                                >
                                    <Text style={styles.buttonText}>
                                        OK
                                    </Text>
                                </Pressable>
                                <Pressable 
                                    onPress={() => {
                                        setModalVisible(!isModalVisible)
                                    }} 
                                    style={styles.Button}
                                >
                                    <Text style={styles.buttonText}>
                                        Retour
                                    </Text>
                                </Pressable>
                            </View>
                        </Modal>
                        {
                            data.offre_student.recruit == 1 ? 
                            <Pressable style={{
                                backgroundColor: '#87CEEB',
                                width: "30%",
                                marginTop: 10,
                                alignSelf: 'center',
                                borderRadius: 20,
                                padding: "2%"
                            }} onPress={async () => {
                                try {
                                    setModalVisible(!isModalVisible)
                                    console.log(data)
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 20
                                }}>
                                    Noter
                                </Text>
                            </Pressable> : <></>
                        }
                    </View>
                ) : (
                    <Text style={styles.titleText}>Loading...</Text>
                )}
            </ScrollView>
    )
}
