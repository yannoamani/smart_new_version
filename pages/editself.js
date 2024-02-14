import { View, Text, Platform, Pressable, TextInput, Alert, ScrollView } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { createFormattedDate, createFormattedDateExp } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditSelf() {
    const [data, setData] = useState();
    const [job, setJob] = Platform.OS == 'ios' ? useState('Poste') : useState();
    const [place, setPlace] = Platform.OS == 'ios' ? useState('Localisation') : useState();
    const [exp, setExp] = Platform.OS == 'ios' ? useState('Description') : useState();
    const [company, setCompany] = Platform.OS == 'ios' ? useState('Entreprise') : useState();
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
    useEffect(() => {
    }, []);
    return (
        <ScrollView 
            style={styles.containerOffer}
        >
            <View 
                style={{
                    alignItems: "center",
                    flex: 1
                }}
                // behavior={'padding'}
                >
                <TextInput 
                    style={styles.textInput}
                    placeholder="Poste"
                    value={job}
                    onChangeText={(text) => {setJob(text)}}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Entreprise"
                    value={company}
                    onChangeText={(text) => {setCompany(text)}}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Description"
                    multiline={true}
                    //numberOfLines={4}
                    value={exp}
                    onChangeText={setExp}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Lieu"
                    value={place}
                    onChangeText={(text) => {setPlace(text)}}
                />
                <TextInput
                    style={styles.textInput}
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
                <TextInput
                    style={styles.textInput}
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
                                        entreprise: company
                                    })
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
                        style={styles.Button}
                    >
                        <Text style={styles.buttonText}>
                            OK
                        </Text>
                    </Pressable>
            </View>
        </ScrollView>
    )
}