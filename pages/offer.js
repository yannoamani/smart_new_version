import { FlatList, View, loader,Text,Image, ScrollView,useWindowDimensions, Pressable, Alert } from "react-native";
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
    // const conversion=()=>{
    //  return   setDesc(detailsOffres.description.replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  '))
    // }
    const getOffer = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            // const user = await AsyncStorage.getItem('user')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            // console.log(JSON.parse(user));
            const offer = await axios.get('detail_offre/'+ id)
            setData(offer.data.data);
            //console.log(offer.data);
            const res = await axios.get('get_offres_postule');
            console.log("res",res.data.data.offres);
            console.log(already);
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
        // <View 
        //     style={styles.containerOffer}
        // >
        //     {data ? (
        //         <View >
        //             <Text style={styles.basicTitleText}>
        //                 <Ionicons name="briefcase" size={20} /> {data.nom_offre}
        //                 ({data.categorie.categorie.toUpperCase()})
        //             </Text>
        //             {desc ? 
        //                 <Text style={styles.basicText}>
        //                     {
        //                        "-"+ desc.join('\n-')
        //                     }
        //                 </Text>
        //                 : (
        //                 <Text style={{ textAlign: 'center' }}>
        //                     Néant
        //                 </Text>
        //             )}
        //             <Text style={{
        //                 borderBottomWidth: 1,
        //                 fontSize: 20,
        //                 fontWeight: 'bold',
        //                 textAlign: 'center',
        //                 // paddingHorizontal: '20%',
        //                 marginBottom: '2%',
        //                 marginTop: '2%'
        //             }}>
        //                 Détails de l'offre :
        //             </Text>
        //             <Text style={styles.basicText}>
        //                 <Ionicons name="calendar-outline" size={20} color="#87CEEB" /> &nbsp;
        //                 Periode : Du {data.debut} au {data.fin}
        //             </Text>
        //             <Text style={styles.basicText}>
        //                 <Ionicons name="location-outline" size={20} color="#87CEEB" /> &nbsp;
        //                 Lieu : {data.lieu}
        //             </Text>
        //             <Text style={styles.basicText}>
        //                 <Ionicons name="contrast-outline" size={20} color="#87CEEB" /> &nbsp;
        //                 Paiement par : {data.pointage}
        //             </Text>
        //             <Text style={styles.basicText}>
        //                 <Ionicons name="cash-outline" size={20} color="#87CEEB" /> &nbsp;
        //                 Salaire : {data.salaire}
        //             </Text>
        //             <Text style={{
        //                 borderBottomWidth: 1,
        //                 fontSize: 20,
        //                 fontWeight: 'bold',
        //                 textAlign: 'center',
        //                 // paddingHorizontal: '20%',
        //                 marginBottom: '2%',
        //                 marginTop: '2%'
        //             }}>
        //                 Détails de l'entreprise :
        //             </Text>
        //             <Text style={styles.basicText}>
        //                 <Ionicons name="business-outline" size={20} color="#87CEEB" /> &nbsp;
        //                 Entreprise : {data.entreprise.nom}
        //             </Text>
        //             <Text style={styles.basicText}>
        //                 <Ionicons name="mail-outline" size={20} color="#87CEEB" /> &nbsp;
        //                 Mail : {data.entreprise.email}
        //             </Text>
        //             {
        //                 (already == false && new Date(data.debut) > new Date()) ? 
        //                 <Pressable style={{
        //                     backgroundColor: '#87CEEB',
        //                     width: "30%",
        //                     marginTop: 10,
        //                     alignSelf: 'center',
        //                     borderRadius: 20,
        //                     padding: "2%"
                        // }} onPress={async () => {
                        //     try {
                        //         const token = await AsyncStorage.getItem('token')
                        //         if (token) {
                        //             axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                        //         }

                        //         const dat = await axios.post('postule_offre', {offre_id: data.id})
                               
                        //         Alert.alert("Réussi", "Vous avez postulé", [{ text: 'OK'}])
                        //         // navigation.goBack()
                               
                        //         console.log(dat)
                        //     } catch (error) {
                        //         navigation.goBack();
                        //         Alert.alert("Echec", JSON.stringify(error.response.data.message), [{ text: 'OK'}])
                            
                        //         console.log(error);
                                
                        //     }
        //                 }}>
        //                     <Text style={{
        //                         textAlign: 'center',
        //                         fontSize: 20
        //                     }}>
        //                         Postuler
        //                     </Text>
        //                 </Pressable> : 
        //                 <Text style={{
        //                     textAlign: 'center',
        //                     fontSize: 30,
        //                     fontWeight: 'bold',
        //                     color: 'red'
        //                 }}>
        //                     Offre expirée / Vous avez déjà postulé à cette offre
        //                 </Text>
        //             }
        //         </View>
        //     ) : (
        //         <Text style={styles.titleText}>Loading...</Text>
        //     )}
        // </View>
        <View style={{flex: 1,padding:10}}>
        <ScrollView style={{flex: 1}}>
        {/* <Text style={{fontSize: 17,textAlign: 'center', fontWeight: 'bold', marginBottom: 10}}>{detailsOffres.nom_offre.toUpperCase()} - {detailsOffres.entreprise.nom.toUpperCase()}</Text> */}
        <View style={{height:10}}></View>
        <View style={{  width:'100%', borderWidth: 1, padding: 10, backgroundColor: 'white',borderColor: 'transparent', borderRadius: 10}}>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%',flex: 1}}>
        <View style={{height:50, width: 50 ,resizeMode:'cover',  borderRadius: 20}}>
        <Image source={{uri: "https://new.newpowerjuca.com/templates/empower/images/job.png"}} style={{width: 50, height: 50, borderRadius: 20}}></Image>
   </View>
   <View style={{width:2}}></View>
 
        
    <View style={{width:1}}></View>
   <View>
   <Text style={{color:'black', flex: 1, fontSize: 17,fontWeight:'bold',}}  numberOfLines={1} ellipsizeMode="tail">{detailsOffres.nom_offre} </Text>
   <Text style={{color:'black', flex: 1, fontSize: 15,fontWeight:'500', color:'gray'}}>{detailsOffres.entreprise.nom}</Text>
   </View>
  
  

        </View>
        <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "location-sharp"}
              color={'black'}
              size={25  } />
               <View style={{width:10}}></View>
   <Text style={{color:'black', flex: 1, fontSize: 15,fontWeight:'500',}}>{detailsOffres.lieu}</Text>
   </View>
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "mail-outline"}
              color={'black'}
              size={25  } />
              <View style={{width:10}}></View>
              <Loader loading={loadin}></Loader>
              
   <Text style={{color:'black', flex: 1, fontSize: 15,fontWeight:'500',}}>{detailsOffres.entreprise.email}</Text>
   </View>
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "call-outline"}
              color={'black'}
              size={25  } />
              <View style={{width:10}}></View>
              
   <Text style={{color:'black', flex: 1, fontSize: 15,fontWeight:'500',}}>{detailsOffres.entreprise.contact}</Text>
   </View>
   <View style={{height:15}}></View>
      {
        detailsOffres.salaire==null?null:  <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "cash"}
              color={'gray'}
              size={25  } />
              <View style={{width:10}}></View>
              
   <Text style={{color:'black', flex: 1, fontSize: 15,fontWeight:'500',}}>{detailsOffres.salaire} FCFA </Text>
   </View>
      }
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "checkmark-circle-outline"}
              color={already==false?'gray':'green'}
              size={25  } />
              <View style={{width:10}}></View>
              
  {
    already==false? <Text style={{color:'black', flex: 1, fontSize: 15,fontWeight:'500',}}>Pas encore postuler </Text> : <Text style={{color:'black', flex: 1, fontSize: 15,fontWeight:'500',}}>Déja postuler </Text>
  }
   </View>
   <View style={{height:15}}></View>
   <Text style={{color:'white',textAlign:'center',padding:2,backgroundColor:'red',  fontSize: 15,fontWeight:'500',}}>Date Limite est {detailsOffres.fin}</Text>
        
      
     

        </View>
        <View style={{height:15}}></View>
        <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 10}}>Description</Text>
        <View style={{  width:'100%', borderWidth: 1, padding: 10, backgroundColor: 'white',borderColor: 'transparent', borderRadius: 10}}>
        <RenderHtml
      contentWidth={width}
      source={{ html: detailsOffres.description }}
    />
        {/* <Text style={{color:'black', flex: 1, fontSize: 15,}}>{desc}</Text> */}
        </View>
        <View style={{height:20}}></View>
       {
        already==false && new Date(detailsOffres.debut) > new Date() ? <View style={{  width:'100%', backgroundColor:'blue', height:50, borderRadius: 10}}>
            <Pressable style={{flex:1, justifyContent:'center', alignItems:'center'}}
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
                            } catch (error) {
                                navigation.goBack();
                                Alert.alert("Echec", JSON.stringify(error.response.data.message), [{ text: 'OK'}])
                                setLoadin(false)
                            
                                console.log(error);
                                
                            }}
            }
            
            >
                <Text style={{color:'white', fontSize: 15,fontWeight:'500',}}>Postuler maintenant</Text>
            </Pressable>
        </View> : null
       }
    
        

        
      
     

        

          

        </ScrollView>

        </View>
    )
}
