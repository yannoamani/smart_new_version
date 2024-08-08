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

export default function EditExp({route}) {
    const { expR } = route.params || {};
    const navigation = useNavigation()
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
        <Text style={experienceStyle.title}>Modifier votre experience</Text>
            <View 
                style={{
                    // alignItems: "center",
                    flex: 1
                }}
                //behavior={'height'}
                >
                <View style={{height:20}}></View>
                <Text style={experienceStyle.label}>Poste </Text>
                <View style={{height:5}}></View>
                <TextInput 
                    style={experienceStyle.input}
                    placeholder="Ajoutez un poste ici"
                    value={job}
                    onChangeText={(text) => {setJob(text)}}
                />
                <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>Entreprise </Text>
                <View style={{height:5}}></View>
                <TextInput 
                    style={experienceStyle.input}
                    placeholder="Ajoutez l'entreprise ici "
                    value={company}
                    onChangeText={(text) => {setCompany(text)}}
                />
                
                 <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>Lieu</Text>
                 <View style={{height:5}}></View>
                <TextInput 
                    style={experienceStyle.input}
                    placeholder="Lieu"
                    value={place}
                    onChangeText={(text) => {setPlace(text)}}
                />
                  <View style={{height:20}}></View>
                 <Text style={experienceStyle.label}>Date de debut</Text>
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
                 <Text style={experienceStyle.label}>Date de fin </Text>
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
                 <Text style={experienceStyle.label}>Description </Text>
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
                                    Alert.alert('Succès', 'Expérience modifiée avec succès.', [
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
                            loading ?<ActivityIndicator size="large" color={'white'}/> : 'Modifier'
                           }
                        </Text>
                    </Pressable>
            </View>
        </ScrollView>
        </View>
        </KeyboardAvoidingView>
    )
}