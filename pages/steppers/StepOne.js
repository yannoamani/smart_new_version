import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, IconButton } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

const StepOne = () => {
    const [policeBold, setPolices] = useState("Poppins_700Bold")
    const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular")
    const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic")
    const navigation = useNavigation();

  return (
    <View style={{flex:1}}>
        <View style={styles.container}>
        <View style={{flex:1, position:"relative"}}>
        <View style={{width:250, height:300, position:"absolute", bottom:40, right:-160, backgroundColor:"#F38B2B", transform:[{rotate:"45deg"}]}}></View>
            {/* <Image source={require('../../assets/onboarding.png')} style={{width:50, height:50, position:"absolute", bottom:0, right:0}} /> */}
        </View>
        <View style={{flex:2, justifyContent:"center", alignItems:"center"}}>
            <Image source={require('../../assets/remove2.png')} style={{width:430, height:430}} />
            <View style={{justifyContent:"center", alignItems:"center", padding:10, position:"relative", bottom:"15%"}}>
                <Text style={{fontFamily:policeBold, fontSize:20}}>Bienvenue sur</Text>
                <Text style={{fontFamily:policeBold, fontSize:20, color:"#F38B2B", marginBottom:"10%"}}>SMART CONNECT</Text>
                <Text style={{fontFamily:policeRegular, fontSize:12, lineHeight:21, textAlign:"center", marginBottom:"8%"}}>Connectez-vous facilement avec des entreprises pour des projets enrichissants pendant votre temps libre.</Text>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.pointilles}></View>
                    <View style={styles.pointilleslight}></View>
                    <View style={styles.pointilleslight}></View>
                   
                </View>
            </View>
        </View>
        <View style={{flex:1, justifyContent:"space-around", alignItems:"center", flexDirection:"row"}}>
            <Text style={{color:"gray", fontFamily:policeLight}} onPress={() => navigation.navigate('StepThree')}>Skip</Text>
            <TouchableOpacity
                 onPress={() => navigation.navigate('StepTwo')}
                style={{
                    width:200, 
                    height:40, 
                    backgroundColor:"#F38B2B", 
                    borderRadius:10, 
                    padding:5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <MaterialCommunityIcons name="arrow-right-thin" size={27} color="white" style={{alignSelf:'flex-end'}} />
            </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}

export default StepOne

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16
    },
    pointilles:{
        backgroundColor:"#000", width:5, height:5, marginRight:5, borderRadius:5
    },
    pointilleslight:{
        backgroundColor:"#ccc", width:5, height:5, marginRight:5, borderRadius:5
    }
})