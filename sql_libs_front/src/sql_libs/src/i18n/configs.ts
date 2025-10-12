import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_ja from './vn.json';
import translation_common_ja from './common_vn.json';
import translation_validate_ja from './validate_vn.json';

export const Libsi18nInstance = createInstance();

const defaultNS = 'libs';
export const mpResources = {
  ja: {
    libs: translation_ja,
    common: translation_common_ja,
    validate: translation_validate_ja,
  },
};

export const mpNs = ['libs', 'common', 'validate'];

void Libsi18nInstance.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'ja',
    ns: mpNs,
    defaultNS,
    resources: mpResources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
