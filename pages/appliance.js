import { FlatList,useWindowDimensions,SafeAreaView, StyleSheet,View, Text,Image, ScrollView, Pressable, Modal, TextInput, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import HTML from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import Loader from '../components/loader';
import { Rating, AirbnbRating } from 'react-native-ratings';
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
        setModalVisible(!isModalVisible)
           
            
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
                    <View  style={{flex:1}}>
                   <View style={{height:60, width:60, alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                   <Image source={require('../assets/emploijeune.png')} style={{height:'100%', width:'100%'}}></Image>
                   </View>
                   <View height={15}></View>
                   <Text style={Monstyles.Title}>{detailsOffres.nom_offre.toUpperCase()}</Text>
                   <View style={{height:10}}></View>
                   <Text style={Monstyles.souTitre}>{detailsOffres.entreprise.nom}</Text>
                   <View height={15}></View>
                   <View style={Monstyles.container}>
       
   
      
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "location-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
           
              
   <Text style={Monstyles.info}>{detailsOffres.lieu}</Text>
   </View>
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "mail-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
           
              
   <Text style={Monstyles.info}>{detailsOffres.entreprise.email}</Text>
   </View>
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "call-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={Monstyles.info}>{detailsOffres.entreprise.contact}</Text>
   </View>
   <View style={{height:15}}></View>
      {
        detailsOffres.salaire==null?null:  <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "cash"}
              color={'gray'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={Monstyles.info}>{detailsOffres.salaire} FCFA </Text>
   </View>
      }
        <View style={{height:15}}></View>
       
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "person-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={Monstyles.info}>{detailsOffres.nbre_person} Personne(s)</Text>
   </View>
 
   
        
      
     

        </View>
                  
                  
                   <View style={{height:20}}></View>
                   <Text style={{fontSize:20, fontWeight:'bold', }}>DESCRIPTION DE L'OFFRE</Text>
                   <View style={{height:10}}></View>
                   <RenderHtml
       contentWidth={width}
      source={{ html: detailsOffres.description }}
    />






                  
                  

                
                     
                     
                        <Modal 
                            visible={isModalVisible}
                            animationType='slide'
                        >
                            <View style={Monstyles.header}>
                                <Ionicons name="arrow-back-outline" onPress={() => setModalVisible(false)} size={30} color="white" style={Monstyles.back}></Ionicons>
                                <Text style={Monstyles.headerText}>Commenter offre {note}</Text>
                            </View>
                           
                            <View style={{flex:1,padding:10,alignItems:'center',justifyContent:'center'}}>
                             
                                <Text style={Monstyles.titleReset}>
                                    Quelle est votre appreciation pour cette offre?  
                                </Text>
                                <AirbnbRating
                               

                                showRating={false}
                                ratingContainerStyle={{alignItems:'center', }}
                                onFinishRating={(value) => setNote(value)}
  count={5}
  reviews={["Terrible", "Mauvais", "Bien", "très bien", "Excellent", ]}
  defaultRating={11}
  size={20}
/>
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
                                    style={Monstyles.inputCustom}
                                    multiline={true}
                                />
                                {/* <Loader loading={loading} /> */}
                                <View style={{height:40}}></View>
                                <Pressable 
                                    onPress={rateComp} 
                                    style={Monstyles.button}
                                    
                                >
                                
                                   <Text style={{textAlign:'center',fontSize:20,color:'white'}}>
                                    Envoyer
                                    </Text>
                                  
                                </Pressable>
                                <View style={{height:20}}></View>   
                               
                            </View>
                        
                        </Modal>
                        
                        {/* && data.offre_student.avis == null */}
                        {
                            (detailsOffres.pivot.recruit==1 && new Date()>  new Date(detailsOffres.job_fin) ) ? 
                           <Pressable  style={Monstyles.button} onPress={async () => {
                                try {
                                    setModalVisible(!isModalVisible)
                                    console.log(data)
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>
                                <Text style={Monstyles.textbutton}>
                                    Commenter
                                </Text>
                            </Pressable> : <></>
                        }
                    </View>
               }
            </ScrollView>
            </View>
    )
}


const Monstyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        borderRadius: 16,
        backgroundColor: '#fff',
       
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
        shadowOpacity: 0.5,
        shadowRadius: 2, // Rayon de l'ombre
       
      },
      detailoffre:{
        color:'black',
        fontSize: 14,
        fontWeight:'500',
        marginBottom:10

      },
      subtile:{
        flexDirection:'row', alignItems:'center', width:'100%',flex: 1
      },
      nom_entreprise:{
        color:'#F38B2B',
        fontWeight:'300',
        fontSize: 15
      },
      location:{
        color:'black',
        fontWeight:'500',
        fontSize: 15
      },
      info:{
        color:'black',
        fontWeight:'500',
        fontSize: 10,
        flex: 1
      },
      date:{
        color:'#FF0000',
        fontWeight:'500',
        fontSize: 10
      },
      titleDescription:{
        color:'#F38B2B',
        fontWeight:'500',
        fontSize: 24,
        textAlign:'center'
      },
      Title:{
        color:'#F38B2B',
        textAlign:'center',
        fontSize: 24,
        fontWeight:'500',

      },
      souTitre:{
        color:'#000000',
        fontWeight:'300',
        textAlign:'center'
      },
      button:{
        backgroundColor: '#F38B2B',
        width: '100%',
        elevation: 5,
        borderRadius: 10,
        
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
        shadowOpacity: 0.5,
        shadowRadius: 4, // Rayon de l'ombre
       
        elevation: 10, 
       
            
       
    },
    textbutton:{
        color:'#FFFFFF',
        fontSize: 20,
    },

header:{
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F38B2B',
    position:'relative',
    
  },
  back:{
    position:'absolute',
    left:10,
   bottom:20
  },
  titleReset:{
    fontSize: 13,
    fontWeight: '700',
  },
  headerText:{
position:'absolute',
bottom:10,
fontWeight:'700',
fontSize:20
    
    
  },
  inputCustom:{
     
  
    borderColor:'#F38B2B',
    borderWidth:1,
    borderRadius:10,
    borderLeftColor: '#F38B2B',
    borderRightColor: '#1A9E47',
   //  borderBlockEndColor: '#1A9E47',
   //  borderBlockStartColor: '#F38B2B',
    borderRightColor: '#1A9E47',
    borderLeftColor: '#1A9E47',
    paddingLeft:20,
    padding:10,
    height:185,
    width: '100%',
    
    },
})

