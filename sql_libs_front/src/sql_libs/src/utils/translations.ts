import { Libsi18nInstance } from '../i18n/configs';

type TranslateParams = {
  [key: string]: string | number;
};

export function translate(key: string, params?: TranslateParams) {
  return params ? Libsi18nInstance.t(key, params) : Libsi18nInstance.t(key);
}
