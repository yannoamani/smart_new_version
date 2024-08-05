import styles from "../styles";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  Image,
  TextInput,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Loader from "../components/loader";
import { SafeAreaView } from "react-native-safe-area-context";
import style1 from "../modification_design";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setMail] = React.useState("");
  const [resetPwdEmail, setPwdEmail] = useState("");
  const [pwd, setPwd] = React.useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPwdModalVisible, setPwdModalVisible] = useState(false);

  const toggleModal = () => {
    setPwdModalVisible(!isPwdModalVisible);
  };
  const validation = () => {
    if (email != "") {
      Alert.alert("Veuillez renseigner votre email");
    } else if (pwd != "") {
      Alert.alert("Veuillez renseigner votre mot de passe");
    } else {
      Log();
    }
  };

  const resetPwd = async () => {
    try {
      setLoading(true);
      const req = await axios.post("password/createNewPassword", {
        email: resetPwdEmail,
        mobile: 1,
      });
      console.log("req", req);
      setLoading(false);
      Alert.alert(
        "Réussi",
        req.data.message,
        [{ text: "OK", onPress: () => setModalVisible(!isModalVisible) }],
        { cancelable: true }
      );
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Echec",
        JSON.stringify(error.response.data.message),
        [{ text: "OK" }],
        { cancelable: true }
      );
    }
  };

  const Log = async () => {
    setLoading(true);

    try {
      const res = await axios.post("auth_login", {
        email:'z@gmail.com',
        //  email,
        password:'0812'
        //  pwd,
      });
      const token = await AsyncStorage.setItem("token", res.data.access_token);
      res.data.user.details = res.data.compte;
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      // Alert.alert('Connecté','',{text: 'OK', onPress: () => console.log('OK')})
      console.log(res.data);
      const offres = [];
      res.data.user.offres.forEach((offre) => {
        offres.push(offre.id);
      });
      await AsyncStorage.setItem("offres", JSON.stringify(offres));
      setLoading(false);
      setMail("");
      setPwd("");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      setTimeout(() => {
        // Set loading to false to hide the loader when the task is complete
        setLoading(false);
      }, 3000);
      Alert.alert("Connexion réussie", "", [
        { text: "OK", onPress: () => console.log("OK") },
      ]);
      navigation.navigate("OffresTab");
    } catch (error) {
      Alert.alert(JSON.stringify(error.response.data.message), "", [
        { text: "OK", onPress: () => console.log("OK") },
      ]);
      console.log(error);
      setLoading(false);
    }
  };
  const validationPassword = () => {
    console.log(resetPwdEmail);
    if (resetPwdEmail == "") {
      Alert.alert("Veuillez renseigner votre email");
    } else {
      resetPwd();
    }
  };

  return (
    <SafeAreaView style={style1.safeArea}>
      <View style={style1.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
          {/* <ScrollView style={style1.scrollView} > */}

          <View style={style1.containerPicture}>
            <Image
              source={require("../assets/smart_connect.png")}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
                // margin: "5%"
              }}
            />
          </View>

          <Text style={style1.customText}>CONNEXION</Text>
          <View style={{ height: "2%" }}></View>

          <Text style={style1.customText2}>
            Bienvenue sur smart connect inscrivez vous et connectez-vous
          </Text>
          <View style={{ height: "5%" }}></View>
          <Text style={style1.labelText}> Adresse email</Text>
          <View style={{ height: "1%" }}></View>

          <View style={style1.inputCustom}>
            <TextInput
              style={{ width: "100%" }}
              placeholder="example@gmail.com..."
              placeholderTextColor={"grey"}
              value={email}
              onChangeText={(text) => setMail(text)}
            />
          </View>
          <View style={{ height: "4%" }}></View>
          <Text style={style1.labelText}>Mot de passe</Text>
          <View style={{ height: "1%" }}></View>

          <View style={style1.inputCustom}>
            <TextInput
              style={{ width: "100%" }}
              secureTextEntry={isPwdModalVisible}
              placeholder="(-è_çà)zerty"
              placeholderTextColor={"grey"}
              value={pwd}
              onChangeText={(text) => setPwd(text)}
            />
            <Pressable
              onPress={toggleModal}
              style={{ position: "absolute", right: 12, top: 15 }}
            >
              <Ionicons
                name={isPwdModalVisible ? "eye-off" : "eye"}
                size={24}
              ></Ionicons>
            </Pressable>
          </View>

          <Pressable
          style={{
              alignItems: 'flex-end',
          }}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}
          >
           <View style={{ height: '1%' }}></View>
            <Text
            style={{
                fontStyle: 'italic',
                marginTop: '2%',
                textDecorationLine: 'underline',
                color: 'grey',
                fontSize: 15,
                fontWeight: 'bold'
            }}
            >
              Mot de passe oublié ?
            </Text>
          </Pressable>

          <Loader loading={loading} />
          <Pressable
            style={{
              margin: 10,
            }}
            onPress={validation}
          ></Pressable>
          <View style={{ height: 10 }}></View>

          {Platform.OS == "ios" ? (
            <View>
              <Pressable style={style1.customButon} onPress={validation}>
                <Text style={style1.textCustomButton}>Se connecter</Text>
              </Pressable>
            </View>
          ) : (
            <Button
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          )}
          <View style={{ height: 10 }}></View>
          <View style={{ flexDirection: "row", 
          alignItems: "center",
          
        //   backgroundColor: "red",
        //   
          }}>


          <View style={{ flex:1, height:1, backgroundColor: "black", }}></View>
          <Text style={{ margin: 5 }}>ou </Text>
          <View style={{ height:1, backgroundColor: "black", flex:1,  }}></View>
          </View>

          


          <Pressable
            style={{
              margin: 2,
            }}
          ></Pressable>
          <Pressable
            style={style1.customButonInscription}
            onPress={() => {
              navigation.navigate("Signin");
              // Linking.openURL("http://192.168.1.8:8080/registre")
            }}
          >
            <Text
             style={style1.textCustomButton}
            >
              S'inscrire
            </Text>
          </Pressable>
          <Modal visible={isModalVisible} animationType="slide">
          {/* <SafeAreaView style={{flex:1 }}> */}
          <SafeAreaView style={{flex:1 , paddingTop: 30}}>

            <View style={style1.modalVIew}>
           <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={style1.modalText}>
               Renitialiser 
              </Text>
              <Pressable
                onPress={() => {
                  setModalVisible(!isModalVisible);
                }}
                // style={styles.Button}
              >
              <Ionicons
                name={ "close-circle-outline"}
                color={'red'}
                size={24}
              ></Ionicons>
              </Pressable>
              </View>
              <View style={{ height: 20 }}></View>
              <Text style={style1.modalText2}>Veuillez renseigner l'email associé à votre compte et vérifier votre boîte de réception pour recevoir votre nouveau mot de passe.</Text>
          
             
              <View style={{ height: '2%' }}></View>
              <Text style={style1.labelText}>Adresse email</Text>
              <View style={{ height: 5 }}></View>
              <TextInput
                placeholder="exam@gmail.com"
                placeholderTextColor={"grey"}
                value={resetPwdEmail}
                onChangeText={(text) => setPwdEmail(text)}
                style={style1.inputCustom}
              />
              <Loader loading={loading} />
              <View style={{ height: '3%' }}></View>
              <Pressable onPress={validationPassword} style={style1.customButon}>
                <Text style={style1.textCustomButton}>Renitialiser</Text>
              </Pressable>
              <View style={{ height: '2%' }}></View>
              {/* <Pressable
                onPress={() => {
                  setModalVisible(!isModalVisible);
                }}
                style={styles.Button}
              >
                <Text style={styles.buttonText}>Retour</Text>
              </Pressable> */}
            </View>
            </SafeAreaView>
          </Modal>
         
          {/* <Text style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    position: 'absolute',
                    bottom: 10,
                    width: "100%",
                    textAlign: 'center'
                }}>
                    Smart Connect &copy; 2023
                </Text> */}
        </KeyboardAvoidingView>

        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}
