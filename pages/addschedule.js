import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "../pages/styles/editExp";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import {
  createFormattedDate,
  createFormattedTime,
  calculateTimeDifference,
} from "../Utils";
import translateText from "../pages/store/TranslationUtils"
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function AddSchedule() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.translate.lang);
  const [TextTranslation, setTextTransaction] = useState({
    Title: lang=="fr"?"Ajouter votre plage horaire":"Add your schedule",
    HeureDeb:lang=="fr"?"Heure de Début":"Start time",
    HeureFin:lang=="fr"?"Heure de Fin":"End time",
    Date:lang=="fr"?"Date":"Date",
    Ajouter:lang=="fr"?"Ajouter":"Add",
    Succes:lang=="fr"?"Succes":"Success",
    Echec:lang=="fr"?"Echec":"Failed",
    bodySucces:lang=="fr"?"Plage horaire ajoutée avec succès":"Added schedule successfully",
    valeurValide:lang=="fr"?"Entrez des valeurs valides.":"Enter valid values.",
  });
  const Translation =async() => {

    // const title=await translateText("Ajouter votre plage horaire",lang);

    // const heureDeb=await translateText("Heure de Début",lang);
    // const heureFin=await translateText("Heure de Fin", lang);
    // const date=await translateText("Date", lang);
    // const ajouter=await translateText("Ajouter", lang);
    // const succes=await translateText("Succes", lang);
    // const echec=await translateText("Echec", lang);
    // const bodySucces=await translateText("Plage horaire ajoutée avec succès", lang);
    // const valeurValide=await translateText("Entrez des valeurs valides.", lang);

    // setTextTransaction({
    //   Title:title,  
    //   HeureDeb:heureDeb,
    //   HeureFin:heureFin,
    //   Date:date,
    //   Ajouter:ajouter,
    //   Succes:succes,
    //   Echec:echec,
    //   bodySucces:bodySucces,
    //   valeurValide:valeurValide
    // })

 

    
  }

  const hideshowDatePicker = () => {
    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
    } else {
      setDatePickerVisibility(true);
    }
  };
  const [start, handleDateChange] = useState("Date");
  const handleConfirm = (date) => {
    const platform = Platform;
    if (platform.OS == "ios") {
      handleDateChange(JSON.stringify(date).split('"')[1].split("T")[0]);
    } else {
      handleDateChange(JSON.stringify(date).split('"')[1]);
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
  const [hourstart, handleHourStartChange] = useState("Heure de Début");
  const [hourend, handleHourEndChange] = useState("Heure de Fin");
  const [timer, setTimer] = useState(false);
  const handleTimeConfirm = (time) => {
    //handleDateChange(JSON.stringify(date).split('"')[1])
    if (timer) {
      handleHourStartChange(JSON.stringify(time).split("T")[1].slice(0, 5));
    } else {
      handleHourEndChange(JSON.stringify(time).split("T")[1].slice(0, 5));
    }
    hideshowTimePicker();
  };

  const navigation = useNavigation();
  useEffect(() => {
    Translation();
  }, [
    lang
  ]);
  return (
    <KeyboardAvoidingView
        style={{
          // alignItems: "center",
           flex:1,padding:10 
         
        }}
        behavior={"height"}
      >
    <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>
    
      <Text style={styles.title}>{TextTranslation.Title} </Text>
      <View style={{height:30}}></View>
     
      {/* <View style={{height:15}}></View> */}
      <Text style={styles.label}>{TextTranslation.HeureDeb} </Text>
      <View style={{height:5}}></View>
        <TextInput
          style={styles.input}
          readOnly={true}
          placeholder="__:__"
          value={hourstart}
          keyboardType="numeric"
          onPressOut={() => {
            setTimer(true);
            hideshowTimePicker();
          }}
          onChangeText={handleTimeConfirm}
        />
        <View style={{height:20}}></View>
        <Text style={styles.label}>{TextTranslation.HeureFin} </Text>
        <View style={{height:5}}></View>
        <TextInput
        readOnly={true}
          style={styles.input}
          placeholder="__:__"
          value={hourend}
          keyboardType="numeric"
          onPressOut={() => {
            setTimer(false);
            hideshowTimePicker();
          }}
          onChangeText={handleTimeConfirm}
        />
        <View style={{height:20}}></View>
        <Text style={styles.label}>{TextTranslation.Date}</Text>
        <View style={{height:5}}></View>
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
        <View style={{height:20}}></View>
        <Pressable
          onPress={async () => {
            setLoading(true);
            try {
              const date = start.split("T")[0];
              if (
                createFormattedDate(date) === "Invalid" ||
                createFormattedTime(hourstart) === "Invalid" ||
                createFormattedTime(hourend) === "Invalid"
              ) {
                setLoading(false);
                Alert.alert(
                  TextTranslation.Echec,
                  TextTranslation.valeurValide,
                  [{ text: "OK", onPress: () => console.log("Invalide") }],
                  { cancelable: true }
                );
              } else {
                const req = await axios.post("create_schedule", {
                  jour: [createFormattedDate(date)],
                  First_horaire:
                    createFormattedTime(hourstart) +
                    "-" +
                    createFormattedTime(hourend),
                  totalHour: calculateTimeDifference(hourstart, hourend),
                });
                handleHourEndChange("");
                handleHourStartChange("");
                handleDateChange("");
                Alert.alert(
                 TextTranslation.Succes,
                  TextTranslation.bodySucces,
                  [{ text: "OK", onPress: () => console.log("OK") }],
                  { cancelable: true }
                );
                setLoading(false);
                navigation.goBack();
                console.log(req);
              }
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
          style={styles.button}
        >
        {loading ? <ActivityIndicator size="small" color="white" /> :  <Text style={styles.textButton}>{TextTranslation.Ajouter}</Text>}
         
        </Pressable>
     
    </View>
    </KeyboardAvoidingView>
  );
}
