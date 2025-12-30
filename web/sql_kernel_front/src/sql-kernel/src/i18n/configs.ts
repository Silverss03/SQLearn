import { initReactI18next } from 'react-i18next';
import { mpNs, mpResources } from '@sql/sql-libs/src/i18n';
import { createInstance } from 'i18next';
import * as _ from 'lodash-es';
// Import language json files
import translation_ja from './ja.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

export const Kerneli18nInstance = createInstance();

const defaultNS = 'kernel';
const resources = {
  ja: {
    kernel: translation_ja,
  },
};

void Kerneli18nInstance.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'ja',
    ns: _.concat(mpNs, 'kernel'),
    defaultNS,
    resources: _.merge(resources, mpResources),
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    returnNull: false,
  });
