import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SliderBase } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import "../pages/styles/theme";
import { Size } from "../pages/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

export default function OnboardingPage() {
  const navigation = useNavigation();
  const [idpage, setIdpage] = useState(0);

  const slide = [
    {
      id: 1,
      image: require("../assets/remove1.png"),
      title: "SMART CONNECT",
      description:
        "Connectez-vous facilement avec des entreprises pour des projets enrichissants pendant votre temps libre.  Inscrivez-vous, explorez les offres et décrochez un job en quelques minutes seulement.",
    },

    {
      id: 2,
      image: require("../assets/remove2.png"),
      title: "Trouvez des petits boulots en un clin d'œil !",
      description:
        "Besoin d'un petit job rapide et facile ? Notre application vous connecte aux opportunités près de chez vous.",
    },
    {
      id: 3,
      image: require("../assets/remove3.png"),
      title: "Votre prochain job est à portée de main",
      description:
        "Explorez une multitude de petits boulots disponibles instantanément. Ne perdez plus de temps, commencez dès maintenant !",
    },
  ];
  const render = ({ item }) => {
    return (
      <View style={style.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={style.card}>
            <Image
              style={style.image}
              source={require("../assets/onboarding.png")}
            ></Image>
          </View>
          <View style={style.cardItem}>
            <View style={style.cardImage}>
              <Image
                source={item.image}
                style={{ height: "100%", width: "100%", resizeMode: "contain" }}
              ></Image>
            </View>
            {idpage === 0 ? (
              <Text style={style.bienvenue}>Bienvenue</Text>
            ) : null}
            <Text style={style.smart}>{item.title}</Text>
            <Text style={style.sujet}>{item.description}</Text>
            {/* <Pressable onPress={() => navigation.navigate('Login')}>
            <View style={style.button}>
                <Text style={style.textbutton}> Commencer</Text>
            </View>
            </Pressable> */}
          </View>
        </ScrollView>
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={slide}
      renderItem={render}
      onDone={() => navigation.replace("Login")}
      doneLabel="Commencer"
      skipLabel="Passer"
      nextLabel="Suivant"
      onSlideChange={(index) => setIdpage(index)}
      showSkipButton={true}
      renderSkipButton={() => (
        <View style={{ padding: 10 }}>
          <Text style={style.textsky}>Passer</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={style.nextpage}>
          <Text style={style.textnext}>Commencer</Text>
          <Ionicons
            name="chevron-forward-outline"
            color="white"
            style={{ marginLeft: 15 }}
          />
        </View>
      )}
      renderNextButton={() => (
        <View style={style.nextpage}>
          <Text style={style.textnext}>Suivant</Text>
          <Ionicons
            name="chevron-forward-outline"
            color="white"
            style={{ marginLeft: 15 }}
          />
        </View>
      )}
      activeDotStyle={{
        backgroundColor: "#000000",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
      }}
    />
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F2F4",
  },
  card: {
    height: 250,
    width: 160,
    alignSelf: "flex-end",
  },
  image: {
    height: "100%",
    width: "100%",
  },

  cardItem: {
    padding: 20,
  },

  bienvenue: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },
  smart: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#F38B2B",
    marginBottom: 50,
  },
  sujet: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "justify",
    color: "black",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#F38B2B",
    width: "100%",
    elevation: 5,
    borderRadius: 10,

    height: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Couleur de l'ombre
    shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
    shadowOpacity: 0.5,
    shadowRadius: 4, // Rayon de l'ombre

    elevation: 10,
  },
  textbutton: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  cardImage: {
    height: 250,
    width: "100%",
  },
  nextpage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F38B2B",
    padding: 10,
    borderRadius: 10,
  },
  textnext: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  textsky: {
    color: "#00000033",
  },
});
