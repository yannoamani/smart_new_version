import { FlatList,useWindowDimensions,SafeAreaView, StyleSheet,View, Text,Image, ScrollView, Pressable, Modal, TextInput, Alert } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import HTML from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { displayDate } from "../Utils";
import Loader from '../components/loader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import translate from "translate";
import { useSelector } from 'react-redux';
translate.engine = "deepl"; 
translate.key ="98c4da1d-6d65-4402-9c30-510b68d6a3fa:fx";



export default function Appliance({route}) {
  const lang = useSelector((state) => state.translate.lang);
     const { width } = useWindowDimensions();
     const [policeBold, setPolices] = useState("Poppins_700Bold");
     const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
     const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");
    const { id } = route.params;
    const {detailsOffres}=route.params
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("black");
    const [color2, setColor2] = useState("black");
    const [color3, setColor3] = useState("black");
    const [color4, setColor4] = useState("black");
    const [color5, setColor5] = useState("black");
    const [userinfo, setUseinfo] = useState();
    const [note, setNote] = useState();
    const [comment, setComment] = useState();
    const [desc, setDesc] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const [TextTranslation, setTextTransaction] = useState({
        Accepter:lang=='fr'?"Accepter":"Accept",
        Refuser:lang=='fr'?"Refuser":"Refuse",
        Download:lang=='fr'?"Telecharger votre attestation ici":"Download your attestation here",
        description:lang=='fr'?"Description de l'offre":"Offer description",
        Comment:lang=='fr'?"Commenter l'offre":"Comment the offer",
        EnAttente:lang=='fr'?"En attente":"Waiting",
        Appreciation:lang=='fr'?"Quelle est votre appréciation pour cette offre ?":"What is your appreciation for this offer ?",
        Envoyer:lang=='fr'?"Envoyer":"Send",
        EnterComment:lang=='fr'?"Entrez votre commentaire":"Enter your comment",
        Personne:lang=="fr"?"Entrez votre commentaire":"Enter your comment",
    });
    const Translation=async()=>{
      

        // const accepter=await translate("Accepter", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const refuser=await translate("Refuser", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const download=await translate("Telecharger votre attestation ici", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const description=await translate("Description de l'offre", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const comment=await translate("Commenter l'offre", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const enAttente= await translate("En attente", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const appreciation= await translate("Quelle est votre appréciation pour cette offre ?", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const envoyer=await translate("Envoyer", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const enterComment=await translate("Entrez votre commentaire", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
        // const personne=await translate("Personnes(s)", { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });

        // setTextTransaction({
        //     Accepter:accepter,
        //     Refuser:refuser,
        //     Download:download,
        //     description:description,
        //     Comment:comment,
        //     EnAttente:enAttente,
        //     Appreciation:appreciation,
        //     Envoyer:envoyer,
        //     EnterComment:enterComment,
        //     Personne:personne

        // })
    }

    
    const getOffer = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const offer = await axios.get('detail_offre/'+ id)
            //console.log("offer",offer.data.data.offre.description);
            console.log("appliance", offer.data.data);
            setData(offer.data.data);
            if (offer.data.data.description[0] === '<') {
                //console.log("."+offer.data.data.description.replace(/<[^>]*>/g, ' ').toUpperCase().trim()+".");
                setDesc(offer.data.data.description.replace(/<[^>]*>/g, ' ').trim().toUpperCase().split('  '))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const rateComp = async () => {
        try {
            setLoading(true)
            const token = await AsyncStorage.getItem('token')
            const user = JSON.parse(await AsyncStorage.getItem('user'))
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const payload = {
                "offre_id": id,
                "student_id": user.id,
                "notes": note,
                "avis": comment
            }
            console.log(payload);
            const offer = await axios.post('rate_entreprise', payload)
        setModalVisible(!isModalVisible)
           
            
            Alert.alert("Info", offer.data.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            console.log("offer", offer.data);
            
        } catch (error) {
            Alert.alert("Echec", error.response.data.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            console.log(error);
        }
        setLoading(false)
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
        <div style="height: 100px; align-items: center; justify-content:center; display: flex; ">
            <h1 style="font-weight: bold; color: green; text-align: center;">${detailsOffres.entreprise.nom.toUpperCase()}</h1>
        </div>
        <div style=" height: 100px; width: 100px;  display: flex;">
            <img src="https://i.postimg.cc/pXGNKVF4/Whats-App-Image-2024-08-12-11-07-09-dfada05d.jpg" alt="Image" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <div style=" height: 100px; width: 100px; ">
            <img src="https://lce-ci.com/assets/img/l.png" alt="Image" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
    </div>
    <div style="height: 40px;"></div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ;">
    <p style="font-weight: bold; margin: 0;">Adresse: <span style="font-weight: normal;">${detailsOffres.entreprise.ville}</span></p>
    </div>
    
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Contact: <span style="font-weight: normal;">${detailsOffres.entreprise.contact}</span></p>
</div>
    <div style="height: 50px;"></div>
    <p style="font-weight: bold; text-align: center; font-size: 30px; ;">ATTESTATION D'ADMISSION</p>
    <div style="height: 30px;"></div>
    <p style="font-weight: bold; font-size: 20px;">Offre :${detailsOffres.nom_offre}</p>
  <p> <span>L'entreprise ${detailsOffres.entreprise.nom} vous a acceptée Mr(Mme) ${userinfo},  au sein de son entreprise pour 
    effectuer un travail dans la categorie ${detailsOffres.categorie.categorie} vu votre disponibilité. Merci de contacter l'entreprise pour plus de détail.</span></p>
    <div style="height: 20px;"></div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Honoraire: <span style="font-weight: normal;">${detailsOffres.salaire==null?null:detailsOffres.salaire+'FCFA'}</span></p>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Contact du gérant: <span style="font-weight: normal;">08125403</span></p>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1; align-items: center; ">
        <p style="font-weight: bold; margin: 1;" >Lieu: <span style="font-weight: normal;">${detailsOffres.lieu}</span></p>
    </div>
    <div style="height: 50px;"></div>
    <p style="font-weight: bold; font-size: 20px; text-align: right;">Fait à abidjan le ${new Date().toLocaleDateString()}</p>
    
    
</div>
</body>
</html>

`;
const printToFileAndShare = async () => {

    try {
      const { uri } = await Print.printToFileAsync({ html });
  

  const fileUri = `${FileSystem.documentDirectory}mon_document.pdf`;
  
 
  await FileSystem.moveAsync({
    from: uri,
    to: fileUri,
  });
const lang= await AsyncStorage.getItem('lang')||'fr'

  const reponseTexte="Le fichier pdf a été bien télécharger avec succès"
  const title= "Téléchargement réussi"
const TexteTraduit= await translate(reponseTexte, { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
const TitleTraduit= await translate(reponseTexte, { from: 'fr', to: lang === 'en' ? 'en' : 'fr' });
  
  Alert.alert(TitleTraduit, TexteTraduit + fileUri);
  
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
        getOffer()
        getuser()
        Translation();
        console.log(detailsOffres)

        return () => {
          
        }

    }, [lang]);

    return (
        <View style={{flex:1, padding:10}}>
            <ScrollView  style={{flex:1}}
           
            
            >
                {
                    <View  style={{flex:1}}>
                   <View style={{height:60, width:60, alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                   <Image source={require('../assets/emploijeune.png')} style={{height:'100%', width:'100%'}}></Image>
                   </View>
                   <View height={15}></View>
                   <Text style={[Monstyles.Title,{fontFamily:policeBold}]}>{detailsOffres.nom_offre.toUpperCase()}</Text>
                   <View style={{height:10}}></View>
                   <Text style={[Monstyles.souTitre,{fontFamily:policeRegular}]}>{detailsOffres.entreprise.nom}</Text>
                   <View height={15}></View>
                   <View style={Monstyles.container}>
       
   
      
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "location-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
           
              
   <Text  style={[Monstyles.info,{fontFamily:policeRegular}]}>{detailsOffres.lieu}</Text>
   </View>
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "mail-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
           
              
   <Text style={[Monstyles.info,{fontFamily:policeRegular}]}>{detailsOffres.entreprise.email}</Text>
   </View>
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "call-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text style={[Monstyles.info,{fontFamily:policeRegular}]}>{detailsOffres.entreprise.contact}</Text>
   </View>
   <View style={{height:15}}></View>
      {
        detailsOffres.salaire==null?null:  <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "cash"}
              color={'gray'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text   style={[Monstyles.info,{fontFamily:policeRegular}]}>{detailsOffres.salaire} FCFA </Text>
   </View>
      }
        <View style={{height:15}}></View>
       
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={ "person-outline"}
              color={'black'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={[Monstyles.info,{fontFamily:policeRegular}]}>{detailsOffres.nbre_person} {TextTranslation.Personne} </Text>
   </View>
   <View style={{height:15}}></View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
   <Ionicons
              name={detailsOffres.pivot.recruit==1?"checkmark-circle-outline":(detailsOffres.pivot.recruit==2)?"close-circle": "hourglass"}
              color={detailsOffres.pivot.recruit==1?'green':detailsOffres.pivot.recruit==2?'red': 'gray'}
              size={20 } />
              <View style={{width:10}}></View>
              
   <Text  style={[Monstyles.info,{fontFamily:policeRegular} ]}> {detailsOffres.pivot.recruit==0?TextTranslation.EnAttente:detailsOffres.pivot.recruit==2?TextTranslation.Refuser: TextTranslation.Accepter} </Text>
   </View>
 
   
        
      
     

        </View>
        <View style={{height:10}}></View>
      
         {
            detailsOffres.pivot.recruit==1? 
          <Pressable  onPress={printToFileAndShare}>
          <View style={{padding:16, color:"black",borderWidth:1,  borderRadius:10,flexDirection:'row', alignItems:'center', }}>
            <Ionicons name="download-outline" size={25} color="green"/>
            <Text style={{fontFamily:policeRegular, fontSize:15, fontWeight:'500'}}> {TextTranslation.Download}</Text>

 {/* <Text style={{fontSize:20, fontWeight:'bold', padding:10, backgroundColor:'red' , color:'white'}} onPress={printToFileAndShare}>{TextTranslation.Download}</Text>:null */}
          

            </View>
          </Pressable>: null
             
         }

        <View style={{height:10}}></View>
                  
                  
                   <View style={{height:20}}></View>
                   <Text style={{fontSize:20,  fontFamily:policeRegular}}>{TextTranslation.description}</Text>
                   <View style={{height:10}}></View>
                   <RenderHtml

       contentWidth={width}
     
      source={{ html: detailsOffres.description }}
    />






                  
                  

                
                     
                     
                        <Modal 
                            visible={isModalVisible}
                            animationType='slide'
                        >
                            <View style={Monstyles.header}>
                                <Ionicons name="arrow-back-outline" onPress={() => setModalVisible(false)} size={30} color="white" style={Monstyles.back}></Ionicons>
                                <Text style={[Monstyles.headerText,{fontFamily:policeBold}]}>{TextTranslation.Comment}</Text>
                            </View>
                           
                            <View style={{flex:1,padding:10,alignItems:'center',justifyContent:'center'}}>
                             
                                <Text style={[Monstyles.titleReset, {fontFamily:policeRegular}]}>
                                   {TextTranslation.Appreciation} 
                                </Text>
                                <View style={{height:15}}></View>
                                <AirbnbRating
                               

                                showRating={false}
                                ratingContainerStyle={{alignItems:'center'}}
                                onFinishRating={(value) => setNote(value)}
  count={5}
  reviews={["Terrible", "Mauvais", "Bien", "très bien", "Excellent", ]}
  defaultRating={11}
  size={40}
/>
                                <View style={{height:10}}></View>
                                <Loader loading={loading} />
                                <View style={{
                                    flexDirection:"row",
                                    alignItems: "center", // Center the stars vertically
                                    marginBottom: 10,
                                }}>
                                   
                                </View>
                                
                                <TextInput
                                    placeholder={TextTranslation.EnterComment}                                    value={comment}
                                    placeholderTextColor={'grey'}
                                    onChangeText={text => setComment(text)}
                                    style={Monstyles.inputCustom}
                                    multiline={true}
                                />
                                {/* <Loader loading={loading} /> */}
                                <View style={{height:40}}></View>
                                <Pressable 
                                    onPress={rateComp} 
                                    style={Monstyles.button}
                                    
                                >
                                
                                   <Text style={{textAlign:'center',fontSize:20,color:'white'}}>
                                  {TextTranslation.Envoyer}
                                    </Text>
                                  
                                </Pressable>
                                <View style={{height:20}}></View>   
                               
                            </View>
                        
                        </Modal>
                        
                        {/* && data.offre_student.avis == null */}
                        {
                            (detailsOffres.pivot.recruit==1 && new Date()>  new Date(detailsOffres.job_fin) ) ? 
                           <Pressable  style={Monstyles.button} onPress={async () => {
                                try {
                                    setModalVisible(!isModalVisible)
                                    console.log(data)
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>
                                <Text style={[Monstyles.textbutton,{fontFamily:policeRegular}]}>
                                  {TextTranslation.Comment}
                                </Text>
                            </Pressable> : <></>
                        }
                    </View>
               }
            </ScrollView>
            </View>
    )
}


const Monstyles = StyleSheet.create({
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
        fontSize: 10
      },
      titleDescription:{
        color:'#F38B2B',
        fontWeight:'500',
        fontSize: 24,
        textAlign:'center'
      },
      Title:{
        color:'#F38B2B',
        textAlign:'center',
        fontSize: 24,
        fontWeight:'500',

      },
      souTitre:{
        color:'#000000',
        fontWeight:'300',
        textAlign:'center',
        fontSize:19
      },
      button:{
        backgroundColor: '#F38B2B',
        width: '100%',
        elevation: 5,
        borderRadius: 10,
        
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
        shadowOpacity: 0.5,
        shadowRadius: 4, // Rayon de l'ombre
       
        elevation: 10, 
       
            
       
    },
    textbutton:{
        color:'#FFFFFF',
        fontSize: 20,
    },

header:{
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F38B2B',
    position:'relative',
    
  },
  back:{
    position:'absolute',
    left:10,
   bottom:20
  },
  titleReset:{
    fontSize: 17,
    textAlign:'center'
  
  },
  headerText:{
position:'absolute',
bottom:10,
fontWeight:'700',
fontSize:20
    
    
  },
  inputCustom:{
     alignItems: "flex-start", 
  
    borderColor:'#F38B2B',
    borderWidth:1,
    borderRadius:10,
    borderLeftColor: '#F38B2B',
    borderRightColor: '#1A9E47',
   //  borderBlockEndColor: '#1A9E47',
   //  borderBlockStartColor: '#F38B2B',
    borderRightColor: '#1A9E47',
    borderLeftColor: '#1A9E47',
    paddingLeft:20,
    padding:10,
    height:185,
    width: '100%',
    
    },
})

