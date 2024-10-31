import { FlatList,Image,ActivityIndicator, View,useWindowDimensions, Modal,  StyleSheet, Text, ScrollView, Alert, Pressable, Linking } from "react-native";
import style, { styles } from '../pages/styles/Abonnement.js';
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import RenderHtml from 'react-native-render-html';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import translateText from "../pages/store/TranslationUtils.js"

export default function Abonnement() {
  const {t}=useTranslation();
  const lang = useSelector((state) => state.translate.lang);
    const { width } = useWindowDimensions();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [data, setData] = useState([]);
    const [abonnement, setAbonnement] = useState();
    const [moyenPayement, setMoyenPayement] = useState();
    const [selectAbonnement , setSelecAbonnement] = useState();
    const [loading, setLoading] = useState(false);
    const [charging, setCharging] = useState(false);
    const [policeBold, setPolices] = useState("Poppins_700Bold");
    const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
    const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");
    const [infoUser, setinfoUser] = useState({}); 
    const [trans_id, setTrans_id] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [veri, setveri] = useState('');
    const [TextTranslate, setTextTranslate] = useState({
      Methode:"Methode de paiement",
      Souscrire:"Souscrire",
      Attention:"Attention",
      sousAttention:"Veuillez selectionner une methode de paiement",
      Annuler:"Annuler",
      Payer:"Payer",
      Oui:"Oui",
      Non:"Non",
      Echec:"Echec",
      Abonnement:"Abonnement",
      Paiement:"Paiement",
      TitleSucces:"Paiement Réussi !",
      TitleFailed:"Echec de paiement",
      PaiementSuccess:"Félicitations, votre paiement a été traité avec succès.",
      PaiementFailed:"Votre paiement a echoué",
      PayerWith:"Payer avec",

      
    })
    const Translation= async()=>{
      const methode = await translateText(TextTranslate.Methode, lang);
      const souscrire = await translateText(TextTranslate.Souscrire, lang);
      const attention = await translateText(TextTranslate.Attention, lang);
      const sousAttention = await translateText(TextTranslate.sousAttention, lang);
      const Annuler = await translateText(TextTranslate.Annuler, lang);
      const Payer = await translateText(TextTranslate.Payer, lang);
      const Oui = await translateText(TextTranslate.Oui, lang);
      const Non = await translateText(TextTranslate.Non, lang);
      const Abonnement = await translateText(TextTranslate.Abonnement, lang);
      const Paiement = await translateText(TextTranslate.Paiement, lang);
      const TitleSucces = await translateText(TextTranslate.TitleSucces, lang);
      const TitleFailed = await translateText(TextTranslate.TitleFailed, lang);
      const PaiementSuccess = await translateText(TextTranslate.PaiementSuccess, lang);
      const PaiementFailed = await translateText(TextTranslate.PaiementFailed, lang);
      const PayerWith = await translateText(TextTranslate.PayerWith, lang);
      const echec = await translateText(TextTranslate.Echec, lang);
      setTextTranslate({
        Methode:methode,
        Souscrire:souscrire,
        Attention:attention,
        sousAttention:sousAttention,
        Annuler:Annuler,
        Payer:Payer,
        Oui:Oui,
        Non:Non,
        Abonnement:Abonnement,
        Paiement:Paiement,
        TitleSucces:TitleSucces,
        TitleFailed:TitleFailed,
        PaiementSuccess:PaiementSuccess,
        PaiementFailed:PaiementFailed,
        PayerWith:PayerWith,
        echec:echec
      })

    }
    

    const reseau=[
        {'nom':'ORANGE MONEY', 'logo':require('../assets/Orange-Money-logo.png')},
        {'nom':'MTN MONEY', 'logo':require('../assets/mtn-1-1200x900.jpg')},
        {'nom':'MOOV MONEY', 'logo':require('../assets/images.png')},
        {'nom':'WAVE', 'logo':require('../assets/0PZcR8OO_400x400.jpg')},]

  
    const getinfoUser = async () => {
    

        try {
          const user= await AsyncStorage.getItem("user");
      setinfoUser(JSON.parse(user));
      console.log('Info utilisateur',JSON.stringify(user))
          
        } catch (error) {
          console.log(error);
          
        }
    }
    
 const verifPaiement = async (trans_id) => {
  try {
 
      console.log("Fonction paiement");
      const res = await axios.post("cintepay/verification_paiement/"+trans_id);
      const donne= res.data;
      console.log('REPONSE Paiement',donne);
      await AsyncStorage.setItem('abonnement', JSON.stringify(donne));
      
      // donne.forEach(async (offre) => {
      //   if (offre.statut=='ACCEPTED') {
      //     console.log("Objet de abonnement ",offre);
          // await AsyncStorage.setItem('abonnement', JSON.stringify(offre));
          
      //   }
      // });
    // if (donne.includes("Echec")) {
    //   console.log("Echec");
      // setIsSuccess(false);
      
      
    // }
    // else{
      console.log("Succes");
      setIsSuccess(true);
    // }
      setModalVisible(true);
      setTrans_id("");
   
   
    
  } catch (error) {

    console.log("Reponse payement",error);
    setModalVisible(true);
    setIsSuccess(false);
    setTrans_id("");
    
  }
 
}
    


    const getAbonnement= async()=>{
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('getAbonnement');
           const donne= res.data.data;
           const abonnement= donne.filter(offre => offre.categorie.categorie === 'Etudiant');

           const abonnementTraduit = await Promise.all(
            abonnement.map(async (offre) => {
                return {
                    ...offre,
                    titre: await translateText(offre.libelle, lang), 
                    description: await translateText(offre.description, lang), 
                    
                };
            })
        );
           setData(abonnementTraduit);
           setLoading(true);
       
        console.log('Je suis ',donne);

            
        } catch (error) {
            console.log(error);

            
        }
        
    }
    const payementCinetPay = async ( trans_id, idAmount) => {
      console.log("ALLO",trans_id);
      console.log("ALLOIDAMOUNT",idAmount);
    console.log("infoUser",infoUser)
      let data = JSON.stringify({
            apikey: "29323203565f8d1235633c4.08272143",
            site_id: "5869904",
            transaction_id:trans_id,
            amount: idAmount,
            currency: "XOF",
            notify_url:"http://back-smart-connect.lce-ci.com/api/cintepay/verification_paiement/"+trans_id,
            return_url: "https://lce-ci.com",
            cancel_url: "https://lce-ci.com",
            close_after_response: true,
            alternative_currency: "XOF",
            description: " TEST INTEGRATION",
            customer_id: infoUser.id,
          customer_name: infoUser.nom,
          customer_surname: infoUser.prenoms,
          customer_email: infoUser.email,
          customer_phone_number: infoUser.phone,
          customer_address: infoUser.commune,
          customer_city: infoUser.quartier,
            channels:moyenPayement,
            lock_phone_number: false,
            lang: "FR",
});
console.log("DATA454",data)
        let config = {
          method: "post",
          url: "https://api-checkout.cinetpay.com/v2/payment",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
     
        await axios(config)
          .then(function (response) {
            console.log(response.data);
            console.log(response.data.data.payment_url);
            // Linking.openURL(response.data.data.payment_url);
            Linking.openURL(response.data.data.payment_url);
            setTrans_id(trans_id);
           
          })
          .catch(function (error) {
            console.log("error", error);
          });
      };

      const dopaiement = async () => {
        const trans_id=Math.floor(Math.random() * 100000000).toString();
        try {
         
         const token = await AsyncStorage.getItem('token');
         if (token) {
           axios.defaults.headers.common.Authorization = `Bearer ${token}`;
         }
         console.log(token);
       
         const res = await axios.post("cintepay/paiement", {
           abonement_id: selectedIndex,
           channels: moyenPayement,
           transaction_id:trans_id
         });
         console.log(res.status);
         if (res.status==201||res.status==200) {
          
             console.log(res.data);
            payementCinetPay(res.data.data.transaction_id, res.data.data.montant);
             
         }
       
         
        } catch (error) {
          const message= error.response.data.message;
          const transalteText=await translateText(message, lang);
          Alert.alert(TextTranslate.Echec, transalteText, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
         console.log(error);
         
        }
       };
    const buyAbonnement = async () => {
        setCharging(true);
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            
            const res=await  axios.post("do_an_abonnement",{
                "abonement_id": selectedIndex,
                "moyen_paiement": moyenPayement
              })
              console.log(res);
              setCharging(false);
            
            

            
        } catch (error) {
            console.log(error);
            setCharging(false);
            Alert.alert("Echec", JSON.stringify(error.response.data.message), [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            
        }
    }
    useEffect(() => {

        getAbonnement();
        Translation();
        const interval = setInterval(() => { 
          if(trans_id){
            try{
             setTimeout(() => {
              verifPaiement(trans_id);
              
             }, 1000);
              // console.log(trans_id);
            }catch(error){
              console.log(error);
           }
            
           }else{
            return;}
    }, 1000);
    return () => clearInterval(interval);
    }, [trans_id,lang])
    const cardAbonnement=({item})=>{
        

      
        return (
     <Pressable onPress={() => {
         setSelectedIndex(item.id);
        //  Alert.alert('Attention', "Vous avez choisi l'abonnement "+ item.libelle, [{ text: 'Oui', onPress: () => console.log('OK') },{ text: 'Annuler', onPress: () => console.log('Annuler') }], { cancelable: true });
        setAbonnement(item.libelle);
     }}>
          <View style={[newstyle.cardAbonnement, { borderColor: selectedIndex===item.id ? '#F38B2B' : 'white' }]}>

        <Text style={newstyle.titletext}>{item.libelle}</Text>
        {/* <Icon name="subscriptions" size={24} color="#000" /> Icône optionnelle */}
  
    
      <Text style={style.price}>{item.prix} FCFA / Année</Text>
      <RenderHtml
      contentWidth={width}
      source={{ html: item.description }}
    />
     
    </View>
     </Pressable>
  );
    }
    return (
     
        <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 30 }}>
        {/* <Pressable onPress={getAbonnement} style={{height:"100%"}}><Text>ccx</Text></Pressable> */}
        {
            loading? 
            <FlatList  
       data={data}
       keyExtractor={(item) => item.id}
       renderItem={cardAbonnement}
       ListFooterComponent={
        <View style={{flex:1, flexDirection:'column',}} >
        <View style={{height:15}}></View>
            <Text style={newstyle.title}>{TextTranslate.Methode} </Text>
            <View style={{height:10}}></View>
            {reseau.map((resea, index) => (
     <Pressable onPress={()=>{
        setMoyenPayement(resea.nom!="WAVE"?'MOBILE_MONEY':'WALLET')
        setveri(resea.nom)
        // setSelecAbonnement(resea.nom)
       
     }} key={index}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={newstyle.centeredView}>
          <View style={newstyle.modalView}>
            <View style={[newstyle.modalView, isSuccess ? newstyle.successCard : newstyle.failCard]}>
            <Text style={newstyle.modalText}>
            {isSuccess ?  TextTranslate.TitleSucces :  TextTranslate.TitleSucces}
          </Text>
          <Text style={newstyle.detailText}>
            {isSuccess
              ? TextTranslate.PaiementSuccess
              : TextTranslate.PaiementFailed}
          </Text>
          <Pressable
            style={[newstyle.button, isSuccess ? newstyle.buttonSuccess : newstyle.buttonFail]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={newstyle.textStyle}>Fermer</Text>
          </Pressable>

            </View>
          </View>
        </View>
      </Modal>
     <View style={{margin:4}}>
   <View key={index} style={style.wallet}>
        <View style={{width: 40, height: 40}}>
            <Image 
                style={{width: '100%', height: '100%'}}
                source={resea.logo}
            />
        </View>
        <View style={{width: 10}}></View>
        <Text>{resea.nom}</Text>
        <Text>{ }</Text>
        <View width={10}></View>

       {
        resea.nom==veri? <Ionicons name="checkmark" size={30} color={'red'}></Ionicons>: <View></View>
       }
        
    </View>
   </View>
     </Pressable>
     
))}
<View height={40}></View>

       <View height={40}></View>

<Pressable
onPress={()=>{
   if(moyenPayement && abonnement){
    Alert.alert(TextTranslate.Attention,TextTranslate.Abonnement +' '+abonnement+" "+TextTranslate.PayerWith+" "+moyenPayement+" ", [{ text: TextTranslate.Annuler,  },{ text: TextTranslate.Oui, onPress: () => {dopaiement()} },], { cancelable: true });
   }
   else{
    Alert.alert(TextTranslate.Attention,TextTranslate.sousAttention, [,{ text:TextTranslate.Annuler, onPress: () => console.log('OK') }], { cancelable: true });
   }
    // buyAbonnement();

}}
 style={style.button}>{charging? <ActivityIndicator  style={{ flex: 1 ,alignItems: 'center', justifyContent: 'center'}}size="large" color="white" />: <Text style={style.textButton}>{TextTranslate.Souscrire}</Text>}</Pressable>

            
          <View height={40}></View>
           
        </View>
       }

       />: <ActivityIndicator  style={{ flex: 1 ,alignItems: 'center', justifyContent: 'center'}}size="large" color="#F38B2B" />
        }
            
       
          
        </View>
        
    );
}
const newstyle= StyleSheet.create({
    cardAbonnement:{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginVertical: 16,
        marginHorizontal: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: 'white',
     },
     titletext:{
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 1,
     },
     title:{
        fontSize: 24,
        fontWeight: '700',
     },
     centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arrière-plan semi-transparent
    },
    modalView: {
      width: 300,
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    successCard: {
      backgroundColor: '#d4edda', // Vert clair pour succès
      borderColor: '#c3e6cb',
      borderWidth: 1,
    },
    failCard: {
      backgroundColor: '#f8d7da', // Rouge clair pour échec
      borderColor: '#f5c6cb',
      borderWidth: 1,
    },
    modalText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
    },
    detailText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#555',
      marginBottom: 20,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      width: 150,
      alignItems: 'center',
      elevation: 2,
    },
    buttonSuccess: {
      backgroundColor: 'green',
    },
    buttonFail: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },

})