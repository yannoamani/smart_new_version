import styles from '../styles';
import React, { useEffect } from "react";
import { Text, View, Image, TextInput, Pressable, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import Loader from '../components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin() {
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState('');
    const [fname, setfName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setMail] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [city, setCity] = React.useState('');
    const [municipality, setMunicipality] = React.useState('');
    const [hood, setHood] = React.useState('');
    const [degree, setDegree] = React.useState('');
    const [profile, setProfile] = React.useState();
    const [idcard, setId] = React.useState();
    const [fileName, setfileName] = React.useState();
    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: 'image/*', // This will pick only image files
          });
          setId(result.assets[0])
          setfileName(result.assets[0].name)
          console.log(idcard);
        } catch (error) {
          console.log('Error picking document:', error);
        }
      };
    const getProfiles = async () => {
        try {
            const data = await axios.get('see_role')
            console.log(data.data.data);
            //setProfiles(data.data.data)
            //const collection = collect(data.data.data)
            //console.log('pro', profiles);
            const temp = data.data.data.find((profile) => profile.statut == 'etudiant')
            setProfile(temp.id)
            console.log(profile);
        } catch (error) {
            console.log(error);
        }
    }
    const Log = async () => {
        try {
            setLoading(true);
            getProfiles()
            console.log({
                email: email, 
                password: pwd,
                nom: name,
                ville: city,
                commune: municipality,
                quartier: hood,
                mobile: 1,
                diplome: degree,
                statut_id: profile,
                photo: idcard,
                competence: []
            });
            const rep = {
                email: email, 
                password: pwd,
                nom: name,
                prenoms: fname,
                phone: phone,
                ville: city,
                commune: municipality,
                quartier: hood,
                diplome: degree,
                statut_id: profile,
                //mobile: 1,
                photo: {
                    type: idcard.mimeType,
                    uri: idcard.uri,
                    name: idcard.name
                },
                competence: []
            }
            const formData = new FormData()
            // Append fields to the FormData object
            formData.append('email', rep.email);
            formData.append('password', rep.password);
            formData.append('nom', rep.nom);
            formData.append('prenoms', rep.prenoms);
            formData.append('phone', rep.phone);
            formData.append('ville', rep.ville);
            formData.append('commune', rep.commune);
            formData.append('quartier', rep.quartier);
            formData.append('diplome', rep.diplome);
            formData.append('statut_id', rep.statut_id);
            formData.append('competence', rep.competence);
            // Append the photo field as a file
            formData.append('photo', {
            uri: rep.photo.uri,
            type: rep.photo.type,
            name: rep.photo.name,
            });
            const res = await axios.post('list_users', formData)
            console.log(res.data);
            // const req = await axios.post('auth_login', {
            //     email: email, 
            //     password: pwd
            // })
            // console.log(req.data);
            setTimeout(() => {
                // Set loading to false to hide the loader when the task is complete
                setLoading(false);
              }, 1000);
            Alert.alert('Inscription réussie','',[{text: 'OK', onPress: () => console.log('OK')}])
            setCity('')
            setDegree('')
            setHood('')
            setId()
            setMail('')
            setMunicipality('')
            setName('')
            setPhone('')
            setPwd('')
            setfName('')
            navigation.navigate('Auth')
        } catch (error) {
            setTimeout(() => {
                // Set loading to false to hide the loader when the task is complete
                setLoading(false);
              }, 1000);
            Alert.alert(JSON.stringify(error),'',{text: 'OK', onPress: () => console.log('OK')})
            console.log(JSON.stringify(error));
        }
    }
    useEffect(() => {
        getProfiles()
    }, [])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView 
            style={{
                flex: 1,
                paddingHorizontal: "1%",
                paddingTop: '10%',
                backgroundColor: '#87CEEB'
            }}>
                <View style={{
                        alignItems: "center",
                        flex: 1
                    }}>
                    <Text style={styles.titleText}>IDENTITE</Text>
                    <Pressable style={{
                        margin: 5
                    }}></Pressable>
                    <TextInput style={styles.textInput} 
                        placeholder='nom' 
                        value={name} 
                        onChangeText={text => setName(text)} 
                    />
                    <TextInput style={styles.textInput} 
                        placeholder='prenoms' 
                        value={fname} 
                        //keyboardType="email-address"
                        //autoCapitalize="none"
                        onChangeText={text => setfName(text)} 
                    />
                    <TextInput style={styles.textInput} 
                        placeholder='email' 
                        value={email} 
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => setMail(text)} 
                    />
                    <TextInput style={styles.textInput} 
                        placeholder='phone' 
                        value={phone} 
                        keyboardType="numeric"
                        //autoCapitalize="none"
                        onChangeText={text => setPhone(text)} 
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='password' 
                        secureTextEntry={true}
                        value={pwd} 
                        onChangeText={text => setPwd(text)} 
                    />
                    {/* <TextInput style={styles.textInput} 
                        placeholder="Carte d'identité" 
                        value={fileName} 
                        onPressOut={pickDocument}
                    /> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable
                            style={{
                            backgroundColor: '#147efb',
                            padding: 10,
                            borderRadius: 5,
                            marginRight: 10, // Adjust as needed
                            }}
                            onPress={pickDocument}
                        >
                            <Text style={{ color: 'white' }}>Choisir un fichier</Text>
                        </Pressable>
                        <Text numberOfLines={1} ellipsizeMode="tail">
                            {fileName}
                        </Text>
                    </View>
                        <Loader loading={loading} />
                        <Text style={styles.titleText}>LOCALISATION</Text>
                    <Pressable style={{
                        margin: 5
                    }}></Pressable>
                    <TextInput style={styles.textInput} 
                        placeholder='Ville' 
                        value={city} 
                        onChangeText={text => setCity(text)} 
                    />
                    <TextInput style={styles.textInput} 
                        placeholder='Commune' 
                        value={municipality} 
                        onChangeText={text => setMunicipality(text)} 
                    />
                    <TextInput style={styles.textInput} 
                        placeholder='Quartier' 
                        value={hood} 
                        onChangeText={text => setHood(text)} 
                    />
                    <Text style={styles.titleText}>SAVOIR-FAIRE</Text>
                    <Pressable style={{
                        margin: 5
                    }}></Pressable>
                    <TextInput style={styles.textInput} 
                        placeholder='Diplôme' 
                        value={degree} 
                        onChangeText={text => setDegree(text)} 
                    />
                    <Pressable style={{
                        margin: 5
                    }}></Pressable>
                    <Pressable onPress={Log} style={styles.Button}>
                        <Text style={styles.buttonText}>
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}