import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import translateText from "../store/TranslationUtils"



import { useSelector } from 'react-redux';

const StepTwo = () => {
    const language = useSelector((state) => state.translate.lang);
    console.log("languge", language)

    const { t } = useTranslation();
    const [policeBold, setPolices] = useState("Poppins_700Bold")
    const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular")
    const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic")

    const navigation = useNavigation();
    const [texttranslate, setTexttranslate] = useState({
        welcome:language=="fr"?"Trouvez des petits boulots en un clin d'œil !":"Find small jobs in a snap!",
        subtitle: language=="fr"?"Connectez-vous facilement avec des entreprises pour des projets enrichissants pendant votre temps libre.  Inscrivez-vous, explorez les offres et décrochez un job en quelques minutes seulement.":"Connect easily with companies for enriching projects during your free time.",
        passer: language=="fr"?"Passer":"Skip",
    suivant: language=="fr"?"Suivant":"Next"

    })
    const translation= async () =>{
    //   const lang =  await AsyncStorage.getItem("lang");
    console.log("languge232", language)
 

    //     const welcomeTitle= await  translateText("Trouvez des petits boulots en un clin d'œil !", language);
    //     const next= await  translateText('Suivant',  language);
    //     const skip= await  translateText('Passer',  language);
    //     const soutitle=await  translateText('Connectez-vous facilement avec des entreprises pour des projets enrichissants pendant votre temps libre.  Inscrivez-vous, explorez les offres et décrochez un job en quelques minutes seulement.',  language);
       
    //    return setTexttranslate({welcome:welcomeTitle, subtitle:soutitle, passer:skip, suivant:next})
    
    }
    useEffect(() => {
//   translation()
  return () => {
        
  }

  }, [language]);

  return (
    <View style={{flex:1}}>
        <View style={styles.container}>
        <View style={{flex:1, position:"relative", }}>
        <View style={{width:250, height:300, position:"absolute", bottom:40, right:-160, backgroundColor:"#F38B2B", transform:[{rotate:"45deg"}]}}></View>
            {/* <Image source={require('../../assets/onboarding.png')} style={{width:50, height:50, position:"absolute", bottom:0, right:0}} /> */}
        </View>
        <View style={{flex:2, justifyContent:"center", alignItems:"center",marginTop:36}}>
            <Image source={require('../../assets/remove1.png')} style={{width:430, height:430, }} />
            <View style={{justifyContent:"center", alignItems:"center", padding:10, position:"relative", bottom:"5%"}}>
 
                <Text style={{fontFamily:policeBold, fontSize:20, color:"#F38B2B", marginBottom:"1%", textAlign:"center"}}>{texttranslate.welcome}</Text>
                <Text style={{fontFamily:policeRegular, fontSize:12, lineHeight:21, textAlign:"center", marginTop:"2%"}}>{texttranslate.subtitle}</Text>
                <View style={{flexDirection:"row", marginTop:"8%"}}>
                   
                    <View style={styles.pointilleslight}></View>
                    <View style={styles.pointilles}></View>
                    <View style={styles.pointilleslight}></View>
               
                </View>
            </View>
        </View>
        <View style={{flex:1, justifyContent:"space-around", alignItems:"center", flexDirection:"row", marginTop:"10%"}}>
            <Text style={{color:"gray", fontFamily:policeLight}}  onPress={() => navigation.navigate('StepThree')}>{texttranslate.passer}</Text>
            <TouchableOpacity
                 onPress={() => navigation.navigate('StepThree')}
                style={{
                    width:200, 
                    height:40, 
                    backgroundColor:"#F38B2B", 
                    borderRadius:10, 
                    padding:5,
                    flexDirection:"row",
                    justifyContent:'space-around',
                    alignItems:'center',
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
               <Text style={{color:"white", fontFamily:policeRegular, fontSize:15}}>{texttranslate.suivant}</Text>
                <MaterialCommunityIcons name="arrow-right-thin" size={27} color="white" style={{alignSelf:'flex-end'}} />
            </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}

export default StepTwo

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