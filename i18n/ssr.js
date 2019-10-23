import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-sync-fs-backend';
import i18nextMiddleware from "i18next-express-middleware";
import config from './config';

const ssrConfig = {
    ...config,
    initImmediate: false,
    backend: {
        loadPath: './i18n/locales/{{lng}}/{{ns}}.json',
        parse: (data) => JSON.parse(data),
    },
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .use(i18nextMiddleware.LanguageDetector);

if (!i18n.isInitialized) {
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    i18n.init(ssrConfig, error => {
        if (error) {
            console.error(error);
        }
    });
}

export default i18n;
