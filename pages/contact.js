import { FlatList,StyleSheet,useWindowDimensions, View, Text, ScrollView, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderHtml from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Contact({route}) {
    const { width } = useWindowDimensions();
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
            style={style.allcontainer}
        >
        <ScrollView style={{flex:1}}>
        {data ? (
                <View >
                <View style={style.container}>
                <Text style={style.detailoffre} >Details de l'offre</Text>
                <View style={style.subtile}>
                <Ionicons name={"location-outline"} color={'black'} size={20}></Ionicons>
                <View style={{width:3}}></View>
                <View>
                    <Text style={style.nom_entreprise}>{data.nom}</Text>
                    <Text style={style.location}>{data.pivot.offre.lieu}</Text>
                </View>
                 </View>
                 <View style={{height:15}}></View>
                 <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "mail-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
              
   <Text style={style.info}>{data.email}</Text>
   </View>
   <View style={{height:15}}></View>
   <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "call-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={style.info}>{data.contact}</Text>
   
  </View>
  <View style={{height:15}}></View>
  {
        data.pivot.offre.salaire==null?null:  <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "cash"}
              color={'gray'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={style.info}>{ data.pivot.offre.salaire} FCFA </Text>
   </View>
      }
      <View style={{height:15}}></View>
      <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
 {
    data.pivot.contrat==1?
    <Ionicons name="checkmark-circle" size={20} color="#1A9E47"/>:
    data.pivot.contrat==0? <Ionicons name="hourglass" size={20} color="orange"/>
    :<Ionicons name="close-circle-outline" size={20} color="red"/>

 }
              <View style={{width:10}}></View>
              
 <Text style={style.info}>{data.pivot.contrat==1?'Acepté':data.pivot.contrat==0?'En attente':'Refusé'}</Text>
   </View>
   <View style={{height:15}}></View>
   <Text style={style.date}>Date de cloture :  {data.pivot.offre.fin}</Text>
   
   </View>
   <View style={{height:25}}></View>
        <Text style={style.titleDescription}>{data.pivot.offre.nom_offre}</Text>
        <View style={{height:25}}></View>
        
        <RenderHtml
      contentWidth={width}
      source={{ html: data.pivot.offre.description }}
    />

                    {
                        (data.pivot.contrat == 0 && new Date(data.pivot.offre.fin) > new Date()) ? 
                        <Pressable style={style.button} onPress={async () => {
                            try {
                                const token = await AsyncStorage.getItem('token')
                                if (token) {
                                    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                                }
                                Alert.alert('Répondre', 'Voulez-vous accepter ou refuser cette offre ?', [
                                    {text: 'Refuser', onPress: async () => {
                                      try {
                                        const dat = await axios.put('changeStatutJob/'+data.pivot.id, {contrat: 2})
                                        Alert.alert("Réussi", "Vous avez refusé l'offre avec succès", [{ text: 'OK'}])
                                      } catch (error) {
                                        Alert.alert("Echec", JSON.stringify(error.message), [{ text: 'OK'}], {cancelable: true})
                                      }
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
                            <Text style={style.textbutton}>
                                Répondre
                            </Text>
                        </Pressable> : 
                        new Date(data.pivot.offre.fin) < (new Date()) ?
                        <Text> L'offre à expiré </Text>:

                       
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'red'
                        }}>
                            Vous avez {data.pivot.contrat == 1 ? 'accepté' : 'refusé'} cette offre
                        </Text>
                    }
                </View>
            ) : (
                <Text style={styles.titleText}>Loading...</Text>
            )}
        </ScrollView>
        </View>
    )
}



const style = StyleSheet.create({
    allcontainer:{
        flex: 1,padding:10, backgroundColor: '#F1F2F4'
    },
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

   button:{
    backgroundColor: '#F38B2B',
    width: '100%',
    elevation: 5,
    borderRadius: 10,
    
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5,
    shadowRadius: 4, 
   
    elevation: 10, 
   
        
   
},
textbutton:{
    color:'#FFFFFF',
    fontSize: 20,
},

button:{
    backgroundColor: '#F38B2B',
    width: '100%',
    elevation: 5,
    borderRadius: 10,
    
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5,
    shadowRadius: 4, 
   
    elevation: 10, 
   
        
   
},
textbutton:{
    color:'#FFFFFF',
    fontSize: 20,
},
})
