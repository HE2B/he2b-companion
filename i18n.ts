import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { 
    settings: "Settings", 
    theme: "Theme", 
    language: "Language", 
    light: "Light", 
    dark: "Dark",
    home : "Home",
    calendar: "Calendar",
    news : "News",
    profile : "Profil"
} },
  fr: { translation: { settings: "Paramètres", 
    theme: "Thème", 
    language: "Langue", 
    light: "Clair", 
    dark: "Sombre" ,
    home : "Accueil",
    calendar : "Calendrier",
    news : "Actualité",
    profile : "Profile"
} }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export { i18n }; // Ajout pour éviter tout problème d'importation
export default i18n;
