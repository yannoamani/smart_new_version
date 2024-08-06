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
      const abonnement = await axios.get("seeMyAbonnement");
     console.log(abonnement.data)
      const data=abonnement.data.data;
      if (data.length > 0) {
        setMyabonnement("PREMIUM");
        
      }
     else{
        setMyabonnement("AUCUN ABONNEMENT");
     }
      setRefreshing(false);
      // console.log( "skills",abonnement.data.data.competences);
    } catch (error) {
      console.log(error);
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
    <View style={{flex:1}}>
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
      {skills ? 
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
                                // fontSize: 18,
                            }}
                        >
                            Néant
                        </Text>
                    )}

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
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "transparent",
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "black", fontSize: 15 }}>Email </Text>
                <Text style={{ color: "gray", fontSize: 14 }}>
                  {data.email}
                </Text>
              </View>
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  width: "100%",
                  color: "gray",
                  height: 1,
                  backgroundColor: "#dcdcdc",
                }}
              ></View>
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "black", fontSize: 15 }}>Diplôme </Text>
                <Text style={{ color: "gray", fontSize: 14 }}>
                  {data.diplome}
                </Text>
              </View>
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  width: "100%",
                  color: "gray",
                  height: 1,
                  backgroundColor: "#dcdcdc",
                }}
              ></View>
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "black", fontSize: 15 }}>
                  Habitation{" "}
                </Text>
                <Text style={{ color: "gray", fontSize: 14 }}>
                  {data.commune}
                </Text>
              </View>
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  width: "100%",
                  color: "gray",
                  height: 1,
                  backgroundColor: "#dcdcdc",
                }}
              ></View>
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "black", fontSize: 15 }}>
                  Numero de telephone{" "}
                </Text>
                <Text style={{ color: "gray", fontSize: 14 }}>
                  {data.phone}
                </Text>
              </View>
              {/* <View style={{ height: 15 }}></View> */}
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  width: "100%",
                  color: "gray",
                  height: 1,
                  backgroundColor: "#dcdcdc",
                }}
              ></View>
              <View style={{ height: 15 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "black", fontSize: 15 }}>
                 Abonnement 
                </Text>
                <Text style={{ color: "red", fontSize: 14 }}>
                  {myabonnement}
                </Text>
              </View>
            </View>
            <View style={{ height: 15 }}></View>
            {/* <View style={styles.roundedContainer}>
                        <Text style={styles.basicText}>
                            <Ionicons name="ribbon-outline" size={20} color="#87CEEB" /> &nbsp;
                            Diplome : {data.diplome}
                        </Text>
                        <Text style={styles.basicText}>
                            <Ionicons name="home-outline" size={20} color="#87CEEB" /> &nbsp;
                            Habitat : {data.commune}, {data.quartier}
                        </Text>
                        <Text style={styles.basicText}>
                            <Ionicons name="mail-outline" size={20} color="#87CEEB" /> &nbsp;
                            Email : {data.email}
                        </Text>
                        <Text style={styles.basicText}>
                            <Ionicons name="call-outline" size={20} color="#87CEEB" /> &nbsp;
                            Contact : {data.phone}
                        </Text>
                    </View> */}
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 17,
              }}
            >
              * MES EXPERIENCES
            </Text>
            <View style={{ height: 15 }}></View>
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
                        fontSize: 14,
                        marginBottom: "2%",
                      }}
                    >
                      - {exp.poste.toUpperCase()} -{" "}
                      {exp.entreprise.toUpperCase()} {"\n"}
                      Du{" "}
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
                      }
                    </Text>
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
       
       

         <View style={{ height: 15 }}></View>
        <Pressable
          onPress={async () => {
             navigation.navigate("Abonnement");
            // getAbonnement();
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#ffa500",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="notifications" size={30} color="white" />
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "medium",
                  fontSize: 17,
                  marginLeft: 5,
                  flex: 1,
                }}
              >
                Faire mon abonnement
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
          </View>
        </Pressable>
         <View style={{ height: 20 }}></View>
        <Pressable
          onPress={async () => {
            navigation.navigate("Scheds");
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#e6e6fa",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="time-outline" size={30} color="black" />
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "medium",
                  fontSize: 17,
                  marginLeft: 5,
                  flex: 1,
                }}
              >
                Mes plages horaires
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
          </View>
        </Pressable>
      
        <View style={{height:20}}></View>

        <Pressable
         onPress={async () => {
                    navigation.navigate('Editer')
                }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#add8e6",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="flask-outline" size={30} color="black" />
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "medium",
                  fontSize: 17,
                  marginLeft: 5,
                  flex: 1,
                }}
              >
               Ajouter une experience
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
          </View>
        </Pressable>
       <View style={{height:20}}></View>
       
        <Pressable
        onPress={async () => {
                    navigation.navigate('Skills')
                }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#ffa07a",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="library-outline" size={30} color="black" />
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "medium",
                  fontSize: 17,
                  marginLeft: 5,
                  flex: 1,
                }}
              >
               Ajouter une competence
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              ></Ionicons>
            </View>
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
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="log-in-outline" size={30} color="white" />
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "medium",
                  fontSize: 17,
                  marginLeft: 5,
                  flex: 1,
                }}
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
    
    borderRadius:10,
    borderWidth:1,
    borderColor:'white',
    marginRight:5

  }, 
  textCompetence:{
    fontSize:10,
    fontWeight:'500',
    color:'white'
  }
})  