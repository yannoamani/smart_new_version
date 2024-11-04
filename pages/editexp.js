import { KeyboardAvoidingView,View, Text, Platform, Pressable, TextInput, Alert, ScrollView,ActivityIndicator } from "react-native";
import styles from '../styles';
import experienceStyle from "../pages/styles/editExp";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createFormattedDateExp } from "../Utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import translateText from "../pages/store/TranslationUtils"


export default function EditExp({route}) {
    const { expR } = route.params || {};

    const navigation = useNavigation()
    const lang = useSelector((state) => state.translate.lang);
    // Check if expR is defined before accessing its properties
    const [job, setJob] = useState(expR ? expR.poste : "");
    const [place, setPlace] = useState(expR ? expR.lieu : "");
    const [exp, setExp] = useState(expR ? expR.experience : "");
    const [company, setCompany] = useState(expR ? expR.entreprise : "");
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [loading, Setloading]=useState(false)
    const hideshowTimePicker = () => {
        if (isTimePickerVisible) {
        setTimePickerVisibility(false);
        } else {
        setTimePickerVisibility(true);
        }
    };
  const [hourstart, handleHourStartChange] = useState(expR ? expR.dateDebut : "");
  const [hourend, handleHourEndChange] = useState(expR ? expR.dateFin : "");
  const [timer, setTimer] = useState(false);
  const [TextTranslation, setTextTransaction] = useState({
    Title: lang=='fr'?"Modifier votre experience":"Edit your experience",
Poste :lang=='fr'?"Poste":"Job",
Entreprise:lang=='fr'?"Entreprise":"Company",
Lieu:lang=='fr'?"Lieu":"Place",
DateDebut:lang=='fr'?"Date de debut":"Start date",
DateFin:lang=='fr'?"Date de fin":"End date",
Description:lang=='fr'?"Description":"Description",
Modifier:lang=='fr'?"Modifier":"Edit",
Succes:lang=='fr'?"Succes":"Success",
Echec:lang=='fr'?"Echec":"Failed",
bodySucces:lang=='fr'?"Experience modifiée avec succès":"Experience modified successfully",
valeurValide:lang=='fr'?"Entrez des valeurs valides.":"Enter valid values"

   
  });

  const Translation = async()=>{
//  const title= await translateText(TextTranslation.Title, lang);
//  const poste= await translateText(TextTranslation.Poste, lang);
//  const Entreprise= await translateText(TextTranslation.Entreprise, lang);
//  const Lieu= await translateText(TextTranslation.Lieu, lang);
//  const DateDebut= await translateText(TextTranslation.DateDebut, lang);
//  const DateFin= await translateText(TextTranslation.DateFin, lang);
//  const Description= await translateText(TextTranslation.Description, lang);
//  const Modifier= await translateText(TextTranslation.Modifier, lang);
//  setTextTransaction({
//   Title: title,
//   Poste:poste,
//   Entreprise:Entreprise,
//   Lieu:Lieu,
//   DateDebut:DateDebut,
//   DateFin:DateFin,
//   Description:Description,
//   Modifier:Modifier
//  })
  }
  const handleTimeConfirm = (time) => {
    const platform = Platform
    if (timer) {
        handleHourStartChange(JSON.stringify(time).split('"')[1].split('T')[0])
    } else {
        handleHourEndChange(JSON.stringify(time).split('"')[1].split('T')[0])
    }
    hideshowTimePicker();
  };
    useEffect(() => {

    // Translation();
    }, [lang]);
    return (
        <KeyboardAvoidingView
        style={{
          // alignItems: "center",
          flex: 1,
          backgroundColor: "#F1F2F4",
          
         
        }}
        behavior={"height"}
      >
        <View style={experienceStyle.container}>
        <ScrollView 
            style={{flex:1}}
        >
        <Text style={experienceStyle.title}>{TextTranslation.Title}</Text>
            <View 
                style={{
                    // alignItems: "center",
                    flex: 1
                }}
                //behavior={'height'}
                >
                <View style={{height:20}}></View>
                <Text style={experienceStyle.label}>{TextTranslation.Poste}</Text>
                <View style={{height:5}}></View>
                <TextInput 
                    style={experienceStyle.input}
                    placeholder="Ajoutez un poste ici"
                    value={job}
                    onChangeText={(text) => {setJob(text)}}
                />
                <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>{TextTranslation.Entreprise} </Text>
                <View style={{height:5}}></View>
                <TextInput 
                    style={experienceStyle.input}
                    placeholder="Ajoutez l'entreprise ici "
                    value={company}
                    onChangeText={(text) => {setCompany(text)}}
                />
                
                 <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>{TextTranslation.Lieu}</Text>
                 <View style={{height:5}}></View>
                <TextInput 
                    style={experienceStyle.input}
                    placeholder="Lieu"
                    value={place}
                    onChangeText={(text) => {setPlace(text)}}
                />
                  <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>{TextTranslation.DateDebut}</Text>
                 <View style={{height:5}}></View>
                <TextInput
                 readOnly={true}
                    style={experienceStyle.input}
                    placeholder="Date (__/__/____)"
                    keyboardType="numeric"
                    value={hourstart}
                    onPressOut={() => {
                        setTimer(true)
                        hideshowTimePicker()
                      }}
                    onChangeText={handleTimeConfirm} // MM/DD/YYYY has 10 characters
                />
                <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>{TextTranslation.DateFin}</Text>
                 <View style={{height:5}}></View>
                <TextInput
                readOnly={true}
                    style={experienceStyle.input}
                    placeholder="Date (__/__/____)"
                    keyboardType="numeric"
                    value={hourend}
                    onPressOut={() => {
                        setTimer(false)
                        hideshowTimePicker()
                      }}
                    onChangeText={handleTimeConfirm} // MM/DD/YYYY has 10 characters
                />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="date"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideshowTimePicker}
                  />
                    
                    <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>{TextTranslation.Description}</Text>
                 <View style={{height:5}}></View>
                <TextInput
                    style={experienceStyle.textarea}
                    placeholder="Ajoutez une description"
                    multiline={true}
                    //numberOfLines={4}
                    value={exp}
                    onChangeText={setExp}
                />
                    <View style={{height:30}}></View>

                    
                    <Pressable 
                    disabled={loading}
                        onPress={async () => {
                            Setloading(true);
                            try {  
                              

                                if (createFormattedDateExp(hourstart) === 'Invalid' || createFormattedDateExp(hourend) === 'Invalid') {
                                    // Alert.alert('Warning', 'Entrez des dates valides.', [
                                    //     { text: 'OK', onPress: () => console.log('OK Pressed') }
                                    //   ],
                                    //   { cancelable: false })
                                    console.log('Invalide');
                                } else {
                                 
                                    const req = await axios.post('modifyExperience/'+ expR.id, {
                                        poste: job,
                                        lieu: place,
                                        dateDebut: createFormattedDateExp(hourstart),
                                        dateFin: createFormattedDateExp(hourend),
                                        experience: exp,
                                        entreprise: company,

                                    })
                                    setCompany('')
                                    setExp('')
                                    setJob('')
                                    setPlace('')
                                    handleHourStartChange('')
                                    handleHourEndChange('')
                                    Setloading(false);
                                    Alert.alert(TextTranslation.Succes, TextTranslation.bodySucces, [
                                        { text: 'OK', onPress: () => console.log('OK') }
                                      ],
                                      { cancelable: true })
                                    navigation.navigate('Profile')
                                    console.log(req);
                                }
                            } catch (error) {
                                console.log(error);
                                Setloading(false);
                            }
                        }} 
                        style={experienceStyle.button}
                    >
                        <Text style={experienceStyle.textButton}>
                           {
                            loading ?<ActivityIndicator size="large" color={'white'}/> : TextTranslation.Modifier
                           }
                        </Text>
                    </Pressable>
            </View>
        </ScrollView>
        </View>
        </KeyboardAvoidingView>
    )
}