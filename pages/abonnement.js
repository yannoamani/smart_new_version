import { FlatList,Image,ActivityIndicator, View,useWindowDimensions,  StyleSheet, Text, ScrollView, Alert, Pressable } from "react-native";
import style, { styles } from '../pages/styles/Abonnement.js';
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import RenderHtml from 'react-native-render-html';


export default function Abonnement() {
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
    const reseau=[
        {'nom':'ORANGE MONEY', 'logo':require('../assets/Orange-Money-logo.png')},
        {'nom':'MTN MONEY', 'logo':require('../assets/mtn-1-1200x900.jpg')},
        {'nom':'MOOV MONEY', 'logo':require('../assets/images.png')},
        {'nom':'WAVE', 'logo':require('../assets/0PZcR8OO_400x400.jpg')},

    ]
  
    const getinfoUser = async () => {
    

        try {
          const user= await AsyncStorage.getItem("user");
      setinfoUser(JSON.parse(user));
      console.log('Info utilisateur',JSON.stringify(user))
          
        } catch (error) {
          console.log(error);
          
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
           setData(abonnement);
           setLoading(true);
       
        console.log('Je suis ',data);

            
        } catch (error) {
            console.log(error);

            
        }
        
    }
    const payementCinetPay = async ( trans_id, idAmount) => {
        var data = JSON.stringify({
          apikey: "29323203565f8d1235633c4.08272143",
          site_id: "5869904",
          transaction_id: trans_id,
          mode: "PRODUCTION", //
          amount: idAmount,
          currency: "XOF",
          close_after_response: true,
          alternative_currency: "",
          description: " TEST INTEGRATION ",
          customer_id: infoUser.id,
          customer_name: infoUser.nom,
          customer_surname: infoUser.prenoms,
          customer_email: infoUser.email,
          customer_phone_number: infoUser.phone,
          customer_address: infoUser.commune,
          customer_city: infoUser.quartier,
          customer_country: "CM",
          customer_state: "CM",
          customer_zip_code: "065100",
          notify_url: "http://192.168.1.9:8000/api/cintepay/verification_paiement/"+trans_id,
          return_url: "https://google.com",
          channels: "ALL",
          metadata: "user1",
          lang: "FR",
          lock_phone_number: false,
        });
    
        var config = {
          method: "post",
          url: "https://api-checkout.cinetpay.com/v2/payment",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
    
        await axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.data.data.payment_url);
            Linking.openURL(response.data.data.payment_url);
    
            if (response.code == 201) {
              Linking.openURL(response.data.data.payment_url);
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      };

      const dopaiement = async () => {
        try {
         
         const token = await AsyncStorage.getItem('token');
         if (token) {
           axios.defaults.headers.common.Authorization = `Bearer ${token}`;
         }
         console.log(token);
         const res = await axios.post("cintepay/paiement", {
           abonement_id: selectedIndex,
           channels: moyenPayement,
         });
         console.log(res.status);
         if (res.status==201||res.status==200) {
             console.log(res.data);
             payementCinetPay(res.data.data.transaction_id, res.data.data.montant);
             
         }
       
         
        } catch (error) {
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
    }, [])
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
            <Text style={newstyle.title}>MOYENS DE PAYEMENT</Text>
            <View style={{height:10}}></View>
            {reseau.map((resea, index) => (
     <Pressable onPress={()=>{
        setMoyenPayement(resea.nom)
        // setSelecAbonnement(resea.nom)
       
     }}>
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
        resea.nom==moyenPayement? <Ionicons name="checkmark" size={30} color={'red'}></Ionicons>: <View></View>
       }
        
    </View>
   </View>
     </Pressable>
     
))}
<View height={40}></View>

<Pressable
onPress={()=>{
   if(moyenPayement && abonnement){
    Alert.alert('Attention','Abonnement '+ abonnement+" Payer par : "+moyenPayement+" ", [{ text: 'Oui', onPress: () => {dopaiement()} },{ text: 'Annuler', onPress: () => console.log('Annuler') }], { cancelable: true });
   }
   else{
    Alert.alert('Attention','Veuillez choisir un abonnement ', [,{ text: 'Annuler', onPress: () => console.log('OK') }], { cancelable: true });
   }
    // buyAbonnement();

}}
 style={style.button}>{charging? <ActivityIndicator  style={{ flex: 1 ,alignItems: 'center', justifyContent: 'center'}}size="large" color="white" />: <Text style={style.textButton}>Payer</Text>}</Pressable>

            
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
     }

})