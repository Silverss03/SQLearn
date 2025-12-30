import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import vi from './locales/vi.json';

const resources: Resource = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    },
};

i18next.use(initReactI18next).init({
    lng: 'vi',
    fallbackLng: 'vi',
    debug: false,
    resources: resources,
    compatibilityJSON: 'v3',
});

i18next.on('languageChanged', (_language) => {
    // dayjs.locale(language);
});

const I18nApp = i18next;

export default I18nApp;

export const DEFAULT_LANGUAGE = 'vi';
