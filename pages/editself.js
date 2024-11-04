import { View, Text, Platform, Pressable, TextInput, Alert, ScrollView } from "react-native";
import styles from '../pages/styles/editExp';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { createFormattedDate, createFormattedDateExp } from "../Utils";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import translateText from "../pages/store/TranslationUtils"
import { useSelector } from 'react-redux';


export default function EditSelf() {
    const lang = useSelector((state) => state.translate.lang);
    const [data, setData] = useState();
    const [job, setJob] = Platform.OS == 'ios' ? useState('Poste') : useState();
    const [place, setPlace] = Platform.OS == 'ios' ? useState('Localisation') : useState();
    const [exp, setExp] = Platform.OS == 'ios' ? useState('Description') : useState();
    const [company, setCompany] = Platform.OS == 'ios' ? useState('Entreprise') : useState();
    const [ficher , setFicher] = useState();
    
    const navigation = useNavigation()
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const hideshowTimePicker = () => {
        if (isTimePickerVisible) {
        setTimePickerVisibility(false);
        } else {
        setTimePickerVisibility(true);
        }
    };
  const [hourstart, handleHourStartChange] = useState('Heure de Début');
  const [hourend, handleHourEndChange] = useState('Heure de Fin');
  const [timer, setTimer] = useState(false);
  const handleTimeConfirm = (time) => {
    const platform = Platform
    if (timer) {
        handleHourStartChange(JSON.stringify(time).split('"')[1].split('T')[0])
    } else {
        handleHourEndChange(JSON.stringify(time).split('"')[1].split('T')[0])
    }
    hideshowTimePicker();
  };
  // la fonction qui me permettra d'ajouter une image 
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // This will pick only image files
      });
      setFicher(result);
    //   setfileName(result.assets[0].name);
    //   setUrl(result.assets[0].uri);
      console.log(ficher);
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };
  const [TextTranslation, setTextTransaction] = useState({
    Title: lang=="fr"?"Ajouter une nouvelle experience":"Add a new experience",
Poste :lang=="fr"?"Poste":"Job",
Ajouter:lang=="fr"?"Ajouter":"Add",
Entreprise:lang=="fr"?"entreprise":"company",
Lieu:lang=="fr"?"Lieu":"Location",
DateDebut:lang=='fr'?"Date de debut":"Start Date",
DateFin:lang=='fr'?"Date de fin":"End Date",
Description:lang=="fr"?"Description":"Description",
Modifier:lang=="fr"?"Modifier":"Edit",
Ajouterpiece:lang=="fr"?"Ajouter une piece jointe":"Add a file",
Attention:lang=="fr"?"Attention":"Warning",
ReponseErreur:lang=="fr"?"Entrer des Dates Valides":"Enter valid Dates",
Succes:lang=="fr"?"Expérience enregistrée avec succès":"Experience added successfully",
   
  });
  const translation = async()=>{
    // const title= await translateText(TextTranslation.Title, lang);
    // const poste= await translateText(TextTranslation.Poste, lang);
    // const Entreprise= await translateText(TextTranslation.Entreprise, lang);
    // const Lieu= await translateText(TextTranslation.Lieu, lang);
    // const DateDebut= await translateText(TextTranslation.DateDebut, lang);
    // const DateFin= await translateText(TextTranslation.DateFin, lang);
    // const Description= await translateText(TextTranslation.Description, lang);
    // const Modifier= await translateText(TextTranslation.Modifier, lang);
    // const Ajouterpiece= await translateText(TextTranslation.Ajouterpiece, lang);
    // const ajouter= await translateText(TextTranslation.Ajouter, lang);
    // const attention= await translateText(TextTranslation.Attention, lang);
    // const reponseErreur= await translateText(TextTranslation.ReponseErreur, lang);
    // const succes= await translateText(TextTranslation.Succes, lang);
    // setTextTransaction({
    //   Title: title,
    //   Poste:poste,
    //   Entreprise:Entreprise,
    //   Lieu:Lieu,
    //   DateDebut:DateDebut,
    //   DateFin:DateFin,
    //   Description:Description,
    //   Modifier:Modifier,
    //   Ajouterpiece:Ajouterpiece,
    //   Ajouter:ajouter,
    //   Attention:attention,
    //   ReponseErreur:reponseErreur,
    //   Succes:succes
    // })
  }



    useEffect(() => {
      // translation()
    }, [lang]);
    return (
       
            <View 
                style={{
                 padding:10,   // alignItems: "center",
                    flex: 1
                }}
                // behavior={'padding'}
                >
                 <ScrollView 
            style={{flex:1}} >
            <Text style={styles.title}>{TextTranslation.Title} </Text>
            <View style={{height:20}}></View>
            <Text style={styles.label}>{TextTranslation.Poste}</Text>
            <View style={{height:2}}></View>
                <TextInput 
                    style={styles.input}
                    placeholder="Poste"
                    value={job}
                    onChangeText={(text) => {setJob(text)}}
                />
               <View style={{height:20}}></View>
            <Text style={styles.label}>{TextTranslation.Entreprise}</Text>
            <View style={{height:2}}></View>
                <TextInput 
                    style={styles.input}
                    placeholder="Entreprise"
                    value={company}
                    onChangeText={(text) => {setCompany(text)}}
                />
                  <View style={{height:20}}></View>
            <Text style={styles.label}>{TextTranslation.Description}</Text>
            <View style={{height:2}}></View>
                <TextInput
                    style={styles.textarea}
                    placeholder="Description"
                    multiline={true}
                    //numberOfLines={4}
                    value={exp}
                    onChangeText={setExp}
                />
                 <View style={{height:20}}></View>
            <Text style={styles.label}>{TextTranslation.Lieu}</Text>
            <View style={{height:2}}></View>
                <TextInput 
                    style={styles.input}
                    placeholder="Lieu"
                    value={place}
                    onChangeText={(text) => {setPlace(text)}}
                />
                 <View style={{height:20}}></View>
            <Text style={styles.label}>={TextTranslation.DateDebut}</Text>
            <View style={{height:2}}></View>
                <TextInput
                 readOnly
                    style={styles.input}
                    placeholder="Date (__/__/____)"
                    keyboardType="numeric"
                    value={hourstart}
                    onPressOut={() => {
                        setTimer(true)
                        hideshowTimePicker()
                      }}
                    onChangeText={handleTimeConfirm}
                    //maxLength={10} // MM/DD/YYYY has 10 characters
                />
                 <View style={{height:20}}></View>
            <Text style={styles.label}>{TextTranslation.DateFin}</Text>
            <View style={{height:2}}></View>
                <TextInput
                readOnly
                    style={styles.input}
                    placeholder="Date (__/__/____)"
                    keyboardType="numeric"
                    value={hourend}
                    onPressOut={() => {
                        setTimer(false)
                        hideshowTimePicker()
                      }}
                    onChangeText={handleTimeConfirm}
                    //maxLength={10} // MM/DD/YYYY has 10 characters
                />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="date"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideshowTimePicker}
                  />
                   <View style={{height:20}}></View>
                  <Pressable onPress={pickDocument}>
                  <View style={styles.carre}>
                    <Ionicons name="download" size={44} color="black"></Ionicons>
                    <View style={{height:10}}></View>
                    <Text>{TextTranslation.Ajouterpiece} </Text>
                    {
                        ficher==null?'': <Text>{ficher.name}</Text>
                    }
                   </View>
                  </Pressable>
                   <View style={{height:20}}></View>
            
                    <Pressable 
                        onPress={async () => {
                            try {
                                if (createFormattedDateExp(hourstart) === 'Invalid' || createFormattedDateExp(hourend) === 'Invalid') {
                                    Alert.alert( TextTranslation.Attention, TextTranslation.ReponseErreur, [
                                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                                      ],
                                      { cancelable: false })
                                    console.log(hourstart);
                                } else {
                                    const req = await axios.post('postNewExperience', {
                                        poste: job,
                                        lieu: place,
                                        dateDebut: createFormattedDateExp(hourstart),
                                        dateFin: createFormattedDateExp(hourend),
                                        experience: exp,
                                        entreprise: company,
                                      
                                    })
                                    console.log(req.data)
                                    setCompany('')
                                    setExp('')
                                    setJob('')
                                    setPlace('')
                                    handleHourStartChange('')
                                    handleHourEndChange('')
                                    Alert.alert("Réussi", TextTranslation.Succes, [
                                        { text: 'OK', onPress: () => console.log('OK') }
                                      ],
                                      { cancelable: true })
                                    navigation.navigate('Profile')
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }} 
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>
                            {TextTranslation.Ajouter}
                        </Text>
                    </Pressable>
                    </ScrollView>
                    
            </View>
        
    )
}