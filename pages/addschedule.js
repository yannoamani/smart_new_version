import { View, Text, ScrollView, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import styles from '../styles';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { createFormattedDate, createFormattedTime, calculateTimeDifference } from "../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddSchedule() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideshowDatePicker = () => {
    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
    } else {
      setDatePickerVisibility(true);
    }
  };
  const [start, handleDateChange] = useState('Date');
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
  const [hourstart, handleHourStartChange] = useState('Heure de Début');
  const [hourend, handleHourEndChange] = useState('Heure de Fin');
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

    const navigation = useNavigation()
    useEffect(() => {
    }, []);
    return (
        <View 
            style={styles.containerOffer}
        >
            <KeyboardAvoidingView 
                style={{
                    alignItems: "center",
                    flex: 1
                }}
                behavior={'height'}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="__:__"
                    value={hourstart}
                    keyboardType="numeric"
                    onPressOut={() => {
                      setTimer(true)
                      hideshowTimePicker()
                    }}
                    onChangeText={handleTimeConfirm}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="__:__"
                    value={hourend}
                    keyboardType="numeric"
                    onPressOut={() => {
                      setTimer(false)
                      hideshowTimePicker()
                    }}
                    onChangeText={handleTimeConfirm}
                />
                <TextInput
                    style={styles.textInput}
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
                    <Pressable 
                        onPress={async () => {
                            try {
                               const date = start.split('T')[0]
                                if (createFormattedDate(date) === 'Invalid' || createFormattedTime(hourstart) === 'Invalid' || createFormattedTime(hourend) === 'Invalid') {
                                    Alert.alert('Warning', 'Entrez des valeurs valides.', [
                                        { text: 'OK', onPress: () => console.log('Invalide') }
                                      ],
                                      { cancelable: true })
                                } else {
                                    const req = await axios.post('create_schedule', {
                                      jour: [createFormattedDate(date)],
                                      First_horaire: createFormattedTime(hourstart)+"-"+createFormattedTime(hourend),
                                      totalHour: calculateTimeDifference(hourstart, hourend),
                                    })
                                    handleHourEndChange('')
                                    handleHourStartChange('')
                                    handleDateChange('')
                                    Alert.alert('Succès', 'Plage horaire ajoutée avec succès.', [
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
            </KeyboardAvoidingView>
        </View>
    )
}