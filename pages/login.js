import styles from "../styles";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Checkbox, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'






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
  CheckBox,
  StyleSheet,
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
  const [checked, setChecked] = useState(false);
  const [policeBold, setPolices] = useState("Poppins_700Bold");
  const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular");
  const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic");

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
    // navigation.navigate("OffresTab");
    setLoading(true);

    try {
      const res = await axios.post("auth_login", {
        email: "z@gmail.com",
        //  email,
        password: "0812",
        //  pwd,
      });
      if (res.status==200) {
        setLoading(false);
        
        const token = await AsyncStorage.setItem("token", res.data.access_token);
      res.data.user.details = res.data.compte;
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      navigation.navigate("OffresTab");
      // Alert.alert('Connecté','',{text: 'OK', onPress: () => console.log('OK')})
      console.log(res.data);
      const offres = [];
      // res.data.user.offres.forEach((offre) => {
      //   offres.push(offre.id);
      // });
      const abonne=res.data.user.user.abonement;
   if (abonne) {

      abonne.forEach(async (offre) => {
        if (offre.statut=='ACCEPTED') {
          console.log("Objet de abonnement ",offre);
          await AsyncStorage.setItem('abonnement', JSON.stringify(offre));
          
        }
      });
    
   }
      console.log("je suis abonne", abonne)
      await AsyncStorage.setItem("offres", JSON.stringify(offres));      setLoading(false);
      setMail("");
      setPwd("");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      // setTimeout(() => {
      //   // Set loading to false to hide the loader when the task is complete
       
      // }, 3000);
      Alert.alert("Connexion réussie", "", [
        { text: "OK", onPress: () => console.log("OK") },
      ]);
     
        
      }
      
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
    <View style={style.container}>
      <ScrollView >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
          {/* <ScrollView style={style1.scrollView} > */}

          <View style={style.containerPicture}>
            <Image
              source={require("../assets/connexion.png")}
              style={{
                width: "100%",
                height: "100%",

                // margin: "5%"
              }}
            />
          </View>

          <View style={{ height: 250 }}></View>
          <View style={style.form}>
            <Text style={[style.title, { fontFamily: policeBold }]}>CONNEXION</Text>

            <Text style={[style.labelText, { fontFamily: policeRegular }]}> Email</Text>
            <View style={{ height: "1%" }}></View>

            <View style={style.inputCustom}>
              <TextInput
                style={{ width: "100%" }}
                placeholder="William@gmail.com..."
                placeholderTextColor={"#0000004D"}
                value={email}
                onChangeText={(text) => setMail(text)}
              />
            </View>
            <View style={{ height: 30 }}></View>
            <Text style={[style.labelText, { fontFamily: policeRegular }]}>Mot de passe</Text>
            <View style={{ height: "1%" }}></View>

            <View style={style.inputCustom}>
              <TextInput
                style={{ width: "100%" }}
                secureTextEntry={!isPwdModalVisible}
                placeholder="Mot de passe..."
                placeholderTextColor={"#0000004D"}
                value={pwd}
                onChangeText={(text) => setPwd(text)}
              />
              <Pressable
                onPress={toggleModal}
                style={{ position: "absolute", right: 12, top: 10 }}
              >
                <Ionicons
                  name={isPwdModalVisible ? "eye-off" : "eye"}
                  size={24}
                ></Ionicons>
              </Pressable>
            </View>
            <View style={{ height: 10 }}></View>
            <View style={style.afterinput}>
              <View style={style.row}>
                <Pressable
                  onPress={() => {
                    setChecked(!checked);
                    console.log(checked);
                  }}
                >
                  <View style={style.check}>
                    {checked ? (
                      <Ionicons name="checkmark" color="#1A9E47" />
                    ) : null}
                  </View>
                </Pressable>
          
                
                <Text style={[style.checkText, { fontFamily: policeRegular }]}>Se souvenir de moi</Text>
              </View>

              <Pressable
                onPress={() => {
                  setModalVisible(!isModalVisible);
                }}
              >
                <Text style={[style.checkText, { fontFamily: policeRegular }]}>Mot de passe oublié ?</Text>
              </Pressable>
            </View>

            <Loader loading={loading} />
            <View style={{ height: 30 }}></View>
            <Pressable style={style.button} onPress={validation}>
              <Text style={[style.textbutton, { fontFamily: policeRegular }]}>Se connecter</Text>
            </Pressable>


            <View style={{ height: 40 }}></View>
            
          
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                //   backgroundColor: "red",
                //
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "black" }}
              ></View>
              <Text style={[style.connectwith, { fontFamily: policeRegular }]}>ou connectez-vous avec </Text>
              <View
                style={{ height: 1, backgroundColor: "black", flex: 1 }}
              ></View>
            </View> */}
{/* 
            <View style={{ height: 20 }}></View>
            <View style={style.connectCard}>
              <View style={style.cards}>
                <Ionicons
                  name="logo-facebook"
                  size={24}
                  color="#4267B2"
                ></Ionicons>
                <Text style={[style.cardText, { fontFamily: policeRegular }]}>Facebook</Text>
              </View>
              <View style={style.cards}>
              <MaterialCommunityIcons name="google" size={24}   />
                <Text style={[style.cardText, { fontFamily: policeRegular }]}>Google</Text>
              </View>
            </View> */}
            <View style={{ height: 110 }}></View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={[style.noaccont, { fontFamily: policeRegular }]}>
                Vous n'avez pas de compte ?
                <Text onPress={() => navigation.navigate("Signin")}>
                  {" "}
                  <Text style={[style.link, { fontFamily: policeBold }]}>S'inscrire</Text>
                </Text>{" "}
              </Text>
            </View>

            {/* 
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
</Pressable> */}
            <Modal visible={isModalVisible} animationType="slide">
              <View style={{ flex: 1, backgroundColor: "#F1F2F4" }}>
                <View style={style.header}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    onPress={() => setModalVisible(!isModalVisible)}
                    color="white"
                    style={style.back}
                  ></Ionicons>
                </View>
                <ScrollView>
                  <View style={style.conatainerReset}>
                    <Text style={style.titlereset}>Mot de passe oublié</Text>

                    <View style={{ height: 20 }}></View>
                    <Text style={style.subTitleReset}>
                      Saisissez l'adresse électronique associée à votre compte
                      et nous vous enverrons par courrier électronique des
                      instructions pour réinitialiser votre mot de passe.
                    </Text>

                    <View style={{ height: 40 }}></View>
                    <Text style={style.labelText}>Email</Text>
                    <View style={{ height: 5 }}></View>
                    <TextInput
                      placeholder="exam@gmail.com"
                      placeholderTextColor={"grey"}
                      value={resetPwdEmail}
                      onChangeText={(text) => setPwdEmail(text)}
                      style={style.inputCustom}
                    />
                    <Loader loading={loading} />
                    <View style={{ height: 450 }}></View>
                    <Pressable
                      onPress={validationPassword}
                      style={style.button}
                    >
                      <Text style={style.textbutton}>Continuer</Text>
                    </Pressable>
                    <View style={{ height: 20 }}></View>
                  </View>
                </ScrollView>
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F1F2F4",
  },
  containerPicture: {
    height: 300,
    width: 250,
    position: "absolute",
  },
  form: {
    padding: 10,
  },
  title: {
    color: "black",
    fontSize: 38,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },
  labelText: {
    color: "black",
    fontSize: 14,
    fontWeight: "500",
    color: "black",
    flexDirection: "column",
    textAlign: "left",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  inputCustom: {
    borderColor: "#F38B2B",
    borderWidth: 1,
    borderRadius: 10,
    borderLeftColor: "#F38B2B",
    borderRightColor: "#1A9E47",
    //  borderBlockEndColor: '#1A9E47',
    //  borderBlockStartColor: '#F38B2B',
    borderRightColor: "#1A9E47",
    borderLeftColor: "#1A9E47",
    paddingLeft: 20,
    padding: 10,
    height: 40,
  },
  afterinput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  check: {
    height: 15,
    width: 15,
    borderColor: "#F38B2B",
    borderWidth: 1,
    marginRight: 5,
  },
  checkText: {
    fontSize: 10,
    color: "#0000004D",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#F38B2B",
    width: "100%",
    elevation: 5,
    borderRadius: 10,

    height: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    elevation: 10,
  },
  textbutton: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  connectwith: {
    color: "#000000",
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "500",
  },
  connectCard: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  cards: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#0000004D",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 30,
  },
  cardText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "400",
    marginLeft: 5,
  },
  noaccont: {
    color: "#000000",

    fontWeight: "500",
  },
  link: {
    color: "#F38B2B",
    fontWeight: "500",
  },
  conatainerReset: {
    flex: 1,
    padding: 20,
  },
  header: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F38B2B",
    position: "relative",
  },
  back: {
    position: "absolute",
    left: 10,
    bottom: 20,
  },
  titlereset: {
    color: "#000000",
    textAlign: "center",
    fontSize: 36,
    fontWeight: "700",
  },
  subTitleReset: {
    color: "#000000",
    textAlign: "justify",
    fontSize: 14,
    fontWeight: "500",
  },
});
