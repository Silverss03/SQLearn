import Config from 'react-native-config';

export const API_URL = Config.ENV_API_URL;

export const API_TIMEOUT = 60 * 1000;

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'auth/register';
export const LOGIN_SOCIAL = 'auth/social';
export const REFRESH_TOKEN = 'auth/token/refresh';

export const PROFILE = 'profile';
export const FORGOT_PASSWORD = 'users/forgot';
export const COUNTRY_LIST = 'countries';
export const CITY_LIST = 'cities';
export const CLUBS = 'clubs';

export const POKEMON_LIST = 'pokemon';
export const POKEMON_DETAIL = 'pokemon-species';
export const CHAPTER_LIST = 'topics';
export const HOME_INFO = 'home';

export const CHECK_TOKEN_EXPIRED_WHITE_LIST = [
    LOGIN,
    REGISTER,
];