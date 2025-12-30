import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

import { logError } from '@src/utils/logger';

const MMKVStorage = new MMKV();

export const storeData = (key: string, value: string) => {
    try {
        MMKVStorage.set(key, value);
    } catch (e) {
        logError('Storage Save Error', e);
    }
};

export const getStorageData = (key: string) => {
    try {
        const value = MMKVStorage.getString(key);
        return value;
    } catch (e) {
        logError('Storage Reading Value Error', e);
    }
};

export const MMKVReduxStorage: Storage = {
    setItem: (key, value) => {
        MMKVStorage.set(key, value);
        return Promise.resolve(true);
    },
    getItem: (key) => {
        const value = MMKVStorage.getString(key);
        return Promise.resolve(value);
    },
    removeItem: (key) => {
        MMKVStorage.delete(key);
        return Promise.resolve();
    },
};

export default MMKVStorage;
