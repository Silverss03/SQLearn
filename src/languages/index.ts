import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import nl from './locales/nl.json';

const resources: Resource = {
    en: {
        translation: en
    },
    nl: {
        translation: nl
    },
};

i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: resources,
    compatibilityJSON: 'v3',
});

i18next.on('languageChanged', (_language) => {
    // dayjs.locale(language);
});

const I18nApp = i18next;

export default I18nApp;

export const DEFAULT_LANGUAGE = 'en';
