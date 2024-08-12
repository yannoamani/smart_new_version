import {
  FlatList,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Alert,
  LogBox,
  StyleSheet
} from "react-native";
import styles from "../styles";
import style1 from "../offerStyle.js";
import offerStyle from "../pages/styles/offerStyle.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import style from "../offerStyle.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function List() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [already, setAlready] = useState(false);
  const [userId, setUserId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const token = AsyncStorage.getItem("token");
  const [categorie, Setcategorie]=useState([]);
  const [select, setSelect]=useState("Tout");
  const [like, setLike]=useState(false);
  
  const getOffers = async () => {
    try {
      data;
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      const value = await AsyncStorage.getItem("user");
      const res = await axios.get("list_offres");
      setData(res.data.data);
       console.log(res.data.data[0]);
       const favoris=res.data.data.favoris;

      
    
      setRefreshing(false);
      if (value !== null) {
        const user = JSON.parse(value);
        setUserId(user.nom+" "+user.prenoms);

        
      }
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };
  const getCategorie=async()=>{
    
    try {
     Setcategorie([{ 'id': 0,'categorie':'Tout'}]);
      const res = await axios.get("seeCategorie");
      const data=res.data.data;
      data.forEach((element) => {
        key=element.categorie
        Setcategorie((oldArray) => [...oldArray, element].sort());
        
      })
    // categorie.push(res.data.data);
    console.log('La liste des categorie',categorie[0]);
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const addfavori=async(id)=>{
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        
      }
      const res = await axios.post("toogleFavoris",{
        'offre_id':id
      });
      getOffers();
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
      
    }

  }

  const fetchOffers = () => {
    //setRefreshing(true);
    getOffers();
    getCategorie();
  };

  useEffect(() => {
    // Fetch offers when the component mounts
    fetchOffers();

    // Set up an interval to fetch offers every 1 minute
    // const intervalId = setInterval(fetchOffers, 60000);

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);
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
          navigation.navigate("Offer", { id: item.id, already: true , detailsOffres: item});
        } else {
          navigation.navigate("Offer", { id: item.id, already: false , detailsOffres: item});
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
    const fav=item.favoris.length===0 ? false :true

    return (
      <View style={ mystyle.container}>
        <Pressable
          onPress={() => {
            //  navigation.navigate("Offer", { id: item.id, already: item });
              getData(item);
           // console.log(item.favoris)
            
           
          }}
        >
         <View style={mystyle.rate}> 
         <Text style={mystyle.titleText}>{item.nom_offre.toUpperCase()}</Text>
        {
          fav? <Ionicons name="heart" size={20} color="#F38B2B" onPress={() => {
            
            addfavori(item.id);
          }}></Ionicons>: <Ionicons name="heart-outline" size={20} color="#F38B2B"  onPress={() => {
            
            addfavori(item.id);
          }}></Ionicons>
        }
         </View>
          <Text style={mystyle.lieu}>{item.lieu}</Text>
          
          <Text style={mystyle.entreprise}>{item.entreprise.nom}</Text>
          <View style={mystyle.rowinfo}>
          <View style={mystyle.contimage}>
            <Image source={require("../assets/emploijeune.png")} style={mystyle.image}></Image>
          </View>
          <Text  numberOfLines={3} ellipsizeMode="tail" style={mystyle.description}> {item.description.toUpperCase().replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  ')}</Text>

          </View>
        
        </Pressable>
        
    
      </View>
    );
  };

  return (
   <SafeAreaView style={{flex:1, paddingTop: 15, backgroundColor:'#F1F2F4'}}>
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
            data={select!='Tout'? data.filter((item) =>  new Date() <new Date(item.fin) && item.categorie.categorie == select): data.filter((item) =>  new Date() <new Date(item.fin))}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={fetchOffers}
            refreshing={refreshing}
            ListEmptyComponent={
              <Text style={{marginTop: 20, textAlign: "center"}}>Aucune offre</Text>
            }
            ListHeaderComponent={
              <View>
               <View style={mystyle.cardWelcom}>
        <View>
        <Text style={mystyle.welcome}>Bienvenue</Text>
        <Text style={mystyle.welcomeName}>{userId}</Text>
        </View>
         <Ionicons name="heart-outline" size={25} color="#F38B2B" onPress={() => navigation.navigate('favories')}></Ionicons>
               </View>
               <View style={{height:10}}></View>
             <ScrollView horizontal>
             <View style={mystyle.categorie}>
               {
                categorie.map((item)=>(
              
               <Pressable onPress={()=>{setSelect(item.categorie
                
               
               ) }}  key = {item.categorie}>
               <View  style={[mystyle.containerCategorie, {backgroundColor: item.categorie == select ? "#F38B2B" : "white"}]}>
                <Text  style={[mystyle.categorieText, {color: item.categorie == select ? "white" : "black"}]}>{item.categorie}</Text>
                </View>
               </Pressable>
             
                ))
               }
               </View>
             </ScrollView>
             <View style={{height:10}}></View>
             <Text style={mystyle.title}>Liste des offres</Text>
              </View>
              
              }
          />
        ) : (
          <Text style={styles.titleText}>Loading...</Text>
        )}
      </View>
    </View>
   </SafeAreaView>
  );
}

const mystyle = StyleSheet.create({
  container: {
  padding: 15,
  borderRadius: 15,
  backgroundColor: "white",
 
 
 
  marginTop: 30,
  shadowColor: '#000', // Couleur de l'ombre
  shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
  shadowOpacity: 0.5,
  shadowRadius: 2, // Rayon de l'ombre
 


  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#F38B2B",
    marginBottom: 7,
    flexShrink: 1 
  },
  lieu: {
    fontSize: 10,
    fontWeight: "500",
    color: "#000",
    marginBottom: 7,
  },
  entreprise: {
    fontSize: 10,
    fontWeight: "300",
    color: "#000",
    marginBottom: 7,
  },
  rowinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contimage:{
    width: 43,
    height: 43,
   
    marginRight: 10,
   
  },
  image:{
  width: "100%",
  height: "100%",
 resizeMode: "contain"
  },
  description: {
    fontSize: 10,
    fontWeight: "300",
    color: "#000000",
  flex: 1
  },
  welcome:{
    fontSize:13,
    fontWeight:"300",
    marginBottom:5
  },
  name:{
    fontSize:15,
    fontWeight:"700",
    
    marginBottom:5
  },
  cardWelcom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  categorie:{
    flexDirection:'row',
    justifyContent:'center',
   alignItems:'center',
   
  },
  categorieText:{
    fontSize:14,
    fontWeight:'300',
    marginRight:5,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',

    },
  containerCategorie:{
    padding:8,
    borderColor:'#F38B2B' ,
    borderWidth:1,
    borderRadius:15,
    marginRight:10,
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    fontSize:24,
    fontWeight:'700',
    marginTop:10
  },
  rate:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    
   flex:1
   
  },
  heart:{
    marginLeft:10
    
  }
});
