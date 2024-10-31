import { FlatList,ActivityIndicator, View,  StyleSheet,Text, Pressable, Alert } from "react-native";
import styles from '../styles';
import style1 from '../pages/styles/editExp';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { displayDate } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import translateText from "../pages/store/TranslationUtils"


export default function Skills() {
    const lang = useSelector((state) => state.translate.lang);
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [skills, setSkills] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const token = AsyncStorage.getItem('token')
    const[competence, setCompetence] = useState(0);
    const [TextTranslation, setTextTransaction] = useState({
        Title: "Ajouter une competence / Supprimer une competence",
    Ajouter :"Ajouter",
  NoCompetence:"Aucune competence ajoutée au profil",
  Competence:"Competence",
  Succes:"Succes",
  Echec:"Echec",
  BodySucces:"Compétence ajoutée avec succès",
  Supression:"Supprimer",
  Bodysupression:"Voulez-vous supprimer cette compétence de votre profil ?",
  DeleteSucces:"Compétence supprimée avec succès!",
  Yes:"Oui",
  Non:"Non",
  NoSelect:"Veuillez selectionner une competence"
  
 
    
       
      });
      const translation= async()=>{
       const title= await translateText(TextTranslation.Title, lang);
       const ajouter= await translateText(TextTranslation.Ajouter, lang);
       const NoCompetence= await translateText(TextTranslation.NoCompetence, lang);
       const competence= await translateText(TextTranslation.Competence, lang);
       const succes= await translateText(TextTranslation.Succes, lang);
       const bodySucces= await translateText(TextTranslation.BodySucces, lang);
      const  Supression= await translateText(TextTranslation.Supression, lang);
      const Bodysupression= await translateText(TextTranslation.Bodysupression, lang);
       const DeleteSucces= await translateText(TextTranslation.DeleteSucces, lang);
       const oui= await translateText(TextTranslation.Yes, lang);
       const non= await translateText(TextTranslation.Non, lang);
       const NoSelect= await translateText(TextTranslation.NoSelect, lang);

       setTextTransaction({
        Title: title,
        Ajouter:ajouter,
        NoCompetence:NoCompetence,
        Competence:competence,
        Succes:succes,
        BodySucces:bodySucces,
        Supression:Supression,
        Bodysupression:Bodysupression,
        DeleteSucces:DeleteSucces,
        Yes:oui,
        Non:non,
        NoSelect:NoSelect

       })


          
      }
    const goToAddSched = () => {
        navigation.navigate("AddSched");
    }
    const getOffers = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('GetAllCompetences');
            const Mydata = res.data.data;
            // const translateAll = await Promise.all(
            //     Mydata.map(async (item) => {
            //         return {
            //             ...item,
            //             nom: await translateText(item.nom, lang),
            //         };
            //     })
            // )
            setData(res.data.data);
            setRefreshing(false);
            console.log(Mydata);
        } catch (error) {
            console.log(error);
            setRefreshing(false);
        }
    };

    const getUserSkills = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('getCompetenceByStudents');
            setSkills(res.data.data.competences);
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Echec de récupération de données", error.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            setRefreshing(false);
        }
    };
    

    const fetchOffers = () => {
        setRefreshing(true);
        getOffers();
        getUserSkills()
        translation();
    };

    useEffect(() => {
        // Fetch offers when the component mounts
        fetchOffers();

        // Set up an interval to fetch offers every 1 minute
        const intervalId = setInterval(fetchOffers, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [lang]);

    const renderItem = ({ item }) => {
        return (
            <View style={{
                //width: "98%",
                borderWidth: 2,
                borderColor: '#87CEEB',
                backgroundColor: '#87CEEB',
                //marginBottom: 5,
                padding: "4%",
                margin: "2%",
                borderRadius: 15,
                // backgroundColor: 'gray'
              }}>
                <Text style={{
                    color: 'white',
                    // textAlign: 'left',
                    paddingHorizontal: "2%",
                    //height: '60%'
                    }}
                >
                    {item.competence.toUpperCase()}
                </Text>
                <Ionicons
                    onPress={() => {
                        Alert.alert("Ajouter ?",'Voulez-vous ajouter cette compétence à votre profil ?',[
                            {text: 'OUI', onPress: async () => {
                                try {
                                    const del = await axios.post('addCompetences', {
                                        competence: [item.id]
                                    })
                                    Alert.alert("Réussi", 'Compétence ajoutée au profil', [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                } catch (error) {
                                    Alert.alert("Echec", error.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                }
                            }},
                            {text: 'NON', onPress: async () => console.log('NON')},
                        ], { cancelable: true })
                        
                    }}
                    style={{
                    position: "absolute",
                    right: '2%',
                    top: '20%',
                    //margin: '2%'
                    }}
                    name="add-circle-outline"
                    size={30}
                    color="white"
                />
            </View>
        );
    };

    const renderItem2 = ({ item }) => {
        return (
           <View  style={style.card}>
             
                <Text style={{
                    color: 'black',
                    // textAlign: 'left',
                    paddingHorizontal: "2%",
                    //height: '60%'
                    }}
                >
                    {item.competence.toUpperCase()}
                </Text>
                <Ionicons
                    onPress={() => {
                        Alert.alert(TextTranslation.Supression,TextTranslation.Bodysupression,[
                            {text: TextTranslation.Non, onPress: async () => console.log('NON')},
                            {text:TextTranslation.Yes, onPress: async () => {
                                try {
                                    //return console.log(item.id);
                                    const del = await axios.delete('deleteCompetencesOfStudents/'+ item.id)
                                    Alert.alert(TextTranslation.Succes, TextTranslation.DeleteSucces, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                    getUserSkills();
                                } catch (error) {
                                    Alert.alert("Echec", error.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                }
                            }},
                          ,
                        ], { cancelable: true })
                        
                    }}
                  
                    name="trash-outline"
                    size={20}
                    color="red"
                />
                
              
               
          
           </View>
        );
    };

    return (
        <View style={{flex: 1,paddingTop: "2%", width: "100%",backgroundColor:'#F1F2F4'}}>
            {data || skills ? (
                    <View style={{flex:1}}>
                        {/* <Text>
                            Toutes les compétences
                        </Text> */}
                        {/* <FlatList
                        ListHeaderComponent={<View>
                            <View style={{height:30}}>
                                
                            </View>
                        </View>}
                            style={{ width: "100%" }}
                            renderItem={renderItem}
                            data={data}
                            keyExtractor={item => item.id.toString()}
                            onRefresh={fetchOffers}
                            refreshing={refreshing}
                            scrollEnabled={true} 
                            
                        /> */}
                        {/* <Text>
                            {JSON.stringify(data)}
                        </Text> */}
                        {/* <Text>
                            Mes compétences
                        </Text> */}
                        {/* <View style={{height:40}}></View> */}
                        <FlatList
                        // style={{width:'100%', height:'100%'}}
                         ListHeaderComponent={<View style={{padding: "2%"}}>
                         <Text style={style1.title}>{TextTranslation.Title}</Text>
                         <View style={{height:20}}></View>
                            <Dropdown 
                 style={style1.dropdown}
                 search
                 placeholder="Competence ..."
                 placeholderStyle={style1.placeholderStyle}
                 selectedTextStyle={style1.selectedTextStyle}
                 inputSearchStyle={style1.inputSearchStyle}
                 iconStyle={style1.iconStyle}
                //  value={degree}
                 valueField={"competence"}

                data={data}
                maxHeight={300}
                onChange={item => {
          setCompetence(item.id);
          console.log(competence);
          
        }}
                labelField={"competence"}
                 ></Dropdown>
                  <View style={{height:20}}></View>
                  <Pressable style={style1.button}  onPress={ async () => {
                               setLoading(true);
                                try {

                                   if(competence==0){
                                    Alert.alert(TextTranslation.Echec, TextTranslation.NoSelect, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                    setLoading(false);
                                   }
                                   else{
                                    const del = await axios.post('addCompetences', {
                                        competence: [competence]
                                    })
                                    getUserSkills();
                                    Alert.alert(TextTranslation.Succes, TextTranslation.BodySucces, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                    setLoading(false);
                                    console.log(del.data);
                                   }
                                } catch (error) {
                                    Alert.alert("Echec", JSON.stringify(error.response.data.message), [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
                                    setLoading(false);
                                }
                            }}>
                   <Text style={style1.textButton}>{
                       isLoading ? <ActivityIndicator size="large" color="white" /> : TextTranslation.Ajouter
                   }</Text>
                  </Pressable>

                            
                            <View style={{height:50}}></View>
                            {/* <Text style={style1.title}>Mes competences </Text> */}
                        </View>}
                            style={{ width: "100%",height:'100%', paddingHorizontal: 15 }}
                            renderItem={renderItem2}
                            data={skills}
                            keyExtractor={item => item.id.toString()}
                            onRefresh={fetchOffers}
                            refreshing={refreshing} 
                            scrollEnabled={true}
                            ListEmptyComponent={<View style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'center'}} >
                                <View style={{borderColor:'gray', borderRadius:15, padding:10, height:40, backgroundColor:"red"}}>
                                <Text style={{color:'white'}}>{
                                    TextTranslation.NoCompetence
                                }</Text>
                                </View>
                            </View>}
                        />
                        {/* <Text>
                            {JSON.stringify(skills)}
                        </Text> */}
                    </View>
            ) : (
               <View style={{flex:1,height:"100%", alignItems:'center', justifyContent:'center'}}>
               <ActivityIndicator size="large" color="black" />
               </View>
            )}
        </View>
    );
}

const style= StyleSheet.create({
    card:{
        width: "100%",
         padding: "4%",   
         backgroundColor: 'white',
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         borderBottomColor: 'gray',
         borderBottomWidth: 1,
         
        

       


        }

})