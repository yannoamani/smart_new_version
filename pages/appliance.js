import { FlatList,useWindowDimensions,SafeAreaView, View, Text,Image, ScrollView, Pressable, Modal, TextInput, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import HTML from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import Loader from '../components/loader';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Appliance({route}) {
     const { width } = useWindowDimensions();
    const { id } = route.params;
    const {detailsOffres}=route.params
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
            // setModalVisible(!isModalVisible)
           
            
            Alert.alert("Info", offer.data.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            console.log("offer", offer.data);
            
        } catch (error) {
            Alert.alert("Echec", error.response.data.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        getOffer()
    }, []);

    return (
        <View style={{flex:1, padding:10}}>
            <ScrollView  style={{flex:1}}
           
            
            >
                {
                    <View >
                   <View style={{height:60, width:60, alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                   <Image source={{uri:'https://new.newpowerjuca.com/templates/empower/images/job.png'}} style={{height:'100%', width:'100%'}}></Image>
                   </View>
                   <View style={{height:10}}></View>
                   <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>{detailsOffres.nom_offre}</Text>
                   <View style={{height:10}}></View>
                   <Text style={{fontSize:20,color:'#1e90ff', textAlign:'center'}}>{detailsOffres.entreprise.nom.toUpperCase()}</Text>
                   <View style={{height:15}}></View>
                   <View style={{flexDirection:'row',flexWrap:'wrap',  flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'row', backgroundColor:'#1e90ff', borderRadius:5, padding:5, justifyContent:'center', alignItems:'center',margin:2}}>
                    <Ionicons name="location-sharp" size={20} color="white" />
                    <Text style={{color:'white', marginLeft:5}}>{detailsOffres.lieu}</Text>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'#1e90ff', borderRadius:5, padding:5, justifyContent:'center', alignItems:'center',margin:2}}>
                    <Text style={{color:'white'}}>$</Text>
                    <Text style={{color:'white', marginLeft:2}}>{detailsOffres.salaire} FCFA</Text>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'#1e90ff', borderRadius:5, padding:5, justifyContent:'center', alignItems:'center',margin:2}}>
                    <Ionicons name="briefcase" size={20} color="white" />
                    <Text style={{color:'white', marginLeft:5}}>{detailsOffres.categorie.categorie}</Text>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'#1e90ff', borderRadius:5, padding:5, justifyContent:'center', alignItems:'center',margin:2}}>
                    <Ionicons name="mail" size={20} color="white" />
                    <Text style={{color:'white', marginLeft:5}}>{detailsOffres.entreprise.email}</Text>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'#1e90ff', borderRadius:5, padding:5, justifyContent:'center', alignItems:'center',margin:2}}>
                    <Ionicons name="call" size={20} color="white" />
                    <Text style={{color:'white', marginLeft:5}}>{detailsOffres.entreprise.contact}</Text>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'#1e90ff', borderRadius:5, padding:5, justifyContent:'center', alignItems:'center',margin:2}}>
                   
                    <Text style={{color:'white', marginLeft:5}}>{detailsOffres.nbre_person} personnes </Text>
                    </View>
                   </View>
                   <View style={{height:10}}></View>
                   <Text style={{fontSize:20, fontWeight:'bold', }}>Descriptionde l'offre</Text>
                   <View style={{height:10}}></View>
                   <RenderHtml
       contentWidth={width}
      source={{ html: detailsOffres.description }}
    />






                  
                  

                
                     
                     
                    
                        {/* <Text style={styles.titleText}>
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
                        </Text> */}
                        <Modal 
                            visible={isModalVisible}
                            animationType='slide'
                        >
                            <SafeAreaView style={{flex:1,}}>
                            <View style={{flex:1,padding:10,alignItems:'center',justifyContent:'center'}}>
                                {/* <TextInput
                                    placeholder='Entrez votre note'
                                    value={note}
                                    onChangeText={text => setNote(text)}
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                /> */}
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                    Comment vous avez apprecie l'offre ?  
                                </Text>
                                <View style={{height:10}}></View>
                                <Loader loading={loading} />
                                <View style={{
                                    flexDirection:"row",
                                    alignItems: "center", // Center the stars vertically
                                    marginBottom: 10,
                                }}>
                                   
                                </View>
                                
                                <TextInput
                                    placeholder='Entrez votre commentaire'
                                    value={comment}
                                    placeholderTextColor={'grey'}
                                    onChangeText={text => setComment(text)}
                                    style={{height:150,borderRadius:10,width:'100%',borderWidth:1,borderColor:'black',padding:10}}
                                    multiline={true}
                                />
                                {/* <Loader loading={loading} /> */}
                                <View style={{height:20}}></View>
                                <Pressable 
                                    onPress={rateComp} 
                                    style={{backgroundColor:'#1e90ff',padding:10,borderRadius:10,width:'100%'}}
                                >
                                    <Text style={{textAlign:'center',fontSize:20,color:'white'}}>
                                    Commenter
                                    </Text>
                                </Pressable>
                                <View style={{height:20}}></View>   
                                <Pressable 

                                    onPress={() => {
                                        setModalVisible(!isModalVisible)
                                    }} 
                                    style={{backgroundColor:'red',padding:10,borderRadius:10,color:'white'}}
                                >
                                    <Text style={{color:'white'}}>
                                        Retour
                                    </Text>
                                </Pressable>
                            </View>
                            </SafeAreaView>
                        </Modal>
                        
                        {/* && data.offre_student.avis == null */}
                        {
                            (detailsOffres.pivot.recruit==1 ) ? 
                            <View style={{
                                backgroundColor: '#1e90ff',
                                width: "30%",
                                marginTop: 10,
                                alignSelf: 'center',
                                borderRadius: 10,
                                height:50,
                                width:'100%',
                                padding: "2%"
                            }}><Pressable  onPress={async () => {
                                try {
                                    setModalVisible(!isModalVisible)
                                    console.log(data)
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight:"bold"
                                }}>
                                    Commenter
                                </Text>
                            </Pressable></View> : <></>
                        }
                    </View>
               }
            </ScrollView>
            </View>
    )
}
