import { View, Text, Platform, Pressable, TextInput, Alert, ScrollView } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createFormattedDateExp } from "../Utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function EditExp({route}) {
    const { expR } = route.params || {};
    const navigation = useNavigation()
    // Check if expR is defined before accessing its properties
    const [job, setJob] = useState(expR ? expR.poste : "");
    const [place, setPlace] = useState(expR ? expR.lieu : "");
    const [exp, setExp] = useState(expR ? expR.experience : "");
    const [company, setCompany] = useState(expR ? expR.entreprise : "");
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
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
        //console.log('expR : ', expR);
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
                //behavior={'height'}
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
                    onChangeText={handleTimeConfirm} // MM/DD/YYYY has 10 characters
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
                    onChangeText={handleTimeConfirm} // MM/DD/YYYY has 10 characters
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
                                        entreprise: company
                                    })
                                    setCompany('')
                                    setExp('')
                                    setJob('')
                                    setPlace('')
                                    handleHourStartChange('')
                                    handleHourEndChange('')
                                    Alert.alert('Succès', 'Expérience modifiée avec succès.', [
                                        { text: 'OK', onPress: () => console.log('OK') }
                                      ],
                                      { cancelable: true })
                                    navigation.navigate('Profile')
                                    console.log(req);
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