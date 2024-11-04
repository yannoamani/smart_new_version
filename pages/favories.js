import { View, Text, StyleSheet,StatusBar,FlatList, SafeAreaView , ScrollView,Image,Pressable} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import translateText from "../pages/store/TranslationUtils"
import { useSelector } from 'react-redux';


export default function Favories() {
  const lang = useSelector((state) => state.translate.lang);
    const navigation = useNavigation();
    const [favories, setFavories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [like, setLike] = useState(true);
    const addfavori=async(id)=>{
        try {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            
          }
          const res = await axios.post("toogleFavoris",{
            'offre_id':id
          });
          console.log(res.data);
          getFavories();
          
        } catch (error) {
          console.log(error);
          
        }
    
      }
      const getData = async (item) => {
        try {
          // setAlready(false);
          const value = await AsyncStorage.getItem("user");
          if (value !== null) {
            // console.log(item);
            const user = JSON.parse(value);
            // setUserId(user.id);
            const getusersId = [];
            const offres = item.offre.students;
    
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
    const getFavories = async () => {
        try {
          const token = await AsyncStorage.getItem('token')
                if (token) {
                    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                }
          const abonnement = await axios.get("listFavoris");
          if (abonnement.status == 200) {
            //  console.log(abonnement.data[0]);
          const data=abonnement.data.data.favoris;
          const Translations= await Promise.all(
            data.map(async (item) => {
              return {
                ...item,
                offre_nom: await translateText(item.offre.nom_offre, lang),
                offre_description: await translateText(item.offre.description, lang),
              };
            })
          )
          
        setFavories(Translations);
       
         
        
         
            // console.log('mes favories',favories, T);
            
      
       
         
            
          }
        
       
        } catch (error) {
          const token = await AsyncStorage.getItem('token')
          console.log('Erreur abonnement',error, token);
          setRefreshing(false);
        }
      };

    useEffect(() => {
        getFavories();
     
    }, []);
    const cardFav = ({ item }) => {
        const time = displayDate(item.created_at);
        return (
          <View style={ mystyle.container}>
            <Pressable
              onPress={() => {
            navigation.navigate("Offer", { id: item.offre.id, already: false , detailsOffres: item.offre});
             
               
              }}
            >
             <View style={mystyle.rate}> 
             <Text style={mystyle.titleText}>{item.offre_nom}</Text>
            {
              like ? <Ionicons name="heart" size={20} color="#F38B2B" onPress={() => {
                
                addfavori(item.offre.id);
              }}></Ionicons>: <Ionicons name="heart-outline" size={20} color="#F38B2B" onPress={() => setLike(!like)}></Ionicons>
            }
             </View>
              <Text style={mystyle.lieu}>{item.offre.lieu}</Text>
              
              <Text style={mystyle.entreprise}>{item.offre.entreprise.nom}</Text>
              <View style={mystyle.rowinfo}>
              <View style={mystyle.contimage}>
                <Image source={require("../assets/emploijeune.png")} style={mystyle.image}></Image>
              </View>
              <Text  numberOfLines={3} ellipsizeMode="tail" style={mystyle.description}> {item.offre_description.toUpperCase().replace(/<[^>]*>|&nbsp;/g, ' ').trim().toUpperCase().split('  ')}</Text>
    
              </View>
            
            </Pressable>
            
        
          </View>
        );
      };
    
    return(
        <SafeAreaView style={{flex: 1 , backgroundColor:"#F1F2F4"}} >
            <View style={mystyle.Parent}> 
          
            <StatusBar animated={true} backgroundColor="#61dafb" />
           
            
            <FlatList 
            keyExtractor={item => item.id}
            data={ favories.filter((item) =>  new Date() <new Date(item.offre.fin))}
             renderItem={cardFav}
             onRefresh={getFavories}
             refreshing={refreshing}
             ListEmptyComponent={<View style={mystyle.empty}>
               <Text>Aucune donnée</Text>
             </View>}
            

            />

          

            
        </View>
        </SafeAreaView>
    )
}


const mystyle = StyleSheet.create({
     Parent:{
        flex: 1,
        padding: 10,
     },


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
      
    },
    empty:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center'
    }
  });
  