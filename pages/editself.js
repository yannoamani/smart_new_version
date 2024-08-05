import { View, Text, Platform, Pressable, TextInput, Alert, ScrollView } from "react-native";
import styles from '../pages/styles/editExp';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { createFormattedDate, createFormattedDateExp } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";


export default function EditSelf() {
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
    useEffect(() => {
    }, []);
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
            <Text style={styles.title}>Ajoutez une nouvelle experience </Text>
            <View style={{height:20}}></View>
            <Text style={styles.label}>Poste</Text>
            <View style={{height:2}}></View>
                <TextInput 
                    style={styles.input}
                    placeholder="Poste"
                    value={job}
                    onChangeText={(text) => {setJob(text)}}
                />
               <View style={{height:20}}></View>
            <Text style={styles.label}>Entreprise</Text>
            <View style={{height:2}}></View>
                <TextInput 
                    style={styles.input}
                    placeholder="Entreprise"
                    value={company}
                    onChangeText={(text) => {setCompany(text)}}
                />
                  <View style={{height:20}}></View>
            <Text style={styles.label}>Description</Text>
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
            <Text style={styles.label}>Lieu</Text>
            <View style={{height:2}}></View>
                <TextInput 
                    style={styles.input}
                    placeholder="Lieu"
                    value={place}
                    onChangeText={(text) => {setPlace(text)}}
                />
                 <View style={{height:20}}></View>
            <Text style={styles.label}>Date de début</Text>
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
            <Text style={styles.label}>Date de fin</Text>
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
                    <Text>Ajoutez un document ici </Text>
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
                                    Alert.alert('Warning', 'Entrez des dates valides.', [
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
                                        proof: {
                                            uri: ficher.uri,
                                            type: ficher.type,
                                            name: ficher.name,
                                        }
                                    })
                                    console.log(req.data)
                                    setCompany('')
                                    setExp('')
                                    setJob('')
                                    setPlace('')
                                    handleHourStartChange('')
                                    handleHourEndChange('')
                                    Alert.alert('Succès', 'Expérience ajoutée avec succès.', [
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
                            Ajouter
                        </Text>
                    </Pressable>
                    </ScrollView>
                    
            </View>
        
    )
}