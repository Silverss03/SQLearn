import { TOptions } from 'i18next';
import { Biz01i18nInstance } from '../i18n/configs';

export function translate(key: string, options?: TOptions) {
  return Biz01i18nInstance.t(key, options);
}
