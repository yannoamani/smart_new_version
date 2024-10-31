import AsyncStorage from '@react-native-async-storage/async-storage';
import translate from "translate"; 
translate.engine = "deepl"; 
translate.key ="98c4da1d-6d65-4402-9c30-510b68d6a3fa:fx";

import { useSelector } from 'react-redux';


const translateText = async (text, language) => {
   
  try {
   
  
    console.log("Langue sélectionnée:", language);


    
      const translatedText = await translate(text, { from: 'fr', to: language });
      return translatedText;

  } catch (error) {
    console.error("Erreur lors de la traduction :", error);
    return text;
  }
};

export default translateText;
