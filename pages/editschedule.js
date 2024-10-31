import { View, Text, Platform, Pressable, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import styles from '../pages/styles/editExp';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { createFormattedDate, createFormattedTime, calculateTimeDifference } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import translateText from "../pages/store/TranslationUtils"
import { useSelector } from 'react-redux';

export default function EditSchedule({route}) {
  const lang = useSelector((state) => state.translate.lang);
  const [TextTranslate, setTextTranslate] = useState({
    ModifierPlage:"Modifier plage Horaire",
    HeureDeb:"Heure de Début",
    HeureFin:"Heure de Fin",
    Date:"Date",
    Modifier:"Modifier",
    Succes:"Succes",
    Echec:"Echec",

    bodySucces:"Plage horaire modifiée avec succès",
    valeurValide:"Entrez des valeurs valides."
  });
    const { expR } = route.params || {};
  
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const hideshowDatePicker = () => {
      if (isDatePickerVisible) {
        setDatePickerVisibility(false);
      } else {
        setDatePickerVisibility(true);
      }
    };
    const [start, handleDateChange] = useState(expR.jour);
    const handleConfirm = (date) => {
      const platform = Platform
      if (platform.OS == 'ios') {

        handleDateChange(JSON.stringify(date).split('"')[1].split('T')[0])
      } else {
        handleDateChange(JSON.stringify(date).split('"')[1])
      }
      hideshowDatePicker();
    };
    
  
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const hideshowTimePicker = (name) => {
      if (isTimePickerVisible) {
        setTimePickerVisibility(false);
      } else {
        setTimePickerVisibility(true);
      }
    };
    const [hourstart, handleHourStartChange] = useState(expR.First_horaire.split('-')[0]);
    const [hourend, handleHourEndChange] = useState(expR.First_horaire.split('-')[1]);
    const [timer, setTimer] = useState(false);
    const handleTimeConfirm = (time) => {
      //handleDateChange(JSON.stringify(date).split('"')[1])
      if (timer) {
        handleHourStartChange(JSON.stringify(time).split('T')[1].slice(0,5))
      } else {
        handleHourEndChange(JSON.stringify(time).split('T')[1].slice(0,5))
      }
      hideshowTimePicker();
    };
    const translation =async ()=>{
      const title=await translateText("Modifier votre plage horaire",lang);
      const heureDeb=await translateText("Heure de Début",lang);
      const heureFin=await translateText("Heure de Fin", lang);
      const date=await translateText("Date", lang);
      const ajouter=await translateText("Modifier", lang);
      const succes=await translateText("Succes", lang);
      const echec=await translateText("Echec", lang);
      const bodySucces=await translateText("Plage horaire modifiée avec succès", lang);
      const valeurValide=await translateText("Entrez des valeurs valides.", lang);
      setTextTranslate({
        ModifierPlage:title,
        HeureDeb:heureDeb,
        HeureFin:heureFin,
        Date:date,
        Modifier:ajouter,
        Succes:succes,
        Echec:echec,
        bodySucces:bodySucces,
        valeurValide:valeurValide
      })
    }
  
      const navigation = useNavigation()
      useEffect(() => {
        translation()
      }, [lang]);
      return (
        <KeyboardAvoidingView 
                  style={{
                      // alignItems: "center",
                      flex: 1
                  }}
                  behavior={'height'}>
          <View style={styles.container} >
             
                  <Text style={styles.title}>{TextTranslate.ModifierPlage}</Text>
                  <View style={{height:20}}></View>
                  <Text style={styles.label}>{TextTranslate.HeureDeb} </Text>
                  <View style={{height:2}}></View>
                  <TextInput 
                   readOnly={true}
                      style={styles.input}
                      placeholder="__:__"
                      value={hourstart}
                      keyboardType="numeric"
                      onPressOut={() => {
                        setTimer(true)
                        hideshowTimePicker()
                      }}
                      onChangeText={handleTimeConfirm}
                  />
                  <View style={{height:20}}></View>
                  <Text style={styles.label}>{TextTranslate.HeureFin} </Text>
                  <View style={{height:2}}></View>
                  <TextInput 
                   readOnly={true}
                      style={styles.input}
                      placeholder="__:__"
                      value={hourend}
                      keyboardType="numeric"
                      onPressOut={() => {
                        setTimer(false)
                        hideshowTimePicker()
                      }}
                      onChangeText={handleTimeConfirm}
                  />
                     <View style={{height:20}}></View>
                  <Text style={styles.label}>Date  </Text>
                  <View style={{height:2}}></View>
                  <TextInput
                  readOnly={true}
                      style={styles.input}
                      placeholder="Date (__/__/____)"
                      keyboardType="numeric"
                      value={start}
                      onPressOut={() => hideshowDatePicker()}
                      onChangeText={handleConfirm}
                      maxLength={10} // MM/DD/YYYY has 10 characters
                  />
                    <DateTimePickerModal
                      isVisible={isTimePickerVisible}
                      mode="time"
                      onConfirm={handleTimeConfirm}
                      onCancel={hideshowTimePicker}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideshowDatePicker}
                    />
                     <View style={{height:30}}></View>
                      <Pressable 
                          onPress={async () => {
                              try {
                                 const date = start.split('T')[0]
                                  if (createFormattedDate(date) === 'Invalid' || createFormattedTime(hourstart) === 'Invalid' || createFormattedTime(hourend) === 'Invalid') {
                                      Alert.alert(TextTranslate.Echec, TextTranslate.valeurValide, [
                                          { text: 'OK', onPress: () => console.log('Invalide'+start) }
                                        ],
                                        { cancelable: true })
                                  } else {
                                      const req = await axios.put('modify_schedule/'+expR.id, {
                                        day: [createFormattedDate(date)],
                                        First_horaire: createFormattedTime(hourstart)+"-"+createFormattedTime(hourend),
                                        totalHour: calculateTimeDifference(hourstart, hourend),
                                      })
                                      handleHourEndChange('')
                                      handleHourStartChange('')
                                      handleDateChange('')
                                      Alert.alert(TextTranslate.Succes, TextTranslate.bodySucces, [
                                          { text: 'OK', onPress: () => console.log('OK') }
                                        ],
                                        { cancelable: true })
                                      navigation.goBack();
                                      console.log(req);
                                  }
                              } catch (error) {
                                //console.log(error);
                                Alert.alert('Echec', error.message, [
                                    { text: 'OK' }
                                  ],
                                  { cancelable: true })
                              }
                          }} 
                          style={styles.button}
                      >
                          <Text style={styles.textButton}>
                          {TextTranslate.Modifier}
                          </Text>
                      </Pressable>
             
          </View>
          </KeyboardAvoidingView>
      )
}