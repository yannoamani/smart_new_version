// App.js
import React, { useState,useEffect } from 'react';
import Login from './pages/login';
import Signin from './pages/signin';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"
import OffersList from './pages/offres';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link, NavigationContainer, useNavigation } from "@react-navigation/native";
import { Image,Pressable,Text } from 'react-native';
import Profile from './pages/profil';
import Offer from './pages/offer';
import Appliance from './pages/appliance';
import Contact from './pages/contact';  
import Contacts from './pages/contacts';
import AppliancesList from './pages/appliances';
import EditSelf from './pages/editself';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditExp from './pages/editexp';
import AddSchedule from './pages/addschedule';
import EditSchedule from './pages/editschedule';
import Schedules from './pages/schedules';
import Skills from './pages/competences';
import Abonnement from './pages/abonnement';
import OnboardingPage from './pages/onboarding_page';
import SplahScreen from './pages/splah_screen';
import AcceuilAbonnement from './acceuilAbonnement';
import MyAbonnement from './pages/myabonnement';
import Favories from './pages/favories';
import StepOne from './pages/steppers/StepOne';
import { useFonts, Poppins_900Black, Poppins_400Regular, Poppins_700Bold, Poppins_300Light_Italic } from '@expo-google-fonts/poppins';
import StepTwo from './pages/steppers/StepTwo';
import StepThree from './pages/steppers/stepThree';
import cinetpay from './pages/cinetpay';
import Cinetpay from './pages/cinetpay';
import { CinetPay } from 'node-cinetpay';
import Cinetpays from './pages/cinetpay';
import { displayDate, displayDates, isDateTimeGreaterThanCurrent, isTimeGreaterThanCurrent } from "./Utils";
import { useTranslation } from 'react-i18next';
import Translate from './pages/Translate';
import {Provider, useSelector} from "react-redux";
import store from './pages/store';
import translateText from "./pages/store/TranslationUtils"



