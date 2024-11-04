import { FlatList,ActivityIndicator, View,  StyleSheet,Text, Pressable, Alert } from "react-native";

import React, { useEffect, useState } from "react";
import style1 from '../pages/styles/editExp';
import axios from "axios";
import { displayDate } from "../Utils";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import translateText from "../pages/store/TranslationUtils"

export default function NewSkills() {
    const [isLoading, setLoading] = useState(false);
    const lang = useSelector((state) => state.translate.lang);
    const [skills, setSkills] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const[competence, setCompetence] = useState(0);
    const [data, setData] = useState();
    const [TextTranslation, setTextTransaction] = useState({
        Title: lang=='fr'?"Ajouter /Retirer une competence au profile":"Add /Remove a skill to profile",
    Ajouter :lang=='fr'?"Ajouter":"Add",
  NoCompetence:lang=='fr'?"Aucune competence":"No skills",
  Competence:lang=='fr'?"Compétence":"Skill",
  Succes:lang=='fr'?"Succes":"Success",
  Echec:lang=='fr'?"Echec":"Fail",
  BodySucces:lang=='fr'?"Compétence ajoutée avec succès":"Skill added successfully",
  Supression:lang=='fr'?"Supprimer":"Delete",
  Bodysupression:lang=='fr'?"Voulez-vous de retirer  cette compétence à votre profile":"Are you sure you want to delete this skill",
  DeleteSucces:lang=='fr'?"Compétence retirée avec succès":"Skill removed successfully",
  Yes:lang=='fr'?"Oui":"Yes",
  Non:lang=='fr'?"Non":"No",
  NoSelect:lang=='fr'?"Veuillez selectionner une competence":"Please select a skill",
  
 
    
       
      });
    const getOffers = async () => {
        setRefreshing(true);
        try {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const res = await axios.get('GetAllCompetences');
            const Mydata = res.data.data;
            const translateAll = await Promise.all(
                Mydata.map(async (item) => {
                    return {
                        ...item,
                        competence: await translateText(item.competence, lang),
                    };
                })
            );
           
            setData(translateAll);
             setRefreshing(false);
            console.log(translateAll);
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
            const myCompetences = res.data.data.competences;
            const translateAll = await Promise.all(
               myCompetences.map(async (item) => {
                    return {
                        ...item,
                        competence: await translateText(item.competence, lang),
                    };
                })
            );
            setSkills(translateAll);
            setRefreshing(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Echec de récupération de données", error.message, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
            setRefreshing(false);
        }
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

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            await getOffers();
            await getUserSkills();
        };
        fetchData();
        return () => {
            isMounted = false; // Cleanup function to prevent updates if unmounted
        };

    },[]);
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
         placeholder={TextTranslation.Competence}
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
                            const translate= await translateText(error.response.data.message, lang)
                            Alert.alert(TextTranslation.Echec, translate, [{text: 'OK', onPress: () => console.log('OK')}], { cancelable: true })
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
                    onRefresh={getOffers}
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
  )
}


const style = StyleSheet.create({
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