// i18n.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../local/en.json'; // Langue anglaise
import sv from '../../local/fr.json'; // Langue suédoise

// Charger les ressources (traductions)
export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: sv,
  },
};


i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', 
    lng: 'fr',
    fallbackLng: 'fr', 
    resources: resources,
  
  });

export default i18next;
