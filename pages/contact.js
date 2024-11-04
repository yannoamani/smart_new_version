import { FlatList,StyleSheet,useWindowDimensions, View, Text, ScrollView, Pressable, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderHtml from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate, isDateTimeGreaterThanCurrent } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import translate from "translate";
import { useSelector } from 'react-redux';
  


export default function Contact({route}) {
    const { width } = useWindowDimensions();
    const lang = useSelector((state) => state.translate.lang);
    const { data } = route.params;
    const navigation = useNavigation();
    const { already } = route.params;
    //const [data, setData] = useState();
    const [userinfo, setUseinfo] = useState();
    const [desc, setDesc] = useState();
    const [policeBold, setPolices] = useState("Poppins_700Bold");
  const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
  const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");
  const [texttranslate, setTexttranslate] = useState({
    DDetailsOofre:lang=="fr"?"Details de l'offre":"Offer details",
    DateCloture:lang=="fr"?"Date de cloture":"Closing date",
    Refuser:lang=="fr"?"Refuser":"Refuse",
    Accepter:lang=="fr"?"Accepter":"Accept",
    RefusOffre:lang=="fr"?"Vous avez refusée cette l'offre":"You have refused this offer",
    AccepterOffre:lang=="fr"?"Offre acceptée":"Offer accepted",
    reponder:lang=="fr"?"Repondre":"Respond",
    Download:lang=="fr"?"Telecharger votre attestation ici":"Download your attestation here",
    Question:lang=="fr"?"Voulez-vous accepter cette offre ?":"Do you want to accept this offer ?",
    Yes: lang=="fr"?"Oui":"Yes",
    No: lang=="fr"?"Non":"No",
Attendre:lang=="fr"?"En attente":"Waiting",
Succes:lang=="fr"?"Succes":"Success",
DownloadSucces:lang=="fr"?"Telecharger réussie":"Download success",
bodyDownloadSuccess:lang=="fr"?"Veillez vous rendre dans notre siège avec ce document":"Please visit our office with this document",


  })
    const translation = async () => {
      
        // const detailsOofre = await translate("Details de l'offre", { from: 'fr', to: lang });
        // const dateCloture = await translate("Date de cloture", { from: 'fr', to: lang });
       
        // const refuser = await translate("Refuser", { from: 'fr', to: lang  });
        // const accepter = await translate("Accepter", { from: 'fr', to: lang  });
        // const refusOffre = await translate("Vous avez refusée cette l'offre", { from: 'fr', to: lang  });
        // const accepterOffre = await translate("Offre acceptée", { from: 'fr', to: lang  });
        // const download = await translate("Telecharger votre attestation ici", { from: 'fr', to: lang });
        // const question = await translate("Voulez-vous accepter cette offre ?", { from: 'fr', to: lang  });
        // const yes = await translate("Oui", { from: 'fr', to: lang  });
        // const no = await translate("Non", { from: 'fr', to: lang  });
        // const repondre = await translate("Repondre", { from: 'fr', to: lang  });
        // const succes = await translate("Succes", { from: 'fr', to: lang  });
        // setTexttranslate({
        //     DDetailsOofre:detailsOofre,
        //  DateCloture:dateCloture,
        //     Refuser:refuser,
        //     Accepter:accepter,
        //     RefusOffre:refusOffre,
        //     AccepterOffre:accepterOffre,
        //     Download:download,
        //     Question:question,
        //     Yes:yes,
        //     No:no,
        //     reponder:repondre,
        //     Attendre:await translate("Attendre", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' }),
        //     Succes:succes


      
        
        // })
      }
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
    const verifierabonement = async () => {
    try {
      // data;
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      const res = await axios.get("handleAbonnementExpired");
      setData(res.data.data);
     console.log('verification de mon paiement',res.data);
    } catch (error) {
      console.log(error);
       console.log("verifier paiement",error.response.data.message);
     
    }
    
  }
  const html = `

  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
  <div style="padding: 16px;">
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
          <div style="height: 100px; align-items: center; justify-content:center; display: flex;">
              <h1 style="font-weight: bold; color: green; text-align: center;">${data.nom.toUpperCase()}</h1>
          </div>
          <div style=" height: 100px; width: 100px; display: flex;">
              <img src="https://i.postimg.cc/pXGNKVF4/Whats-App-Image-2024-08-12-11-07-09-dfada05d.jpg" alt="Image" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style=" height: 100px; width: 100px; ">
              <img src="https://lce-ci.com/assets/img/l.png" alt="Image" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
      </div>
      <div style="height: 40px;"></div>
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ;">
      <p style="font-weight: bold; margin: 0;">Adresse: <span style="font-weight: normal;">${data.ville}</span></p>
      </div>
      
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
          <p style="font-weight: bold; margin: 1;" >Contact: <span style="font-weight: normal;">${data.contact}</span></p>
  </div>
      <div style="height: 50px;"></div>
      <p style="font-weight: bold; text-align: center; font-size: 30px; ;">ATTESTATION D'ADMISSION</p>
      <div style="height: 30px;"></div>
      <p style="font-weight: bold; font-size: 20px;">Offre : ${data.pivot.offre.nom_offre}</p>
    <p> <span>L'entreprise ${data.nom} vous a acceptée Mr(Mme) ${userinfo},  au sein de son entreprise pour 
      effectuer un travail dans la categorie ${data.pivot.offre.categorie.categorie} vu votre disponibilité. Merci de contacter l'entreprise pour plus de détail.</span></p>

      <div style="height: 20px;"></div>
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
          <p style="font-weight: bold; margin: 1;" >Honoraire: <span style="font-weight: normal;">${data.pivot.offre.salaire==null?null:data.pivot.offre.salaire+'FCFA'}</span></p>
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
          <p style="font-weight: bold; margin: 1;" >Contact du gérant: <span style="font-weight: normal;">08125403</span></p>
      </div>
      <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
          <p style="font-weight: bold; margin: 1;" >Lieu: <span style="font-weight: normal;">${data.pivot.offre.lieu}</span></p>
      </div>
      <div style="height: 50px;"></div>
      <p style="font-weight: bold; font-size: 15px; text-align: right;">Fait à abidjan le ${new Date(data.updated_at).toLocaleDateString()}</p>
      
      
  </div>
  </body>
  </html>
  
  `;
  const printToFileAndShare = async () => {
      try {
        const { uri } = await Print.printToFileAsync({ html });
    
    // Définir l'emplacement de téléchargement
    const fileUri = `${FileSystem.documentDirectory}mon_document.pdf`;
    
    // Déplacer le PDF généré à l'emplacement souhaité
    await FileSystem.moveAsync({
      from: uri,
      to: fileUri,
    });
    
    Alert.alert(texttranslate.DownloadSucces, texttranslate.bodyDownloadSuccess);
    
    // Partager le PDF
    await  shareAsync(fileUri, {
      UTI: '.pdf', // Type de fichier
      mimeType: 'application/pdf', // Type MIME
    });
    
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors du téléchargement du PDF.');
    }
    
    };
    const getuser = async () => {
      try {
          const user = await AsyncStorage.getItem('user')
          if (user!=null) {
              const allinfo = JSON.parse(user)
              setUseinfo(allinfo.nom+ ' '+ allinfo.prenoms)
          }
          
      } catch (error) {
          console.log(error)
          
      }
        
    }
  

    useEffect(() => {
        getOffer();
        getuser();
// translation()
        console.log("data",data);
        const interval= setInterval(async () => {
      const abonement = await AsyncStorage.getItem('abonnement');
        // console.log("abonnement",abonement);
   if (abonement) {
    const mabonnement = JSON.parse(abonement);
    // console.log("abonnement",mabonnement);
    
    if (isDateTimeGreaterThanCurrent(mabonnement.echeance)) {
      console.log("Vous ", abonement);
      verifierabonement();
      clearInterval(interval);
      
    }
    else{
    return ;
    }
   }

    
  }, 5000);

    }, [lang]);

    return (
        <View 
            style={style.allcontainer}
        >
        <ScrollView style={{flex:1}}>
        {data ? (
                <View >
                <View style={style.container}>
                <Text style={[style.detailoffre,{fontFamily:policeRegular}]} >{texttranslate.DDetailsOofre}</Text>
                <View style={style.subtile}>
                <Ionicons name={"location-outline"} color={'black'} size={20}></Ionicons>
                <View style={{width:3}}></View>
                <View>
                    <Text style={[style.nom_entreprise,{fontFamily:policeRegular}]}>{data.nom}</Text>
                    <Text style={[style.location,,{fontFamily:policeRegular}]}>{data.pivot.offre.lieu}</Text>
                </View>
                 </View>
                 <View style={{height:15}}></View>
                 <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "mail-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
              
   <Text style={[style.info,{fontFamily:policeRegular}]}>{data.email}</Text>
   </View>
   <View style={{height:15}}></View>
   <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "call-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={[style.info,{fontFamily:policeRegular}]}>{data.contact}</Text>
   
  </View>
  <View style={{height:15}}></View>
  {
        data.pivot.offre.salaire==null?null:  <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "cash"}
              color={'gray'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={[style.info,{fontFamily:policeRegular}]}>{ data.pivot.offre.salaire} FCFA </Text>
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
              
 <Text style={[style.info,{fontFamily:policeRegular}]}>{data.pivot.contrat==1?texttranslate.Accepter:data.pivot.contrat==0? texttranslate.Attendre:texttranslate.Refuser}</Text>
   </View>
   <View style={{height:15}}></View>
   <Text style={[style.date, {fontFamily:policeRegular}]}>{texttranslate.DateCloture} :  {data.pivot.offre.fin}</Text>
   
   </View>
   <View style={{height:25}}></View>{
    data.pivot.contrat==1? 

    <Pressable  onPress={printToFileAndShare}>
          <View style={{padding:16, color:"black",borderWidth:1,  borderRadius:10,flexDirection:'row', alignItems:'center', }}>
            <Ionicons name="download-outline" size={25} color="green"/>
            <Text style={{fontFamily:policeRegular, fontSize:15, fontWeight:'500'}}> {texttranslate.Download}</Text>

 {/* <Text style={{fontSize:20, fontWeight:'bold', padding:10, backgroundColor:'red' , color:'white'}} onPress={printToFileAndShare}>{TextTranslation.Download}</Text>:null */}
          

            </View>
          </Pressable>: null
   }
   <View style={{height:25}}></View>
        <Text style={style.titleDescription}>{data.nom_offre}</Text>
        <View style={{height:25}}></View>
        
        <RenderHtml
      contentWidth={width}
      source={{ html: data.description }}
    />

                    {
                        (data.pivot.contrat == 0 && new Date(data.pivot.offre.fin) > new Date()) ? 
                        <Pressable style={style.button} onPress={async () => {
                            try {
                                const token = await AsyncStorage.getItem('token')
                                if (token) {
                                    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                                }
                                Alert.alert(texttranslate.reponder, texttranslate.Question, [
                                    {text: texttranslate.Refuser, onPress: async () => {
                                      try {
                                        const dat = await axios.put('changeStatutJob/'+data.pivot.id, {contrat: 2})
                                        Alert.alert(texttranslate.Succes, texttranslate.RefusOffre, [{ text: 'OK'}])
                                      } catch (error) {
                                        Alert.alert("Echec", JSON.stringify(error.message), [{ text: 'OK'}], {cancelable: true})
                                      }
                                    }},
                                    {text: texttranslate.Accepter, onPress: async () => {
                                        const dat = await axios.put('changeStatutJob/'+data.pivot.id, {contrat: 1})
                                        Alert.alert(texttranslate.Succes, texttranslate.AccepterOffre, [{ text: 'OK'}])
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
                        <Text style={{
  textAlign: 'center',
  fontSize: 22,
  fontWeight: '600',
  color: '#F44336', 
  backgroundColor: '#FFEBEE',
  padding: 15,
  marginVertical: 10,
  borderRadius: 8, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5, 
}}>
  L'offre a expiré
</Text>
:
                        <Text style={{
  textAlign: 'center',
  fontFamily: policeRegular,
  fontSize: 20,
  fontWeight: 'bold',
  color: data.pivot.contrat == 1 ? '#4CAF50' : '#F44336', 
  backgroundColor: data.pivot.contrat == 1 ? '#E8F5E9' : '#FFEBEE', 
  padding: 15,
  marginVertical: 10,
  borderRadius: 8, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5, 
}}>
{
    data.pivot.contrat == 1 ? texttranslate.AccepterOffre : texttranslate.RefusOffre
}


                       
            
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
        fontSize: 15,
        flex: 1
      },
      date:{
        color:'#FF0000',
        fontWeight:'500',
        fontSize: 15
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
