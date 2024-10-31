import { View , Text, StyleSheet, FlatList,ActivityIndicator} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import translateText from "../pages/store/TranslationUtils.js"
import Abonnement from "./abonnement.js";

const MyAbonnement=()=>{
  const lang = useSelector((state) => state.translate.lang);
    const [refreshing, setRefreshing] = useState(false);
    const [myabonnement, setMyabonnement] = useState([]);
    const [TextTranslate, setTextTranslate] = useState({
      Abonnement:"Abonnement",
      Moyen_paiement:"Moyen de paiement",
      Montant:"Montant",
      Reference:"Reference",
      Statut:"Statut",
      DatePayement:'Date de paiement',
      DateFin:'Date de fin',
      Actif:"Actif",
      Expire:"Expire"
    });
    const translation= async() => {
      const abonnement=await translateText(TextTranslate.Abonnement, lang);
      const moyen_paiement=await translateText(TextTranslate.Moyen_paiement, lang);
      const Montant=await translateText(TextTranslate.Montant, lang);
      const reference=await translateText(TextTranslate.Reference, lang);
      const statut=await translateText(TextTranslate.Statut, lang);
      const datePayement=await translateText(TextTranslate.DatePayement, lang);
      const dateFin=await translateText(TextTranslate.DateFin, lang);
      const actif=await translateText(TextTranslate.Actif, lang);
      const expire=await translateText(TextTranslate.Expire, lang);
      setTextTranslate({
        Abonnement:abonnement,
        Moyen_paiement:moyen_paiement,
        Montant:Montant,
        Reference:reference,
        Statut:statut,
        DatePayement:datePayement,
        DateFin:dateFin,
        Actif:actif,
        Expire:expire
      })
      
    }

    useEffect(() => {
      translation();
    }, []);

    const getAbonnement = async () => {
      setRefreshing(true);
        try {
          const token = await AsyncStorage.getItem('token')
                if (token) {
                    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                }
          const abonnement = await axios.get("seeMyAbonnement");
        //  console.log(abonnement.data[0]);
          const data=abonnement.data.data;
        
            setMyabonnement(abonnement.data.data);
            console.log(data);
            
      
       
          setRefreshing(false);
           console.log( "Mes abonement",abonnement.data.data);
        } catch (error) {
          const token = await AsyncStorage.getItem('token')
          console.log('Erreur abonnement',error, token);
          setRefreshing(false);
        }
      };
      const render=({item})=>{
        const time = displayDate(item.created_at);
        return(
            <View style={style.cardAbonnement}>
               <View style={style.leading}>
                <Text style={style.title}>{TextTranslate.Abonnement}</Text>
                <Text style={style.title} >{TextTranslate.Moyen_paiement}</Text>
                <Text style={style.title}>{TextTranslate.Montant}</Text>
                <Text style={style.title}>{TextTranslate.Reference}</Text>
                <Text style={style.title}>{TextTranslate.Statut}</Text>
                <Text style={style.title}>{TextTranslate.DatePayement}</Text>
                <Text style={style.title}>{TextTranslate.DateFin}</Text>
               </View>
               <View style={style.trailing}>
                <Text style={style.subtitle}>{item.abonement.libelle}</Text>
                <Text style={style.subtitle} numberOfLines={1} >{item.moyen_paiement}</Text>
                <Text style={style.subtitle} numberOfLines={1}>{item.abonement.prix}FCFA</Text>
                <Text style={style.subtitle}>{item.transaction_id}</Text>
                <Text style={[style.subtitle,{color:item.statut=="ACCEPTED"?'green':'red'}]}>{item.statut=="ACCEPTED"?TextTranslate.Actif:TextTranslate.Expire}</Text>
                <Text style={style.subtitle}>{time.date} </Text>
                <Text style={style.subtitle}>{item.echeance} </Text>

               </View>
            </View>
        )
      }

      useEffect(() => {
        getAbonnement();
      }, []);
   
    return(
       <View style={style.container}>

     {
        !refreshing?   <FlatList
        data={myabonnement}
        renderItem={render}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={getAbonnement}
        />:
        ( <ActivityIndicator size="large" color="#F38B2B" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />  )
     }
       </View>
        
    )
}
const style= StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
        backgroundColor: '#F1F2F4'
    
    },
    cardAbonnement:{
        width: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        marginBottom: 5,
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        
    },
    leading:{
        

    },
    trailing:{
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "column",
        alignSelf: "flex-end",
        flexShrink: 1
        
    },
    title:{
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 12,
        marginRight: 20
    },
    subtitle:{
        fontSize: 12,
        fontWeight: '500',
        color: '#0000004D',
        marginBottom: 12,
    }
})

export  default MyAbonnement