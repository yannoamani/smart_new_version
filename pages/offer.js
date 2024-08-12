import { FlatList, View, loader,Text,Image, StyleSheet,ScrollView,useWindowDimensions, Pressable, Alert,ActivityIndicator } from "react-native";

import styles from '../pages/styles/offerStyle';

import React, { useEffect, useState } from "react";
import RenderHtml from 'react-native-render-html';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import Loader from "../components/loader";
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Offer({route}) {
    const { width } = useWindowDimensions();
    const { id } = route.params;
    const { already } = route.params;
    const{detailsOffres}=route.params
    const [data, setData] = useState();
    const [desc, setDesc] = useState();
    const [loadin, setLoadin] = useState(false);
    const navigation = useNavigation()
    const [exist, setExist] = useState(false);
    // const conversion=()=>{
    //  return   setDesc(detailsOffres.description.replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  '))
    // }
    const getOffer = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
             const user = await AsyncStorage.getItem('user')
             const idUser = JSON.parse(user);
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            // console.log(JSON.parse(user));
            const offer = await axios.get('detail_offre/'+ id)
            setData(offer.data.data);
            console.log(offer.data);
            const res = await axios.get('get_offres_postule');
            // console.log("res",offer.data.data.offre_student);
            const getusersId = [];
            const ofert= offer.data.data.students
            ofert.forEach((offre) => {
               getusersId.push(offre['pivot']['student_id']);
             });
            console.log("getusersId",getusersId);

            if (getusersId.includes(idUser.id)) {
              setExist(false);  
             
            } else {
              setExist(true);            }
        


            

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
        
        <View style={{flex: 1,padding:10, backgroundColor: '#F1F2F4'}} >
        <ScrollView style={{flex: 1}}>
       
       
        <View style={Monstyles.container}>
        <Text style={Monstyles.detailoffre}>Detail de l'offre</Text>
        <View style={Monstyles.subtile}>
       <Ionicons name={"location-sharp"} color={'black'} size={20}></Ionicons>
   <View style={{width:2}}></View>
 
        
    <View style={{width:1}}></View>
   <View>
   <Text style={Monstyles.nom_entreprise}  numberOfLines={1} ellipsizeMode="tail">{detailsOffres.entreprise.nom} </Text>
   <Text style={Monstyles.location}>{detailsOffres.lieu}</Text>
   </View>
  
  

        </View>
        
      
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "mail-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              <Loader loading={loadin}></Loader>
              
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
              name={ "checkmark-circle-outline"}
              color={already==false?'gray':'green'}
              size={20  } />
              <View style={{width:10}}></View>
              
  {
    already==false? <Text  style={Monstyles.info}>Pas encore postuler </Text> : <Text  style={Monstyles.info}>Déja postuler </Text>
  }
   </View>
   <View style={{height:15}}></View>
   <Text style={Monstyles.date}>Date de cloture {detailsOffres.fin}</Text>
        
      
     

        </View>
        <View style={{height:25}}></View>
        <Text style={Monstyles.titleDescription}>{detailsOffres.nom_offre}</Text>
        <View style={{height:25}}></View>
       
        <RenderHtml
      contentWidth={width}
      source={{ html: detailsOffres.description }}
    />
        {/* <Text style={{color:'black', flex: 1, fontSize: 15,}}>{desc}</Text> */}
     
        <View style={{height:20}}></View>
        
       {
        data?
      (  exist==true && new Date(detailsOffres.debut) > new Date() ? <View style={Monstyles.button}>
      <Pressable 
      onPress={
          async () => {
              setLoadin(true)
                      try {
                          const token = await AsyncStorage.getItem('token')
                          if (token) {
                              axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                          }

                          const dat = await axios.post('postule_offre', {offre_id: detailsOffres.id})
                         
                          Alert.alert("Réussi", "Vous avez postulé", [{ text: 'OK'}])
                          // navigation.goBack()
                          setLoadin(false)
                         
                          console.log(dat)
                          getOffer();
                      } catch (error) {
                          navigation.goBack();
                          Alert.alert("Echec", JSON.stringify(error.response.data.message), [{ text: 'OK'}])
                          setLoadin(false)
                      
                          console.log(error);
                          
                      }}
      }
      
      >
          <Text style={Monstyles.textbutton}>Postuler maintenant</Text>
      </Pressable>
  </View> : null):<ActivityIndicator color={'#F38B2B'} size="large" />
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
