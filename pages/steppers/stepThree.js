import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState , useEffect} from 'react'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import translateText from "../store/TranslationUtils"
import { useSelector } from 'react-redux';



const StepThree = () => {
    const language = useSelector((state) => state.translate.lang);
    const [policeBold, setPolices] = useState("Poppins_700Bold")
    const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular")
    const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic")

    const navigation = useNavigation();
    const [texttranslate, setTexttranslate] = useState({
        welcome: language=="fr"?"Votre prochain job est à portée de main":"Your next job is on the way",
        subtitle:language=="fr"?"Explorez une multitude de petits boulots disponibles instantanément. Ne perdez plus de temps, commencez simplement !":"Explore an endless variety of small jobs. Don't waste time, start now!",
        commencer:language=="fr"?"Commencer":"Start"
       
    

    })
    const translation= async () =>{
   
        const welcomeTitle= await translateText("Votre prochain job est à portée de main", language);
        const commencer= await translateText('Commencer', language);
        
        const soutitle=await translateText('Explorez une multitude de petits boulots disponibles instantanément. Ne perdez plus de temps, commencez dès maintenant !', language);
       
       return setTexttranslate({welcome:welcomeTitle, subtitle:soutitle,  commencer:commencer})
 
    }
    useEffect(() => {
        translation();
        return () => {
        
        }

  }, [language]);

  return (
    <View style={{flex:1}}>
        <View style={styles.container}>
        <View style={{flex:1, position:"relative"}}>
        <View style={{width:250, height:300, position:"absolute", bottom:40, right:-160, backgroundColor:"#F38B2B", transform:[{rotate:"45deg"}]}}></View>
            {/* <Image source={require('../../assets/onboarding.png')} style={{width:50, height:50, position:"absolute", bottom:0, right:0}} /> */}
        </View>
        <View style={{flex:2, justifyContent:"center", alignItems:"center",}}>
            <Image source={require('../../assets/remove3.png')} style={{width:300, height:300}} />
            <View style={{justifyContent:"center", alignItems:"center", padding:10, position:"relative", Top:"15%"}}>
              
                <Text style={{fontFamily:policeBold, fontSize:20, color:"#F38B2B", marginTop:"1%", textAlign:"center"}}>{texttranslate.welcome}</Text>
                <Text style={{fontFamily:policeRegular, fontSize:12, lineHeight:21, textAlign:"center", marginTop:"7%"}}>{texttranslate.subtitle}</Text>
                <View style={{flexDirection:"row", marginTop:"8%"}}>
                  
                    <View style={styles.pointilleslight}></View>
                    <View style={styles.pointilleslight}></View>
                    <View style={styles.pointilles}></View>
                  
                  
                </View>
            </View>
        </View>
        <View style={{flex:1, justifyContent:"flex-end", alignItems:"center", flexDirection:"row"}}>
            {/* <Text style={{color:"gray", fontFamily:policeLight}}>Skip</Text> */}
            <TouchableOpacity
                 onPress={() => navigation.navigate('Login')}
                style={{
                    width:200, 
                    height:40, 
                    backgroundColor:"#F38B2B", 
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"row",
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

            <Text style={{fontFamily:policeRegular, fontSize:15, color:'white'}}>{texttranslate.commencer}</Text>
                <MaterialCommunityIcons name="arrow-right-thin" size={27} color="white" style={{alignSelf:'flex-end'}} />
            </TouchableOpacity>
        </View>
       
        </View>
        
      
    </View>
    
  )
}

export default StepThree

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