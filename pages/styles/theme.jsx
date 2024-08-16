import React, { useState } from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const ThemeComponent = () => {

  const [policeBold, setPolices] = useState("Poppins_700Bold")
  const [policeRegular, setPoliceRegular] = useState("Poppins_400Regular")
  const [policeLight, setPoliceLight] = useState("Poppins_300Light_Italic")

  const theme = {
    width,
    height,
    policeBold,
    policeRegular,
    policeLight
  };

  return theme; // Ou vous pouvez retourner un JSX ici selon vos besoins
};

export default ThemeComponent;
