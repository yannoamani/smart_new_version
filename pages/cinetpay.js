import { StyleSheet,Button,Platform,Modal, Text,Alert, View, Pressable, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Reactc, { useState, useEffect } from "react";
import axios from "axios";
import { MotiView } from "moti";
import { Easing } from 'react-native-reanimated';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';



const Cinetpays = () => {

  const [infoUser, setinfoUser] = useState({}); 

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
        <div style="height: 100px; align-items: center; justify-content:center; display: flex; background-color: tomato;">
            <h1 style="font-weight: bold; color: green; text-align: center;">LOYAL</h1>
        </div>
        <div style=" height: 100px; background-color: red; display: flex;">
            <img src="./smart_connect.png" alt="Image" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style=" height: 100px; background-color: blue;">
            <img src="./images.png" alt="Image" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
    </div>
    <div style="height: 40px;"></div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ;">
        <p style="font-weight: bold; margin: 0;">Adresse: <span style="font-weight: normal;">Angré nouveau chu</span></p>
    </div>
    
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Contact: <span style="font-weight: normal;">0845678é</span></p>
    </div>
    <div style="height: 50px;"></div>
    <p style="font-weight: bold; text-align: center; font-size: 30px; ;">ATTESTATION D'ADMISSION</p>
    <div style="height: 30px;"></div>
    <p style="font-weight: bold; font-size: 20px;">Offre : Olgane</p>
  <p> <span>L'entreprise Loyal vous a contacté Mr(Mme) Yanno Tyan’o pour un poste au sein de son entreprise pour 
    effectuer un travail vu votre disponibilité.Merci de contacter l'entreprise pour plus de détail.</span></p>
    <div style="height: 20px;"></div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Honoraire: <span style="font-weight: normal;">15000FCFA</span></p>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Contact du gérant: <span style="font-weight: normal;">08125403</span></p>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Lieu: <span style="font-weight: normal;">Abobo derrière rails</span></p>
    </div>
    <div style="height: 50px;"></div>
    <p style="font-weight: bold; font-size: 20px; text-align: right;">Fait à abidjan le 01/01/2021</p>
    
    
</div>
</body>
</html>

`;
const [pdfUri, setPdfUri] = useState(null);
const [modalVisible, setModalVisible] = useState(false);

// const print = async () => {
//   // On iOS/android prints the given html. On web prints the HTML from the current page.
//   await Print.printAsync({
//     html,
//     printerUrl: selectedPrinter?.url, // iOS only
//   });
// };


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

Alert.alert('Téléchargement réussi', `Le PDF a été téléchargé ici : ${fileUri}`);

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

const downloadPDF = async () => {
    try {

    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors du téléchargement du PDF.');
    }
  };



  
  // const payement = async ( ) => {
  //   var data = JSON.stringify({
  //     apikey: "29323203565f8d1235633c4.08272143",
  //     site_id: "5869904",
  //    "transaction_id":  Math.floor(Math.random() * 100000000).toString(), //
  //     "amount": 100,
  //     "currency": "XOF",
  //     "alternative_currency": "",
  //     "description": " TEST INTEGRATION ",
  //     "customer_id": "172",
  //     "customer_name": "KOUADIO",
  //     "customer_surname": "Francisse",
  //     "customer_email": "harrissylver@gmail.com",
  //     "customer_phone_number": "+225004315545",
  //     "customer_address": "Antananarivo",
  //     "customer_city": "Antananarivo",
  //     "customer_country": "CM",
  //     "customer_state": "CM",
  //     "customer_zip_code": "065100",
  //     "notify_url": "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
  //     "return_url": "https://webhook.site/d1dbbb89-52c7-49af-a689-b3c412df820d",
  //     "channels": "ALL",
  //     "metadata": "user1",
  //     "lang": "FR",
  //     "invoice_data": {
  //       "Donnee1": "",
  //       "Donnee2": "",
  //       "Donnee3": ""
  //     }
  //   });

  //   var config = {
  //     method: "post",
  //     url: "https://api-checkout.cinetpay.com/v2/payment",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   await axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //       console.log(response.data.data.payment_url);
  //       Linking.openURL(response.data.data.payment_url);

  //       if (response.code == 201) {
  //         Linking.openURL(response.data.data.payment_url);
  //         Linking.openURL(response.data.data.payment_url);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("error", error);
  //     });
  // };
  // const payement2 = async () => {
  //  try {
    
  //   const token = "1983|3vVzjfmup1izvZGZ9fVORnI72vHNqJDLfIOVAKuJ";
  //   if (token) {
  //     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   }
  //   console.log(token);
  //   const res = await axios.post("cintepay/paiement", {
  //     abonement_id: 3,
  //     channels: "Moov",
  //   });
  //   console.log(res.status);
  //   if (res.status==201||res.status==200) {
  //       console.log(res.data);
  //       payement(res.data.data.transaction_id, res.data.data.montant);
        
  //   }
  
    
  //  } catch (error) {
  //   console.log(error);
    
  //  }
  // };

  // const  createPDF= async()=> {
  //   let options = {
  //     html: '<h1>PDF TEST</h1>',
  //     fileName: 'test',
  //     directory: 'Documents',
  //   };

  //   let file = await RNHTMLtoPDF.convert(options)
  //  console.log(file.filePath);
  //   alert(file.filePath);
  // }

  return (
    <View style={styles.container}>
      <Button title="Télécharger et prévisualiser PDF" onPress={printToFileAndShare} />
      
      {pdfUri && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContent}>
            <Pdf
              source={{ uri: pdfUri, cache: true }}
              style={styles.pdf}
              onError={(error) => {
                console.error(error);
                Alert.alert('Erreur', 'Erreur lors du chargement du PDF');
              }}
            />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      )}
    </View>

  );
};

export default Cinetpays;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});
