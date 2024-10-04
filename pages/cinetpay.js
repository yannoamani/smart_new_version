import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Reactc, { useState, useEffect } from "react";
import axios from "axios";
import { MotiView } from "moti";
import { Easing } from 'react-native-reanimated';

const Cinetpays = () => {
  const [infoUser, setinfoUser] = useState({}); 
  const getinfoUser = async () => {
    

      try {
        const user= await AsyncStorage.getItem("user");
    setinfoUser(JSON.parse(user));
    console.log('Info utilisateur',JSON.stringify(user))
        
      } catch (error) {
        console.log(error);
        
      }
  }
  useEffect(() => {
    getinfoUser();
  }, []);
  
  const payement = async ( ) => {
    var data = JSON.stringify({
      apikey: "29323203565f8d1235633c4.08272143",
      site_id: "5869904",
     "transaction_id":  Math.floor(Math.random() * 100000000).toString(), //
      "amount": 100,
      "currency": "XOF",
      "alternative_currency": "",
      "description": " TEST INTEGRATION ",
      "customer_id": "172",
      "customer_name": "KOUADIO",
      "customer_surname": "Francisse",
      "customer_email": "harrissylver@gmail.com",
      "customer_phone_number": "+225004315545",
      "customer_address": "Antananarivo",
      "customer_city": "Antananarivo",
      "customer_country": "CM",
      "customer_state": "CM",
      "customer_zip_code": "065100",
      "notify_url": "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
      "return_url": "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
      "channels": "ALL",
      "metadata": "user1",
      "lang": "FR",
      "invoice_data": {
        "Donnee1": "",
        "Donnee2": "",
        "Donnee3": ""
      }
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
          Linking.openURL(response.data.data.payment_url);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  const payement2 = async () => {
   try {
    
    const token = "1983|3vVzjfmup1izvZGZ9fVORnI72vHNqJDLfIOVAKuJ";
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    console.log(token);
    const res = await axios.post("cintepay/paiement", {
      abonement_id: 3,
      channels: "Moov",
    });
    console.log(res.status);
    if (res.status==201||res.status==200) {
        console.log(res.data);
        payement(res.data.data.transaction_id, res.data.data.montant);
        
    }
  
    
   } catch (error) {
    console.log(error);
    
   }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cinetpay</Text>
      <View style={{ height: 40 }}></View>
      <Pressable onPress={() => payement()} style={{ backgroundColor: "blue" , padding:10}}>
        <Text>Cinetpay</Text>
      </Pressable>
      <Text>gn,</Text>
    </View>
  //   <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
  //   <View style={styles.dot}>
  //   <View style={{flex: 1, justifyContent: "center", alignItems: "center" , height: 100, width: 100}}>
  //  {
  //   [...Array(3).keys()].map((i) => {
  //     return <MotiView
  //     from={{ opacity: 1, scale: 1 }}
  //     transition={{
  //       repeatReverse: false,  
  //        type: "timing", duration: 2000,delay:i*400,loop: true, easing: Easing.out(Easing.ease) }}
  //     animate={{ opacity: 0, scale: 4 , }}
  //      key={i} style={[StyleSheet.absoluteFillObject, styles.dot , ] }

  //     />
      

      
  //   })

  //  }
  //  <Ionicons name="call" size={50} color="white" ></Ionicons>

  //   </View>
    
   


  //   </View>

  //   </View>
  );
};

export default Cinetpays;

const styles = StyleSheet.create({
  dot:{
    width:150,
    height:150,
    borderRadius:150/2,
    backgroundColor:'red'
  }
});
