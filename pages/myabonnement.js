import { View , Text, StyleSheet, FlatList,ActivityIndicator} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";


const MyAbonnement=()=>{
    const [refreshing, setRefreshing] = useState(false);
    const [myabonnement, setMyabonnement] = useState([]);
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
                <Text style={style.title}>Abonnement</Text>
                <Text style={style.title} >Moyen de paiement </Text>
                <Text style={style.title}>Montant</Text>
                <Text style={style.title}>Reference</Text>
                <Text style={style.title}>Statut</Text>
                <Text style={style.title}>Date de paiement</Text>
                <Text style={style.title}>Date de fin</Text>
               </View>
               <View style={style.trailing}>
                <Text style={style.subtitle}>{item.abonement.libelle}</Text>
                <Text style={style.subtitle} numberOfLines={1} >{item.moyen_paiement}</Text>
                <Text style={style.subtitle} numberOfLines={1}>{item.abonement.prix}FCFA</Text>
                <Text style={style.subtitle}>{item.transaction_id}</Text>
                <Text style={[style.subtitle,{color:'green'}]}>{item.statut=="ACCEPTED"?'Paiement accepté':item.statut}</Text>
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