import { FlatList, View, Text, ScrollView, Pressable, Modal, TextInput, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import Loader from '../components/loader';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Appliance({route}) {
    const { id } = route.params;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("black");
    const [color2, setColor2] = useState("black");
    const [color3, setColor3] = useState("black");
    const [color4, setColor4] = useState("black");
    const [color5, setColor5] = useState("black");
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
            console.log("appliance", offer.data.data);
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
            setLoading(true)
            const token = await AsyncStorage.getItem('token')
            const user = JSON.parse(await AsyncStorage.getItem('user'))
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const payload = {
                "offre_id": id,
                "student_id": user.id,
                "notes": note,
                "avis": comment
            }
            console.log(payload);
            const offer = await axios.post('rate_entreprise', payload)
            Alert.alert("Info", offer.data.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            console.log("offer", offer.data);
        } catch (error) {
            Alert.alert("Echec", "Un problème est survenu lors de l'enregistrement", [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            console.log(error);
        }
        setLoading(false)
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
                            Paiement par : {data.pointage}
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
                                {/* <TextInput
                                    placeholder='Entrez votre note'
                                    value={note}
                                    onChangeText={text => setNote(text)}
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                /> */}
                                <Text style={styles.titleText}>
                                    EVALUER
                                </Text>
                                <Loader loading={loading} />
                                <View style={{
                                    flexDirection:"row",
                                    alignItems: "center", // Center the stars vertically
                                    marginBottom: 10,
                                }}>
                                    <Ionicons name="star" size={30} color={color} style={{
                                        marginHorizontal: "2%",
                                    }} onPress={() => {
                                        if (color == "black") {
                                            setColor('yellow')
                                        } else {
                                            setColor2('black')
                                            setColor3('black')
                                            setColor4('black')
                                            setColor5('black')
                                        }
                                        setNote(1)
                                    }}/>
                                    <Ionicons name="star" size={30} color={color2} style={{
                                        marginHorizontal: "2%",
                                    }} onPress={() => {
                                        if (color2 == "black") {
                                            setColor('yellow')
                                            setColor2('yellow')
                                        } else {
                                            setColor3('black')
                                            setColor4('black')
                                            setColor5('black')
                                        }
                                        setNote(2)
                                    }}/>
                                    <Ionicons name="star" size={30} color={color3} style={{
                                        marginHorizontal: "2%",
                                    }} onPress={() => {
                                        if (color3 == "black") {
                                            setColor('yellow')
                                            setColor2('yellow')
                                            setColor3('yellow')
                                        } else {
                                            setColor4('black')
                                            setColor5('black')
                                        }
                                        setNote(3)
                                    }}/>
                                    <Ionicons name="star" size={30} color={color4} style={{
                                        marginHorizontal: "2%",
                                    }} onPress={() => {
                                        if (color4 == "black") {
                                            setColor('yellow')
                                            setColor2('yellow')
                                            setColor3('yellow')
                                            setColor4('yellow')
                                        } else {
                                            setColor5('black')
                                        }
                                        setNote(4)
                                    }}/>
                                    <Ionicons name="star" size={30} color={color5} style={{
                                        margin: "2%",
                                    }} onPress={() => {
                                        setColor('yellow')
                                        setColor2('yellow')
                                        setColor3('yellow')
                                        setColor4('yellow')
                                        setColor5('yellow')
                                        setNote(5)
                                    }}/>
                                </View>
                                <TextInput
                                    placeholder='Entrez votre commentaire'
                                    value={comment}
                                    onChangeText={text => setComment(text)}
                                    style={styles.textInput}
                                    multiline={true}
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
                            (data.offre_student.recruit && data.offre_student.avis == "") ? 
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
