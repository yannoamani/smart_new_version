import { FlatList, View, SafeAreaView,Image, Text, ScrollView,StyleSheet, Alert } from "react-native";
import styles from "../styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { displayDate } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";


export default function Profile() {
  const [data, setData] = useState();
  const [skills, setSkills] = useState(null);
  const [exps, setExps] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [myabonnement, setMyabonnement] = useState('Attente');
  const getUser = async () => {
    try {
      const temp = await AsyncStorage.getItem("user");
      setData(JSON.parse(temp));
      setRefreshing(false);
      console.log("je sui", temp);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };
  const getSkills = async () => {
    try {
      const skills = await axios.get("getCompetenceByStudents");
      if (skills.data.data.competences.length > 0) {
        setSkills(skills.data.data.competences);
      }
      setRefreshing(false);
      console.log( "skills",skills.data.data.competences);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };
  const getAbonnement = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
      const abonnement = await axios.get("seeMyAbonnement");
    //  console.log(abonnement.data[0]);
      const data=abonnement.data.data;
      if (data.length > 0) {
        setMyabonnement(abonnement.data.data[0]['abonement']['libelle']);
        console.log(data);
        
      }
     else{
        setMyabonnement("AUCUN ABONNEMENT");
     }
      setRefreshing(false);
       console.log( "Mes abonement",abonnement.data.data);
    } catch (error) {
      const token = await AsyncStorage.getItem('token')
      console.log('Erreur abonnement',error, token);
      setRefreshing(false);
    }
  };
  const getExps = async () => {
    try {
      const exps = await axios.get("GetMyExperiences");
      console.log("exps", exps);
      if (exps.data.data.length > 0) {
        setExps(exps.data.data);
      }
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const fetchData = () => {
    setRefreshing(true);
    getUser();
    getExps();
    getSkills();
    getAbonnement();
  };

  useEffect(() => {
    // Fetch offers when the component mounts
    fetchData();

    // Set up an interval to fetch offers every 1 minute
    const intervalId = setInterval(fetchData, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <View style={{flex:1 , backgroundColor: "#F1F2F4"}}>
      <View style={style.header}>
       <SafeAreaView>
        <Text style={style.title}>Profil</Text>
        <View style={{height:10}}></View>
       <View style={style.row}>
       <View style={style.circle}>
          <Image source={require("../assets/avatar.png")} style={style.image}></Image>
        </View>
      <View>
        
      <Text style={style.name}>{ data ? data.prenoms + " " + data.nom : " " }</Text>
      <View height={10}></View>
     <ScrollView horizontal>
     <View  style={{flexDirection:'row',}}>
        { skills?
           skills.map((skill, index) => (
            <View style={{flexShrink:1}} key={index}>
              <View  style={style.competence}>
             <Text style={{ color: "white", }} > {skill.competence}</Text>
             </View>
            </View>
            
               
           )):
           <Text>Pas de competence</Text>
        }
      </View>
     </ScrollView>
      
      {/* {skills ? 
                        <Text numberOfLines={3} ellipsizeMode="tail" style={{ flexGrow:1, flex:1, textAlign: 'center', alignSelf:"center", alignItems: 'center',justifyContent: 'center', }}>
                            {
                            skills.map((skill, index) => (
                             <View style={{flexWrap:'wrap'}}>
                               <View key={index} style={style.competence}>
                              <Text style={{ color: "white"}} > {skill.competence}</Text>
                              </View>
                             </View>
                             
                                
                            ))
                            }
                        </Text>                      
                        : (
                        <Text style={{ 
                                textAlign: 'center',
                                color:'white'
                                // fontSize: 18,
                            }}
                        >
                          Auncune competence
                        </Text>
                    )} */}

      </View>
       </View>
       </SafeAreaView>
      </View>
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        {data ? (
          <View>
            
        
            {/* <View height={10}></View> */}

            {/* {skills ? 
                        <Text numberOfLines={3} ellipsizeMode="tail" style={{ textAlign: 'center', alignSelf:"center", alignItems: 'center',justifyContent: 'center', }}>
                          
                            {
                            skills.map((skill, index) => (
                              <View key={index} style={{ backgroundColor: "#00bfff",padding:4, borderRadius: 5, margin: 5 }}>
                              <Text style={{ color: "white"}} > {skill.competence}</Text>
                              </View>
                             
                                
                            ))
                            }
                        </Text>                      
                        : (
                        <Text style={{ 
                                textAlign: 'center',
                                // fontSize: 18,
                            }}
                        >
                            Pas de competence
                        </Text>
                    )} */}
            {/* <Text style={{
                        borderBottomWidth: 1,
                        // paddingHorizontal: '20%',
                        marginBottom: '2%',
                        marginTop: '2%',
                        color: "#87CEEB",
                        fontWeight: 'bold'
                    }}>
                        * Informations personnelles
                    </Text> */}
            <View style={{ height: 20 }}></View>
           <View>
           <View
              style={style.cardInfo}
            >
             {/* email */}
              <View
                style={style.cardItem} >
                {/* Leading */}
              <View style={style.leading}>
                <Ionicons name="mail-outline" size={16}></Ionicons>
                <Text style={style.libelle}>Email</Text>
              </View>
              {/* Trailling */}
              <View style={style.trailing}>
                <Text style={style.items}>{data.email}</Text>
                <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
              </View>
              
            
            
              
              </View>
              <View style={style.line}></View>
                {/*Diplôme */}
              <View
                style={style.cardItem} >
                {/* Leading */}
              <View style={style.leading}>
                <Ionicons name="school-outline" size={16}></Ionicons>
                <Text style={style.libelle}>Diplôme</Text>
              </View>
              {/* Trailling */}
              <View style={style.trailing}>
                <Text style={style.items}>{data.diplome}</Text>
                <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
              </View>
              
            
            
              
              </View>
              <View style={style.line}></View>
                {/*Diplôme */}
              <View
                style={style.cardItem} >
                {/* Leading */}
              <View style={style.leading}>
                <Ionicons name="home-outline" size={16}></Ionicons>
                <Text style={style.libelle}>Habitation</Text>
              </View>
              {/* Trailling */}
              <View style={style.trailing}>
                <Text style={style.items}>{data.commune}</Text>
                <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
              </View>
               </View>
              <View style={style.line}></View>
             
                {/*Numero */}
              <View
                style={style.cardItem} >
                {/* Leading */}
              <View style={style.leading}>
                <Ionicons name="call-outline" size={16}></Ionicons>
                <Text style={style.libelle}>Numero de téléphone</Text>
              </View>
              {/* Trailling */}
              <View style={style.trailing}>
                <Text style={style.items}>{data.phone}</Text>
                <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
              </View>
               </View>
              <View style={style.line}></View>
                {/*Abonnement */}
              <View
                style={style.cardItem} >
                {/* Leading */}
              <View style={style.leading}>
                <Ionicons name="bookmark-outline" size={16}></Ionicons>
                <Text style={style.libelle}>Abonnement</Text>
              </View>
              {/* Trailling */}
              <View style={style.trailing}>
                <Text style={style.items}>{myabonnement}</Text>
                <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
              </View>
               </View>
            
             
              
              
            </View>
          
           </View>
            <View style={{ height: 15 }}></View>
           
            <Text
              style={style.experience}
            >
              MES EXPERIENCES
            </Text>
            <View style={{ height: 18 }}></View>
            <ScrollView
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "transparent",
                padding: 10,
              }}
            >
              {exps ? (
                exps.map((exp, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      navigation.navigate("EditExp", { expR: exp });
                    }}
                    style={{
                      padding: 10,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      marginBottom: "2%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        
                        fontWeight: "500",
                        color:'#F38B2B'

                      }}
                    >
                      {exp.poste} -{" "}
                      {exp.entreprise} {"\n"}
                   
                    </Text>
                    <Text style={{ fontSize: 11 , color:'black', fontWeight:'500'}}>  Du{" "}
                      {
                        new Date(exp.dateDebut)
                          .toLocaleString("en-GB")
                          .split(",")[0]
                      }{" "}
                      au{" "}
                      {
                        new Date(exp.dateFin)
                          .toLocaleString("en-GB")
                          .split(",")[0]
                      }</Text>
                    <Ionicons
                      onPress={() => {
                        Alert.alert(
                          "?",
                          "Voulez-vous supprimer cette expérience ?",
                          [
                            {
                              text: "OUI",
                              onPress: async () => {
                                try {
                                  const del = await axios.delete(
                                    "deleteMyExperience/" + exp.id
                                  );
                                  fetchData();
                                } catch (error) {
                                  Alert.alert(
                                    "Echec",
                                    error.message,
                                    [
                                      {
                                        text: "OK",
                                        onPress: async () => console.log("OK"),
                                      },
                                    ],
                                    { cancelable: true }
                                  );
                                }
                              },
                            },
                            {
                              text: "NON",
                              onPress: async () => console.log("NON"),
                            },
                          ],
                          { cancelable: true }
                        );
                      }}
                      style={{
                        position: "absolute",
                        right: "2%",
                        top: "10%",
                      }}
                      name="trash-outline"
                      size={20}
                      color="red"
                    />
                  </Pressable>
                ))
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  Aucune experience
                </Text>
              )}
            </ScrollView>
          </View>
        ) : (
          <Text style={styles.titleText}>Loading...</Text>
        )}
       
      {/* Crde  pour les différents options */}

         <View style={{ height: 15 }}></View>
        <Pressable
          onPress={async () => {
             navigation.navigate("acceuil_Abonnement");
            // getAbonnement();
          }}
        >
           {/* Faire un abonnemnt  */}
          <View style={style.cardOption}>
          <View style={style.leadingOption}>
            <Ionicons name="notifications" size={20} color="#FFD233" />
            
            <Text style={style.libelleOption}> Abonnement </Text>
            </View>
              
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
       
        </Pressable>

         <View style={{ height: 20 }}></View>
          {/* Mes plages horairs */}
        <Pressable
          onPress={async () => {
            navigation.navigate("Scheds");
          }}
        >
          <View
            style={style.cardOption}
          >
         
           
               <View style={style.leadingOption}>
               <Ionicons name="alarm-outline" size={20} color="black" />
            
            <Text
              style={style.libelleOption}
            >
              Mes plages horaires
            </Text>
               </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
         
        </Pressable>
      
        <View style={{height:20}}></View>

        <Pressable
         onPress={async () => {
                    navigation.navigate('Editer')
                }}
        >
          <View
            style={style.cardOption}
          >
           
              <View style={style.leadingOption}>
                
              <Ionicons name="flask-outline" size={20} color="black" />
              
              <Text
                style={style.libelleOption}
              >
               Ajouter une experience
              </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
         
        </Pressable>
       <View style={{height:20}}></View>
       
        <Pressable
        onPress={async () => {
                    navigation.navigate('Skills')
                }}
        >
          <View
            style={style.cardOption}
          >
            
            
             <View style={style.leadingOption}>
             <Ionicons name="library-outline" size={20} color="black" />
             
             <Text
               style={style.libelleOption}
             >
              Ajouter une competence
             </Text>
             </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
  
        </Pressable>
        <View style={{height:20}}></View>
        <Pressable
        onPress={async () => {
                    Alert.alert('Se déconnecter', 'Voulez-vous vous déconnecter', [
                        {text: 'OUI', onPress: async () => {
                            try {
                                axios.get('auth_logout')
                                await AsyncStorage.multiRemove(['user', 'token'])
                                navigation.navigate('Login')
                            } catch (error) {
                                console.log(error);
                            }
                        }}, {text: 'NON'}
                    ], {cancelable: true})
                }}
        >
          <View
            style={style.cardOption}
          >
           <View style={style.leadingOption}>
            
           <Ionicons name="log-in-outline" size={20} color="red" />
             
             <Text
             style={style.libelleOption}
             >
             Deconnexion
             </Text>
           </View>
             
            
          </View>
        </Pressable>
       

        {/* <View style={styles.credits}> */}
        {/* <Pressable style={{
                borderTopColor: 'black',
                borderTopWidth: 1,
                paddingVertical: 5,
            }}>

            </Pressable>
            <Text onPress={async () => {
                    navigation.navigate('Scheds')
                }} style={styles.basicText}>
                    <Ionicons name="calendar-outline" size={20} />
                    &nbsp;Mes Plages Horaires
                </Text>
                <Text onPress={async () => {
                    navigation.navigate('Editer')
                }} style={styles.basicText}>
                    <Ionicons name="flask-outline" size={22} />
                    &nbsp;Ajouter expérience
                </Text>
                <Text onPress={async () => {
                    navigation.navigate('Skills')
                }} style={styles.basicText}>
                    <Ionicons name="library-outline" size={22} />
                    &nbsp;Ajouter compétence
                </Text> */}
        {/* <Text onPress={async () => {
                    Alert.alert('Se déconnecter', 'Voulez-vous vous déconnecter', [
                        {text: 'OUI', onPress: async () => {
                            try {
                                axios.get('auth_logout')
                                await AsyncStorage.multiRemove(['user', 'token'])
                                navigation.navigate('Auth')
                            } catch (error) {
                                console.log(error);
                            }
                        }}, {text: 'NON'}
                    ], {cancelable: true})
                }} style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    width: '100%',
                    textAlign: 'center',
                    color: 'red'
                  }}>
                    <Ionicons name="log-out-outline" size={20} />
                    Se déconnecter
                </Text> */}
        {/* </View> */}
      </ScrollView>
    </View>
    </View>
  );
}

