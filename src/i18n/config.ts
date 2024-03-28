import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import kmHome from './km/home.json';
import enHome from './en/home.json';
import kmButton from './km/button.json';
import enButton from './en/button.json';

export const defaultNS = 'hero';
export const supportedLngs = {
    en: "English",
    km: "Khmer (ខ្មែរ)",
};

i18next.use(LanguageDetector).use(initReactI18next).init({
    lng: localStorage.getItem('i18nextLng') || 'km',
    debug: import.meta.env.MODE === "development",
    fallbackLng: "en",
    supportedLngs: Object.keys(supportedLngs),
    resources: {
        km: {
            hero: kmHome,
            button: kmButton,
        },
        en: {
            hero: enHome,
            button: enButton
        }
    },
    interpolation: {
        escapeValue: false,
    },
    returnObjects: true,
    defaultNS,
});