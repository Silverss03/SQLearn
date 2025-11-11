import { initReactI18next } from 'react-i18next';
import { mpNs, mpResources } from '@sql/sql-libs/src/i18n';
import { createInstance } from 'i18next';
import * as _ from 'lodash-es';
// Import language json file
import translation_ja from './ja.json';

export const Biz01i18nInstance = createInstance();

const defaultNS = 'biz01';
const resources = {
  ja: {
    biz01: translation_ja,
  },
};

void Biz01i18nInstance.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'ja',
    ns: _.concat(mpNs, 'biz01'),
    defaultNS,
    resources: _.merge(resources, mpResources),
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
