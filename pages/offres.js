import {
  FlatList,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Alert,
  LogBox,
ActivityIndicator, 
  StyleSheet,
} from "react-native";
import styles from "../styles";
import style1 from "../offerStyle.js";
import offerStyle from "../pages/styles/offerStyle.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate, displayDates, isDateTimeGreaterThanCurrent, isTimeGreaterThanCurrent } from "../Utils";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import style from "../offerStyle.js";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeComponent from "./styles/theme.jsx";
import { useTranslation } from 'react-i18next';
import translate, { Translate } from "translate";
import { useSelector } from 'react-redux';

translate.engine = "deepl"; 
translate.key ="98c4da1d-6d65-4402-9c30-510b68d6a3fa:fx";

export default function List() {
  const lang = useSelector((state) => state.translate.lang);
  const { t } = useTranslation();
  const [texttranslate, setTextTransaction]=useState({
    Bienvenue:lang==="fr"?"Bienvenue":"Welcome",
    Tout: "Tout",
    Nooffres:lang==="fr"?"Pas d'offres disponible":"No offers available",
    OffrsDispo:lang==="fr"?"Les offres disponibles":"Offers available"  
    

  });
 
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [already, setAlready] = useState(false);
  const [userId, setUserId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const token = AsyncStorage.getItem("token");
  const [categorie, Setcategorie] = useState([]);

  const [like, setLike] = useState(false);
  const [policeBold, setPolices] = useState("Poppins_700Bold");
  const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
  const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");
  offersStyle(policeBold, policeRegular);
  
  const Translation=async()=>{
 


   

  
     
      // const bienvenue= await translate("Bienvenue",  { from: 'fr', to: lang  });
      // const tout= await translate("Tout",  { from: 'fr', to: lang});
      // const noOffrs= await translate("Pas d'offres disponible", { from: 'fr', to: lang });
      // const offrsDispo= await translate("Les offres disponibles", { from: 'fr', to: lang });

      
      // setTextTransaction({
      //   Bienvenue:bienvenue,
      //   Tout:tout,
      //   Nooffres:noOffrs,
      //   OffrsDispo:offrsDispo
        
      // })
    
    
  }
  const [select, setSelect] = useState(t('Tout'));



  const getOffers = async () => {
   
    try {
      // data;
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      const value = await AsyncStorage.getItem("user");
      const res = await axios.get("list_offres");
      const data = res.data.data;
      const translateAll= await Promise.all(
        data.map(async (offre) => {
          return{
            ...offre,
            nom_offre: await translate(offre.nom_offre,{from:'fr',to:lang}),
            description: await translate(offre.description,{from:'fr',to:lang}),
            categorie: await translate(offre.categorie.categorie,{from:'fr',to:lang})
          }
        })
      )
      setData(translateAll);
    //  console.log('La liste des offres',res.data.data);
      const favoris = res.data.data.favoris;

      console.log('La liste des offres', translateAll);

      // data.forEach((element) => {
      //   if () {
          
      //   }
      // });
        

      setRefreshing(false);
      if (value !== null) {
        const user = JSON.parse(value);
        setUserId(user.nom + " " + user.prenoms);
      }
      // console.log(res.data.data);
    } catch (error) {
     console.log(error);
      setRefreshing(false);
    }
  };
  const getCategorie = async () => {

    try {
    
    
    
      Setcategorie([{ id: 0, categorie:t('Tout')}]);
      const res = await axios.get("seeCategorie");
      const data = res.data.data;
      console.log("La liste des categorie", data);
         const dataTraduit = await Promise.all(
        data.map(async (element) => {
            const categorieTraduit = await translate(element.categorie, { from: 'fr', to: lang }); // Change 'en' pour la langue cible
            return { ...element, categorie: categorieTraduit }; // Met à jour le champ `categorie` traduit
        })
    );
  
      dataTraduit.forEach((element) => {
        key = element.categorie;
        Setcategorie((oldArray) => [...oldArray, element].sort());
      });
      console.log("La liste des categorie", dataTraduit);
      //  Translation();
      
      // categorie.push(res.data.data);
      // console.log("La liste des categorie", categorie[0]);
    } catch (error) {
      console.log('Erreur categori',error);
    }
  };
  const addfavori = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      const res = await axios.post("toogleFavoris", {
        offre_id: id,
      });
      getOffers();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // la fonction qui te permettra de 

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

// la fonction qui me permettre de liste er mes abonnements
const getAbonnement = async () => {
     
        try {
          const token = await AsyncStorage.getItem('token')
                if (token) {
                    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                }
          const abonnement = await axios.get("seeMyAbonnement");
          console.log(abonnement.data[0]);
          const data=abonnement.data.data;
        
         
             console.log(data);
            
            data.forEach((element) => {

              const date = new Date();
              if (element.statut=="ACCEPTED") {
              
                if (!isDateTimeGreaterThanCurrent(element.echeance)) {
                  console.log("Vous avez un abonnement expiré ", )
                  // verifierabonement();
                  
                }else{
                  console.log("Vous n'avez pas d'bonnes abonnement",isDateTimeGreaterThanCurrent(element.echeance) )
                }
                
              }
            })
      
       
      
          //  console.log( "Mes abonement",abonnement.data.data);
        } catch (error) {
          const token = await AsyncStorage.getItem('token')
          console.log('Erreur abonnement',error, token);
      
        }
      };

  const fetchOffers = () => {
    //setRefreshing(true);
    getOffers();
    getCategorie();
    Translation();



    // verifierabonement();
  };

  useEffect(() => {
    // Fetch offers when the component mounts
    fetchOffers();
 
    const interval= setInterval(async () => {
      const abonement = await AsyncStorage.getItem('abonnement');
        // console.log("abonnement",abonement);
   if (abonement) {
    const mabonnement = JSON.parse(abonement);
    // console.log("abonnement",mabonnement);
    
    if (isDateTimeGreaterThanCurrent(mabonnement.echeance)) {
      // console.log("Tu es  dans ma fonction accepter ", abonement);
      verifierabonement();
      clearInterval(interval);
      
    }
    else{
      return ;
        // console.log("abonnement expire");
    }
   }

    
  }, 5000);

  return () => {
        
  }
  }, [lang]);
  const getData = async (item) => {
    try {
      // setAlready(false);
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // console.log(item);
        const user = JSON.parse(value);
        // setUserId(user.id);
        const getusersId = [];
        const offres = item.students;

        // console.log('La liste etudiants',offres.find((element) => element['id'] == user.id));
        // navigation.navigate("Offer", { id: item.id, already: already });

        offres.forEach((offre) => {
          getusersId.push(offre["pivot"]["student_id"]);
        });

        if (getusersId.includes(user.id)) {
          console.log("tu as deja");
          // setAlready(true);
          // Alert.alert("Désolé", "Tu as déja postuler  à cette offre", [{ text: "OK", onPress: () => console.log("OK") }], { cancelable: true });
          navigation.navigate("Offer", {
            id: item.id,
            already: true,
            detailsOffres: item,
          });
        } else {
          navigation.navigate("Offer", {
            id: item.id,
            already: false,
            detailsOffres: item,
          });
        }

        console.log(getusersId);

        //  navigation.navigate("Offer", { id: item.id, already: false });
      }
    } catch (e) {
      console.error("Error reading value", e);
    }
  };

  const renderItem = ({ item }) => {
    const time = displayDate(item.created_at);
    const fav = item.favoris.length === 0 ? false : true;

    return (
      <View style={mystyle.container}>
        <Pressable
          onPress={() => {
            //  navigation.navigate("Offer", { id: item.id, already: item });
            getData(item);
            // console.log(item.favoris)
          }}
        >
          <View style={mystyle.rate}>
            <Text style={[mystyle.titleText, { fontFamily: policeRegular }]}>
              {item.nom_offre.toUpperCase()}
            </Text>
            {fav ? (
              <Ionicons
                name="heart"
                size={20}
                color="#F38B2B"
                onPress={() => {
                  addfavori(item.id);
                }}
              ></Ionicons>
            ) : (
              <Ionicons
                name="heart-outline"
                size={20}
                color="#F38B2B"
                onPress={() => {
                  addfavori(item.id);
                }}
              ></Ionicons>
            )}
          </View>
          <Text style={[mystyle.lieu, { fontFamily: policeRegular, fontWeight: "500", color: "black" }]}>
            {item.lieu}
          </Text>

          <Text style={[mystyle.entreprise, { fontFamily: policeRegular, fontWeight: "300", color: "black" }]}>
            {item.entreprise.nom}
          </Text>
          <View style={mystyle.rowinfo}>
            <View style={mystyle.contimage}>
              <Image
                source={require("../assets/emploijeune.png")}
                style={mystyle.image}
              ></Image>
            </View>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={[
                mystyle.description,
                {
                  fontFamily: policeLight,
                  fontWeight: "300",
                  color: "#000000",
                },
              ]}
            >
              {" "}
              {item.description
                .toUpperCase()
                .replace(/<[^>]*>|&nbsp;/g, " ")
                .trim()
                .toUpperCase()
                .split("  ")}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 15, backgroundColor: "#F1F2F4" }}
    >
      <View style={offerStyle.container}>
        <View
        // style={{
        //     width: '100%',
        //     padding: '0.5%',
        // }}
        >
          {data ? (
            <FlatList
              style={{ width: "100%" }}
              renderItem={renderItem}
              data={
                (select !="Tout"&&select!="All")
                  ? data.filter(
                      (item) =>
                        new Date() < new Date(item.fin) &&
                        item.categorie == select
                    )
                  : data.filter((item) => new Date() < new Date(item.fin))
              }
              keyExtractor={(item) => item.id.toString()}
              onRefresh={()=>{
                getOffers();
                getCategorie();
             
                getAbonnement();
              }}
              refreshing={refreshing}
              ListEmptyComponent={
                <Text style={{ marginTop: 20, textAlign: "center" }}>
                  {texttranslate.Nooffres}
                </Text>
              }
              ListHeaderComponent={
                <View>
                  <View style={mystyle.cardWelcom}>
                    <View>
                      <Text
                        style={[mystyle.welcome, { fontFamily: policeRegular }]}
                      >
                        {texttranslate.Bienvenue}   
                      </Text>
                      <Text
                        style={[mystyle.userId, { fontFamily: policeBold }]}
                      >
                        {userId}
                      </Text>
                    </View>
                    <Ionicons
                      name="heart-outline"
                      size={25}
                      color="#F38B2B"
                      onPress={() => navigation.navigate("favories")}
                    ></Ionicons>
                  </View>
                  <View style={{ height: 10 }}></View>
                  <ScrollView horizontal>
                    <View style={mystyle.categorie}>
                      {
                        categorie.map((item) => (
                        
                        <Pressable
                          onPress={() => {
                            
                            setSelect(item.categorie);
                            console.log(select)
                          }}
                          key={item.categorie}
                        >
                          <View
                            style={[
                              mystyle.containerCategorie,
                              {
                                backgroundColor:
                                  item.categorie == select
                                    ? "#F38B2B"
                                    : "white",
                              },
                            ]}
                          >
                            <Text
                              style={[
                                mystyle.categorieText,
                                {
                                  fontFamily: policeRegular,
                                  color:
                                    item.categorie == select
                                      ? "white"
                                      : "black",
                                },
                              ]}
                            >
                              {item.categorie}
                            </Text>
                          </View>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                  <View style={{ height: 10 }}></View>
                  <Text style={[mystyle.title, { fontFamily: policeBold }]}>
                   {texttranslate.OffrsDispo}
                  </Text>
                </View>
              }
            />
          ) : (
        
        <View style={{height:'100%',justifyContent:'center',alignItems:'center', }}>
        <ActivityIndicator size="large" color="#F38B2B" />

        </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const offersStyle = (policeBold, policeRegular) => {
  return { policeBold, policeRegular };
};

const mystyle = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",

    marginTop: 30,
    shadowColor: "#000", // Couleur de l'ombre
    shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
    shadowOpacity: 0.5,
    shadowRadius: 2, // Rayon de l'ombre
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#F38B2B",
    marginBottom: 7,
    flexShrink: 1,
  },
  lieu: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 7,
  },
  entreprise: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 7,
    
  },
  rowinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contimage: {
    width: 43,
    height: 43,

    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  description: {
    fontSize: 10,
    fontWeight: "300",
    color: "#000000",
    flex: 1,
  },
  welcome: {
    fontSize: 12,
    fontWeight: "300",
    marginBottom: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",

    marginBottom: 5,
  },
  cardWelcom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categorie: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  categorieText: {
    fontSize: 14,
    fontWeight: "300",
    marginRight: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  containerCategorie: {
    padding: 8,
    borderColor: "#F38B2B",
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  rate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    flex: 1,
  },
  heart: {
    marginLeft: 10,
  },
});
