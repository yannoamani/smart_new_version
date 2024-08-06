import { View, Text, StyleSheet, SafeAreaView , ScrollView,Image,Pressable} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axios from "axios";




export default  function OnboardingPage() {
    const navigation = useNavigation();

    return (
     
        
          <View style={style.container}>
            
            
        <ScrollView style={{flex: 1}}>
        <View style={style.card}> 
                <Image
                style={style.image}
                source={require('../assets/onboarding.png')}
                ></Image>
                
            </View>
           <View style={style.cardItem}>
            <Text style={style.bienvenue}>Bienvenue sur </Text>
            <Text style={style.smart}>SMART CONNECT</Text>
            <Text style={style.sujet}>Connectez-vous facilement avec des entreprises ou
des étudiants pour des opportunités de stages
et de carrières. Simplifiez votre recherche 
de talents ou de postes adaptés à vos besoins.</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <View style={style.button}>
            <Text style={style.textbutton}> Commencer</Text>
        </View>
      </Pressable>
           </View>
        </ScrollView>
        </View>

     
    )
}
const style= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#F1F2F4'
        
      
    
    },
    card:{
       height: 300, width: 190 ,
        alignSelf: 'flex-end',   
  },
    image:{
        height: '100%', width: '100%' ,},
       
        cardItem:{
            padding: 20,
        },
       
        bienvenue:{
            fontSize:24,
            fontWeight: '700',
            textAlign:'center',
            marginBottom:5
        },
        smart:{
            fontSize:24,
            fontWeight: '700',
            textAlign:'center',
            color: '#F38B2B',
            marginBottom:50},
        sujet:{
            fontSize:14,
            fontWeight: '500',
            textAlign:'justify',
            color: 'black',
            marginBottom:50
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
        }
        
})