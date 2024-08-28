import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default  function SplahScreen() {
    const navigation = useNavigation();

    const  redirection = async () => {
        const token = await AsyncStorage.getItem('token');
        
      setTimeout(() => {
        if (token) {
            navigation.navigate('OffresTab');
        } else {
            navigation.replace('stepone');
        }
        
      }, 100);
    }
    useEffect(() => {   
        redirection();
    }, []);

    return (
        <View style={style.container}>
            <Text style={style.title}></Text>
        </View>
    )
}

const style= StyleSheet.create({
    container:{
        flex: 1,
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#F1F2F4'
      
    },
    title:{
            color:'#F38B2B',
            fontSize: 48,
            fontWeight: '700',


        }

})