const style=StyleSheet.create({
  header: {
    height:'20%',
    width: '100%',
    backgroundColor:'#F38B2B',
    flexDirection:'column',
    padding:16
    
  },
  title:{
    color:'black',
    fontSize:15,
    fontWeight:'700'

  },
  circle:{
    height:51,
    width:49,
    backgroundColor:'white',
    borderRadius:50,
    padding:5,
    marginRight:15
   
    
  },
  image:{
    height:'100%',
    width:'100%',
    resizeMode:'cover',
    borderRadius:50
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
   
    marginTop:10
  },
  name:{
    fontWeight:'700',
    fontSize:14
  },
  competence:{
    paddingHorizontal:5,
    paddingVertical:2,
    flexShrink:1,
    
    borderRadius:10,
    borderWidth:1,
    borderColor:'white',
    marginRight:5

  }, 
  textCompetence:{
    fontSize:10,
    fontWeight:'500',
    color:'white'
  },
  cardInfo:{
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.2,
    shadowRadius: 2, 
   
    elevation: 10, 
  
   

  },
  cardItem:{
 flexDirection:'row',
 alignItems:'center',
 justifyContent:'space-between',
 marginBottom:10
    
   
  },
  leading:{
    flexDirection:'row',
    alignItems:'center',
   
  },
  libelle:{
    fontWeight:'500',
    fontSize:14,
    marginLeft:5

  },
  items:{
    color:'#0000004D',
    marginRight:10
  },
  trailing:{
    flexDirection:'row',
    alignItems:'center',
  },
  line:{
    height:1,
    width:'100%',
    backgroundColor:'#0000004D',
    marginHorizontal:18,
    marginBottom:10
   
  },
  experience:{
    fontWeight:'700',
    fontSize:24

  },
  cardOption:{
    width: "100%",
              backgroundColor: "white",
              height: 44,
              paddingHorizontal: 15,
              borderRadius: 15,
              flexDirection: "row", 
              alignItems: "center",
              justifyContent:'space-between',
              shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
    shadowOpacity: 0.1, // Opacité de l'ombre réduite à 10%
    shadowRadius: 6, // Rayon de l'ombre
    elevation: 4, // Élévation pour Android
              
    
  },
  leadingOption:{
    flexDirection:'row',
    alignItems:'center',
    
  },
  libelleOption:{
    fontSize:13,
    marginLeft:15,
    fontWeight:'700'

  }


})  