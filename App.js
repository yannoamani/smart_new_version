// App.js
import React, { useState } from 'react';
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

export default function App() {
  axios.defaults.baseURL = 'http://192.168.1.14:8000/api/';
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
  function OffersStackScreen() {
    return (
      <OfferStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#87CEEB',
        }
      }}>
        <OfferStack.Screen name="Offres" component={OffersList} options={{}} />
        <OfferStack.Screen name="Offer" component={Offer} options={{
          headerTitle: "Détails de l'offre",
          headerBackTitleVisible: false
        }} />
      </OfferStack.Navigator>
    );
  }
  function ContactsStackScreen() {
    return (
      <ContactsStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#87CEEB',
        }
      }}>
        <ContactsStack.Screen name="Contacts" component={Contacts} options={{}} />
        <ContactsStack.Screen name="Contact" component={Contact} options={{
          headerTitle: "Détails de l'offre",
          headerBackTitleVisible: false
        }} />
      </ContactsStack.Navigator>
    );
  }
  function AppliancesStackScreen() {
    return (
      <ApplianceStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#87CEEB',
        }
      }}>
        <ApplianceStack.Screen name="Appliances" component={AppliancesList} options={{
          headerTitle: "Mes Postulations",
          headerBackTitleVisible: false
        }}/>
        <ApplianceStack.Screen name="Appliance" component={Appliance} options={{
          headerTitle: "Détails de l'offre",
          headerBackTitleVisible: false
        }} />
      </ApplianceStack.Navigator>
    );
  }
  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#87CEEB',
        }
      }}>
        <ProfileStack.Screen name="Profile" component={Profile} options={{
          headerTitle: "Profil",
          headerBackTitleVisible: false
        }}/>
        <ProfileStack.Screen name="Skills" component={Skills} options={{
           headerTitle: "Ajouter/Supprimer une compétence",
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="Editer" component={EditSelf} options={{
           headerTitle: "Ajouter une expérience",
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="Abonnement" component={Abonnement} options={{
           headerTitle: "Abonnement",
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="AddSched" component={AddSchedule} options={{
           headerTitle: "Ajouter plages horaires",
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="EditSched" component={EditSchedule} options={{
           headerTitle: "Modifier plage horaire",
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="Scheds" component={Schedules} options={{
           headerTitle: "Plages horaires",
           headerBackTitleVisible: false
        }} />
        <ProfileStack.Screen name="EditExp" component={EditExp} options={{
           headerTitle: "Modifier une expérience",
           headerBackTitleVisible: false
        }} />
      </ProfileStack.Navigator>
    );
  }
  function AuthStackScreen() {
    return (
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Signin" component={Signin} />
      </AuthStack.Navigator>
    );
  }
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#87CEEB',
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
            return <Ionicons name={iconName} size={size} color={color} />;
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
              title: 'Offres',
              headerShown: false,
            }} />
            <Tab.Screen name="AppliancesTab" component={AppliancesStackScreen} options={{
              title: 'Mes Postulations',
              headerShown: false,
            }}/>
            <Tab.Screen name="ContactsTab" component={ContactsStackScreen} options={{
              title: 'Mes Contacts',
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
  );
}
