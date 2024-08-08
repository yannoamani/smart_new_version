import styles from "../styles";
import style1 from "../modification_design";
import React, { useEffect } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import {
  Text,
  View,
  
  SafeAreaView,
  TextInput,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
  ,

  ScrollView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import Loader from "../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signin() {

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [fname, setfName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setMail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [city, setCity] = React.useState("");
  const [municipality, setMunicipality] = React.useState("");
  const [hood, setHood] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [profile, setProfile] = React.useState();
  const [idcard, setId] = React.useState();
  const [fileName, setfileName] = React.useState();
  const [visibility, setVisibility] = React.useState(true);
  const[url, setUrl] = React.useState();
  
  const navigation = useNavigation();
  const visible = () => {
    return setVisibility(!visibility);
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // This will pick only image files
      });
      setId(result.assets[0]);
      setfileName(result.assets[0].name);
      setUrl(result.assets[0].uri);
      console.log(idcard);
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };
  const data = [
    { label: 'CEPE', value: '1' },
    { label: 'BEPC', value: '2' },
    { label: 'BAC', value: '3' },
    { label: 'BAC+1', value: '4' },
    { label: 'BAC+2', value: '5' },
    { label: 'LICENCE', value: '6' },
    { label: 'MASTER 1', value: '7' },
    { label: 'MASTER2', value: '8' },
  ];
  const validationForm = () => {
    if (
      !name ||
      !fname ||
      !phone ||
      !email ||
      !pwd ||
      !city ||
      !municipality ||
      !hood ||
      !degree ||
      !idcard
    ) {
      Alert.alert("Veuillez renseigner tous les champs");
    } else {
      Log();
    }
  };
  const getProfiles = async () => {
    try {
      const data = await axios.get("see_role");
      console.log(data.data.data);
      //setProfiles(data.data.data)
      //const collection = collect(data.data.data)
      //console.log('pro', profiles);
      const temp = data.data.data.find(
        (profile) => profile.statut == "etudiant"
      );
      setProfile(temp.id);
      console.log(profile);
    } catch (error) {
      console.log(error);
    }
  };
  const Log = async () => {
    try {
      setLoading(true);
      getProfiles();
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
        competence: [],
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
          name: idcard.name,
        },
        competence: [],
      };
      const formData = new FormData();
      // Append fields to the FormData object
      formData.append("email", rep.email);
      formData.append("password", rep.password);
      formData.append("nom", rep.nom);
      formData.append("prenoms", rep.prenoms);
      formData.append("phone", rep.phone);
      formData.append("ville", rep.ville);
      formData.append("commune", rep.commune);
      formData.append("quartier", rep.quartier);
      formData.append("diplome", rep.diplome);
      formData.append("statut_id", rep.statut_id);
      formData.append("competence", rep.competence);
      // Append the photo field as a file
      formData.append("photo", {
        uri: rep.photo.uri,
        type: rep.photo.type,
        name: rep.photo.name,
      });
      const res = await axios.post("list_users", formData);
      console.log(res.data);
      navigation.goBack();
      // const req = await axios.post('auth_login', {
      //     email: email,
      //     password: pwd
      // })
      // console.log(req.data);
      setTimeout(() => {
        // Set loading to false to hide the loader when the task is complete
        setLoading(false);
      }, 1000);
      Alert.alert("Inscription réussie", "", [
        { text: "OK", onPress: () => console.log("OK") },
      ]);
      setCity("");
      setDegree("");
      setHood("");
      setId();
      setMail("");
      setMunicipality("");
      setName("");
      setPhone("");
      setPwd("");
      setfName("");
      navigation.navigate("Auth");
    } catch (error) {
      setTimeout(() => {
        // Set loading to false to hide the loader when the task is complete
        setLoading(false);
      }, 1000);
      Alert.alert("", "", {
        text: "OK",
        onPress: () => console.log("OK"),
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getProfiles();
  }, []);
  return (
   
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F1F2F4" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={style1.headerInscription}>
              Bienvenue sur Smart Connect
            </Text>
            <View style={{ height: 5 }}></View>
            <Text style={style1.labelText}>
              ! Inscrivez-vous en renseignant les champs nécessaires
            </Text>
            <View style={{ height: 20 }}></View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 36,
                autoCapitalize: "none",
              }}
            >
                 IDENTIFIANT
            </Text>
            <View style={{ height: 10 }}></View>

            <Text style={style1.labelText}>Nom</Text>
            <View style={{ height: 2 }}></View>
            <Loader loading={loading} />
            <TextInput
              style={style1.inputCustom}
              placeholder="koffi ..."
              placeholderTextColor="gray"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <View style={{ height: 20 }}></View>
            <Text style={style1.labelText}>Prenom</Text>
            <View style={{ height: 2 }}></View>
            <TextInput
              style={style1.inputCustom}
              placeholder="Kouame nguessan coul"
              placeholderTextColor={"gray"}
              value={fname}
              //keyboardType="email-address"
              //autoCapitalize="none"
              onChangeText={(text) => setfName(text)}
            />
            <View style={{ height: 20 }}></View>
            <Text style={style1.labelText}>Phone</Text>
            <View style={{ height: 2 }}></View>
            <TextInput
              style={style1.inputCustom}
              placeholder="+225 02030404948"
              placeholderTextColor={"gray"}
              value={phone}
              keyboardType="numeric"
              //autoCapitalize="none"
              onChangeText={(text) => setPhone(text)}
            />

            <View style={{ height: 20 }}></View>
            <Text style={style1.labelText}>Email</Text>
            <View style={{ height: 2 }}></View>
            <TextInput
              style={style1.inputCustom}
              placeholderTextColor={"gray"}
              placeholder="email@gmail.com"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setMail(text)}
            />
            <View style={{ height: 20 }}></View>
            <Text style={style1.labelText}>Mot de passe</Text>
            <View style={{ height: 2 }}></View>
            <View
              style={{
                flexDirection: "row",
                alignContent: "space-between",
                justifyContent: "space-between",
                height: 40,
                borderColor:'#F38B2B',
                borderWidth: 1,
                borderRadius: 10,
                borderLeftColor: '#F38B2B',
                borderRightColor: '#1A9E47',
                
                borderRightColor: '#1A9E47',
                borderLeftColor: '#1A9E47',
              }}
            >
              <TextInput
                style={{ flex: 1, left: 10 }}
                placeholder="@1233YourName"
                placeholderTextColor={"gray"}
                secureTextEntry={visibility}
                value={pwd}
                onChangeText={(text) => setPwd(text)}
              />
              <View style={{ margin: 5 }}>
                <Pressable onPress={visible}>
                  <Ionicons
                    name={visibility ? "eye" : "eye-off"}
                    size={24}
                  ></Ionicons>
                </Pressable>
              </View>
            </View>

            <View style={{ height: 20 }}></View>
            <Text  style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 36,
                autoCapitalize: "none",
              }}>HABITATION</Text>
            
            
            
            <View style={{ height: 20 }}></View>
            <Text style={style1.labelText}>Ville</Text>
            <View style={{ height: 2 }}></View>
            <TextInput
              style={style1.inputCustom}
              placeholder="Abidjan..."
              placeholderTextColor={"gray"}
              value={city}
              onChangeText={(text) => setCity(text)}
            />
             <View style={{ height: 20 }}></View>
            <Text style={style1.labelText}>Commune </Text>
            <View style={{ height: 2 }}></View>
            <TextInput
              style={style1.inputCustom}
              placeholder="Abobo..."
              placeholderTextColor={"gray"}
              value={municipality}
              onChangeText={(text) => setMunicipality(text)}
            />
              <View style={{ height: 20 }}></View>
            <Text style={style1.labelText}>Quartier </Text>
            <View style={{ height: 2 }}></View>
            <TextInput
              style={style1.inputCustom}
              placeholder="Quartier"
              placeholderTextColor={"gray"}
              value={hood}
              onChangeText={(text) => setHood(text)}
            />
            <View style={{ height: 20 }}></View>
            <Text style={styles.titleText}>SAVOIR-FAIRE</Text>
            
            <View style={{ height: 20 }}></View>
         
             <Text style={style1.labelText}>Diplôme </Text>
             <View style={{ height: 2 }}></View>
             <View  >
                <Dropdown 
                 style={style1.dropdown}
                 search
                 placeholder="Diplome"
                 placeholderStyle={style1.placeholderStyle}
                 selectedTextStyle={style1.selectedTextStyle}
                 inputSearchStyle={style1.inputSearchStyle}
                 iconStyle={style1.iconStyle}
                 value={degree}
                 valueField={"label"}

                data={data}
                maxHeight={300}
                onChange={item => {
          setDegree(item.label);
          
          
        }}
                labelField={"label"}
                 ></Dropdown>
             </View>
            {/* <TextInput
              style={style1.inputCustom}

              placeholderTextColor={'gray'}
              placeholder="Diplôme"
              value={degree}
              onChangeText={(text) => setDegree(text)}
            /> */}
           
           <View style={{ height: 20 }}></View>
           <Pressable onPress={pickDocument}>
            <View style={{ height: 200, width: "100%",
             borderColor: "gray", borderLeftColor: '#F38B2B',
   borderRightColor: '#1A9E47',
   borderRightColor: '#1A9E47',
   borderLeftColor: '#1A9E47',borderColor:'#F38B2B',
   borderWidth:1, borderWidth: 1 , alignItems:"center",justifyContent:"center" , borderRadius: 10, padding: 10}}>
            <Ionicons name="download-outline" size={50} color="#F38B2B"></Ionicons>
            <View style={{ height: 20 }}></View>
            <Text>Cliquez pour ajouter votre piece</Text>
            <View style={{ height: 10 }}></View>
            {
                idcard ? (<View>
                    <Text numberOfLines={1} ellipsizeMode="tail">
               {fileName + JSON.stringify(idcard.uri)}
               </Text>
               <View style={{  justifyContent: "center",alignItems:"center" }}>
               <Image
               style={{  height: 50, width: 40, borderRadius: 10 ,borderColor:"gray",borderWidth:1,resizeMode:'cover'}}
               source={{uri:url}}
               
               ></Image>
               </View>
                </View>) : null
            }
      
    

            </View>
           </Pressable>
           <View  style={{ height: 30 }}></View>
          <Pressable onPress={validationForm}>
          <View style={style1.customButon}>
            <Text style={style1.textCustomButton}>S'inscrire</Text>
           </View>
          </Pressable>
          <View style={{ height: 30 }}></View>
          <Text style={{textAlign:"center"}}>Vous avez deja un compte ? <Text style={{color:"#F38B2B", fontWeight:"700"}} onPress={() => navigation.navigate('Login')}>Connectez-vous</Text></Text>

          
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
