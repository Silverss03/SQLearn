import {
    isEmpty,
    isEqual,
    isNull,
    isUndefined,
} from 'lodash';
import {
    Linking,
    Platform,
} from 'react-native';
// import InAppBrowser from 'react-native-inappbrowser-reborn';

import Toast from '@src/components/toast/Toast';
import {
    EMAIL_REGEX,
    IS_ANDROID,
    MAX_PHONE_LENGTH,
    MIN_PHONE_LENGTH,
} from '@src/configs/constants';
import dayjs from '@utils/dayjs';

export const formatPrice = (num: string | number = '') => {
    if (!num) {
        return '0';
    }

    num = Number(num) % 1 !== 0 ? Number(num)?.toFixed(2) : num;
    num = String(num);

    if (typeof num === 'number' || typeof num === 'string') {
        num = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return num;
};

export function nFormatter(num: number | string, digits: number) {
    if (!num) {
        return '0';
    }

    num = Number(num);

    var si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'tr' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + ' ' + si[i].symbol;
}

export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text?.toLowerCase().slice(1);

export const callPhone = (text?: string) => Linking.openURL(`tel:${text}`);

export const convertDateYYYYMMDD = (value: string | number) => {
    value = String(value);
    const year = value.substring(0, 4);
    const month = value.substring(4, 6);
    const day = value.substring(6, 8);

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date;
};

export const checkUrlImage = (url: string) => url.match(/\.(jpeg|jpg|gif|png|heic)$/) != null;

export const checkUrlFile = (url: string) =>
    url.match(/\.(doc|docx|xls|xlsx|ppt|pptx|pdf|txt|csv|jpeg|jpg|gif|png|heic)$/) != null;

export const getFileNameUrl = (url: string) => url?.split('/')?.pop()?.split('#')[0]?.split('?')[0];

export const handleOpenLink = async (url: string) => {
    try {
        Linking.openURL(url);
    } catch (error) {
        Toast.showToast(error);
    }
};

export const checkIsValue = (value?: number | string) => value !== undefined && value !== null && value !== '';

export const isEmptyOrUndefined = (value: any) => isEmpty(value) || isUndefined(value) || isNull(value);

export const validatePhone = (phone: any) => {
    if (!phone || !phone.startsWith('+') || !phone.includes('/') || phone.charAt(6) !== '/') {
        return false;
    }

    const phoneNumb = phone.split('/').join('').split('+').join(''); // remove all / and +

    if (phoneNumb.length > MAX_PHONE_LENGTH || phoneNumb.length < MIN_PHONE_LENGTH) {
        return false;
    }

    return true;
};

export const validateEmail = (email: any) => EMAIL_REGEX.test(email);

export const compareArrays = (a: any, b:any) => isEqual(a, b);

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
    let hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;
    }

    return `rgba(${r},${g},${b},${opacity})`;
};

// export const openInAppBrowser = async (url = '') => {
//     if (url) {
//         try {
//             if ((await InAppBrowser.isAvailable())) {
//                 await InAppBrowser.open(url, {
//                     // iOS Properties
//                     dismissButtonStyle: 'done',
//                     readerMode: false,
//                     animated: true,
//                     modalPresentationStyle: 'fullScreen',
//                     modalTransitionStyle: 'coverVertical',
//                     modalEnabled: true,
//                     enableBarCollapsing: false,
//                     // Android Properties
//                     showTitle: false,
//                     enableUrlBarHiding: true,
//                     enableDefaultShare: false,
//                     forceCloseOnRedirection: false,
//                 });
//             } else {
//                 Linking.canOpenURL(url).then((isSupport) => {
//                     if (isSupport) {
//                         Linking.openURL(url);
//                     }
//                 });
//             }
//         } catch (error) {
//             Linking.canOpenURL(url).then((isSupport) => {
//                 if (isSupport) {
//                     Linking.openURL(url);
//                 }
//             });
//         }
//     }
// };

export const openMap = (lat: number, lng: number, label: string) => {
    const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
    });

    const latLng = `${lat},${lng}`;

    const url = IS_ANDROID ? `${scheme}${latLng}(${label})` : `${scheme}${label}@${latLng}`;

    const googleMapURL = `comgooglemaps://?q=${lat},${lng}`;

    if (IS_ANDROID) {
        Linking.openURL(url);
    } else {
        Linking.canOpenURL(googleMapURL)
                .then((canOpen) => {
                    if (canOpen) {
                        Linking.openURL(googleMapURL);
                    } else {
                        Linking.openURL(url);
                    }
                });
    }
};

export const getDefaultAvatar = (name?: string) => `https://ui-avatars.com/api/?name=${name}`;

export const moneyFormat = (price?: number, locale = 'vi', currency = 'VND') => {
    const Currency = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'code'
    });
    return Currency.format(price || 0);
};

export const getTimeFromNow = (dateTime?: string) => {
    if (!dateTime) {
        return '';
    }

    if (dayjs(dateTime).isToday()) {
        const diff = dayjs().diff(dateTime, 'hours');

        if (diff > 1) {
            return `Today at ${dayjs(dateTime).format('HH:mm:ss a')}`;
        } else {
            return dayjs(dateTime).fromNow();
        }
    }

    if (dayjs(dateTime).isYesterday()) {
        return `Yesterday at ${dayjs(dateTime).format('HH:mm:ss a')}`;
    }

    return dayjs(dateTime).format('DD-MM-YYYY HH:mm:ss a');
};