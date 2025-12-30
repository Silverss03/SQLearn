// Import language json file
import { initReactI18next } from 'react-i18next';
import { mpNs, mpResources } from '@sql/sql-libs/src/i18n';
import i18n from 'i18next';
import * as _ from 'lodash-es';
import translation_ja from './ja.json';

export const Shelli18nInstance = i18n.createInstance();

const defaultNS = 'shell';
const resources = {
  ja: {
    shell: translation_ja,
  },
};

void Shelli18nInstance.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'ja',
    ns: _.concat(mpNs, 'shell'),
    defaultNS,
    resources: _.merge(resources, mpResources),
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
