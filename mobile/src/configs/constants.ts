import { Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const EMAIL_REGEX = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PHONE_LENGTH = 18;
export const MIN_PHONE_LENGTH = 11;
export const PHONE_MASK = ['+', /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export const SOCIAL_PROVIDER = {
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
    APPLE: 'apple',
};

export const PAGE_SIZE = 20;
export const LARGE_PAGE_SIZE = 200;

export const DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY-MM';
