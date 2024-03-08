import styles from '../styles';
import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, Pressable, Modal, KeyboardAvoidingView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Loader from '../components/loader';

export default function Login() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [email, setMail] = React.useState('');
    const [resetPwdEmail, setPwdEmail] = useState()
    const [pwd, setPwd] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const resetPwd = async () => {
        try {
            setLoading(true);
            const req = await axios.post('password/createNewPassword', {
                email: resetPwdEmail,
                mobile: 1
            })
            console.log('req', req);
            setLoading(false);
            Alert.alert('Réussi', req.data.message, [
                { text: 'OK', onPress: () => setModalVisible(!isModalVisible)}
            ], {cancelable: true})
        } catch (error) {
            Alert.alert('Echec', JSON.stringify(error.response.data.message), [
                {text: 'OK'}
            ], {cancelable: true})
        }
    }
    const Log = async () => {
        try {
            setLoading(true);
            const res = await axios.post('auth_login', {
                email: email, 
                password: pwd
            })
            const token = await AsyncStorage.setItem('token', res.data.access_token)
            res.data.user.details = res.data.compte
            await AsyncStorage.setItem('user', JSON.stringify(res.data.user))
            // Alert.alert('Connecté','',{text: 'OK', onPress: () => console.log('OK')})
            console.log(res.data);
            const offres = []
            res.data.user.offres.forEach(offre => {
                offres.push(offre.id)
            });
            await AsyncStorage.setItem('offres', JSON.stringify(offres));
            setMail('')
            setPwd('')
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            setTimeout(() => {
                // Set loading to false to hide the loader when the task is complete
                setLoading(false);
              }, 3000);
            Alert.alert('Connexion réussie','',[{text: 'OK', onPress: () => console.log('OK')}])
            navigation.navigate('OffresTab')
        } catch (error) {
            Alert.alert(error.message,'',[{text: 'OK', onPress: () => console.log('OK')}])
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
                <Image source={require('../assets/smart_connect.png')} style={{ 
                    width: "80%", 
                    height: "35%", 
                    // margin: "5%" 
                }} 
                />
            <KeyboardAvoidingView 
                style={styles.containerForm}
                behavior={'padding'} 
            >
                <Text style={styles.titleText}>CONNEXION</Text>
                <Pressable style={{
                    margin: 5
                }}></Pressable>
                <TextInput style={styles.textInput} 
                    placeholder='email' 
                    value={email} 
                    onChangeText={text => setMail(text)} 
                />
                <TextInput 
                    style={styles.textInput} 
                    placeholder='password' 
                    value={pwd} 
                    secureTextEntry={true}
                    onChangeText={text => setPwd(text)} 
                />
                <Loader loading={loading} />
                <Pressable style={{
                    margin: 10
                }}></Pressable>
                <Pressable 
                    onPress={Log} 
                    style={styles.Button}
                >
                    <Text style={styles.buttonText}>
                        Se connecter
                    </Text>
                </Pressable>
                <Pressable style={{
                    margin: 2
                }}></Pressable>
                <Pressable style={styles.Button} onPress={() => {
                    //navigation.navigate('Signin')
                    Linking.openURL("http://192.168.1.8:8080/registre")
                }}>
                    <Text style={styles.buttonText}>
                        S'inscrire
                    </Text>
                </Pressable>
                <Modal 
                    visible={isModalVisible}
                    animationType='slide'
                >
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder='Entrez votre mail'
                            value={resetPwdEmail}
                            onChangeText={text => setPwdEmail(text)}
                            style={styles.textInput}
                        />
                        <Loader loading={loading} />
                        <Pressable 
                            onPress={resetPwd} 
                            style={styles.Button}
                        >
                            <Text style={styles.buttonText}>
                                OK
                            </Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {
                                setModalVisible(!isModalVisible)
                            }} 
                            style={styles.Button}
                        >
                            <Text style={styles.buttonText}>
                                Retour
                            </Text>
                        </Pressable>
                    </View>
                </Modal>
                <Pressable onPress={() => {
                    setModalVisible(!isModalVisible)
                }}>
                    <Text style={{
                        fontStyle: 'italic',
                        marginTop: '2%'
                    }}>
                        Mot de passe oublié ?
                    </Text>
                </Pressable>
                <Text style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    position: 'absolute',
                    bottom: 10,
                    width: "100%",
                    textAlign: 'center'
                }}>
                    Smart Connect &copy; 2023
                </Text>
            </KeyboardAvoidingView>
        </View>
    );
}