export default function App() {
 
  
  const {t}=useTranslation();
   axios.defaults.baseURL = 
//    'http://192.168.1.9:8000/api/';
   "http://back-smart-connect.lce-ci.com/api/";
  const setAuthorizationHeader = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

  
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return token;
      } else {
        const token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Handle AsyncStorage or other errors
      console.error('Error setting Authorization header:', error);
    }
  };
  const token = setAuthorizationHeader();
  const [final, setFinal] = useState()
  const verifierabonement = async () => {
    try {
      // data;
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      const res = await axios.get("handleAbonnementExpired");
      setData(res.data.data);
    //  console.log('verification de mon paiement',res.data);
    } catch (error) {
      console.log(error);
      //  console.log("verifier paiement",error.response.data.message);
     
    }
    
  }
  const getAlarmNumber = async () => {
    try {
        const res = await axios.get('get_who_contact_student');
        let cpt = 0
        res.data.entreprises.forEach(entreprise => {
          if (entreprise.pivot.alarm == 1) {
            cpt++
          }
        });
        setFinal(cpt)
        console.log('compte',cpt,res.data.entreprises)
    } catch (error) {
        return null;
    }
  };
  const intervalId = setInterval(getAlarmNumber, 60000);
  const alarm_number = final;
  const OfferStack = createNativeStackNavigator();
  const ContactsStack = createNativeStackNavigator();
  const AuthStack = createNativeStackNavigator();
  const ApplianceStack = createNativeStackNavigator();
  const ProfileStack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  useEffect(() => {
    getAlarmNumber();
    const interval= setInterval(async () => {
      const abonement = await AsyncStorage.getItem('abonnement');
        // console.log("abonnement",abonement);
   if (abonement) {
    const mabonnement = JSON.parse(abonement);
    // console.log("abonnement",mabonnement);
    
    if (isDateTimeGreaterThanCurrent(mabonnement.echeance)) {
      // console.log("Vous ", abonement);
      verifierabonement();
      clearInterval(interval);
      
    }
    else{
        return; // console.log("abonnement expire");
    }
   }

    
  }, 5000);
  },[])
  function OffersStackScreen() {
    // const lang = useSelector((state) => state.translate.lang);
    return (
      <OfferStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#F38B2B',
        }
      }}>
        <OfferStack.Screen name="Offres" component={OffersList} options={{headerShown: false}}  />
        <OfferStack.Screen name="Offer" component={Offer} options={{
          headerTitle: "Détails de l'offre",
          headerBackTitleVisible: false
        }} />
        <OfferStack.Screen name="favories" component={Favories} options={{
          headerTitle: t("Favoris"),
          headerBackTitleVisible: false
        }} />
      </OfferStack.Navigator>
    );
  }
  function ContactsStackScreen() {
    return (
      <ContactsStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#F38B2B',
        }
      }}>
        <ContactsStack.Screen name="Contacts" component={Contacts} options={{}} />
        <ContactsStack.Screen name="Contact" component={Contact} options={{
          headerTitle: t('detailsOffre'),
          headerBackTitleVisible: false
        }} />
       

      </ContactsStack.Navigator>
    );
  }
  function AppliancesStackScreen() {
    return (
      <ApplianceStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#F38B2B',
        }
      }}>
        <ApplianceStack.Screen name="Appliances" component={AppliancesList} options={{
          headerTitle: t('mes Postulations'),
          headerBackTitleVisible: false
        }}/>
        <ApplianceStack.Screen name="Appliance" component={Appliance} options={{
          headerTitle: t('detailsOffre'),
          headerBackTitleVisible: false
        }} />
      </ApplianceStack.Navigator>
    );
  }
  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#F38B2B',

        }
        

      }}>
        <ProfileStack.Screen name="Profile" component={Profile} options={{
          headerTitle: "Profil",
          headerShown: false,
          headerBackTitleVisible: false
        }}/>
        <ProfileStack.Screen name="Skills" component={Skills} options={{
           headerTitle: t('addskills'),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="Editer" component={EditSelf} options={{
           headerTitle: t('addexperience'),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="Abonnement" component={Abonnement} options={{
           headerTitle: t("Suscribe"),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="Traduction" component={Translate} options={{
           headerTitle: t('changeLanguage'),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="acceuil_Abonnement" component={AcceuilAbonnement} options={{
           headerTitle: t("Abonnement"),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="MyAbonnement" component={MyAbonnement} options={{
           headerTitle: t('MySubscription'),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="AddSched" component={AddSchedule} options={{
           headerTitle: t('AddPlageHoraire'),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="EditSched" component={EditSchedule} options={{
           headerTitle: t("EditPlagehoraire"),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="Scheds" component={Schedules} options={{
           headerTitle: t("PlagesHoraires"),
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="EditExp" component={EditExp} options={{
           headerTitle: t("EditExp"),
           headerBackTitleVisible: false
        }} />
      </ProfileStack.Navigator>
    );
  }
  function AuthStackScreen() {
    // console.log("NOUS SOMMES DANS LE STORE",store.getState())
    return (

      <AuthStack.Navigator screenOptions={{headerShown: false}}>
       
       {/* <AuthStack.Screen name="cinetpay" component={Cinetpays} /> */}
        <AuthStack.Screen name="Splash" component={SplahScreen} />
        <AuthStack.Screen name="stepone" component={StepOne} />
        <AuthStack.Screen name="StepTwo" component={StepTwo} />
        <AuthStack.Screen name="StepThree" component={StepThree} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Signin" component={Signin}  options={{headerShown: true, headerTitle: t("Signin"),            headerBackTitleVisible: false}}/>
      </AuthStack.Navigator>
    );
  }

  let [fontsLoaded] = useFonts({
    Poppins_900Black, Poppins_400Regular, Poppins_300Light_Italic, Poppins_700Bold
  }, [Poppins_900Black, Poppins_400Regular, Poppins_300Light_Italic, Poppins_700Bold]);

  if (!fontsLoaded) {
    return null
  }

  return (
  
    <Provider store={store}>
    
    <NavigationContainer>
 
  <Tab.Navigator screenOptions={({ route }) => ({
    headerStyle: {
      backgroundColor: '#F38B2B',
    },
    tabBarStyle: {
      backgroundColor: '#F38B2B',
      
      
      
    },
    tabBarActiveTintColor: '#1A9E47',
    tabBarInactiveTintColor: 'white',
    
    tabBarLabelStyle: {
      fontSize: 10,
    },
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'ProfileTab') {
        iconName = 'person-outline'; // Adjust the icon name as needed
      } else if (route.name === 'OffresTab') {
        iconName = 'briefcase-outline'; // Adjust the icon name as needed
      } else if (route.name === 'AppliancesTab') {
        iconName = 'bookmark-outline'; // Adjust the icon name as needed
      } else if (route.name === 'ContactsTab') {
        iconName = 'people-outline'; // Adjust the icon name as needed
      }

      // You can return any component here, not just Ionicons!
      return <Ionicons name={iconName} size={size} color={'white'} />;
    },
    tabBarVisible: route.name !== 'Auth',
    })}
  >
    <Tab.Screen name="Auth" component={AuthStackScreen} options={{
      tabBarStyle: { display: 'none' },
      headerShown: false,
      tabBarButton: () => null, 
      tabBarIcon: () => null
    }}/>
    {
      token ? <>
      <Tab.Screen name="OffresTab" component={OffersStackScreen} options={{
        title: t('offres'),
        headerShown: false,
        
      }} />
      <Tab.Screen name="AppliancesTab" component={AppliancesStackScreen} options={{
        title: t('mes Postulations'),
        headerShown: false,
      }}/>
      <Tab.Screen name="ContactsTab" component={ContactsStackScreen} options={{
        title: t('mes contacts'),
        headerShown: false,
        tabBarBadge: alarm_number > 0 ? alarm_number : null
      }}/>
      <Tab.Screen name="ProfileTab" component={ProfileStackScreen} options={{
        title: 'Profil',
      headerShown: false,
    }}/>
      </>
      : 
      <Tab.Screen name="Auth" component={AuthStackScreen} options={{
        tabBarStyle: { display: 'none' },
        headerShown: false,
        tabBarButton: () => null, 
        tabBarIcon: () => null
      }}/>
    }
    
  </Tab.Navigator>

</NavigationContainer>
  </Provider>
  
     
  );
}
