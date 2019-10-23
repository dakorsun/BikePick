import axios from "axios";

const config = {
    preload: ["ru", "en"],
    whitelist: [
        'ru',
        'en',
    ],
    fallbackLng: "en",
    debug: false, // process.env.NODE_ENV !== 'development',
    interpolation: {
        escapeValue: false,
    },
    backend: {
        loadPath: './i18n/locales/{{lng}}/{{ns}}.json',
        parse: (data) => JSON.parse(data),
        ajax: async (url, options, callback, data) => {
            try {
                const res = await axios.get(url);
                if (!res.data) {
                    callback(null);
                } else {
                    callback(res.data, res);
                }
            } catch (e) {
                console.error(e);
                callback(null);
            }
        },
    },
    detection: {
        // order and from where user language should be detected
        order: ['querystring', 'cookie', 'htmlTag', 'localStorage', 'navigator', 'subdomain'],

        // keys or params to lookup language from
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,

        // cache user language on
        caches: ['cookie'],
        excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

        // optional expire and domain for set cookie
        cookieMinutes: 525600, // a year
    },
    wait: true,
};

export default config;
