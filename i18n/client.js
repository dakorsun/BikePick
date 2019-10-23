import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import config from './config';

const clientConfig = {
    ...config,
    lng: window.initialLanguage,
    resources: window.initialI18nStore || undefined,
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector);

// initialize if not already initialized
if (!i18n.isInitialized) {
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    i18n.init(clientConfig, error => {
        if (error) {
            console.error(error);
        }
    });
}

export default i18n;
