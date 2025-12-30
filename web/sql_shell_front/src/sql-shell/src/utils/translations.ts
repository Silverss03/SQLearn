import { Shelli18nInstance } from '../i18n/configs';

type TranslateParams = {
  [key: string]: string | number;
};

export function translate(key: string, params?: TranslateParams) {
  return params ? Shelli18nInstance.t(key, params) : Shelli18nInstance.t(key);
}
