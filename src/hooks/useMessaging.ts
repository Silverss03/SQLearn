import {
    useCallback,
    useEffect,
} from 'react';

import omit from 'lodash/omit';
import {
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { getDeviceName } from 'react-native-device-info';
import {
    useDeepCompareEffect,
    useEffectOnce,
} from 'react-use';

import notifee, { EventType } from '@notifee/react-native';
import { useAppState } from '@react-native-community/hooks';
import FireBaseMessaging from '@react-native-firebase/messaging';
import { IS_ANDROID } from '@src/configs/constants';
import { registerNotificationTokenService } from '@src/network/services/authServices';
import { getUnreadNotificationCountThunk } from '@src/redux/toolkit/thunks/notificationThunks';
// import { handleClickNotification } from '@src/screens/notification/helpers/clickNotificationHelper';
import {
    log,
    logError,
} from '@src/utils/logger';

import { useAppDispatch } from './';
import useIsUserLoggedIn from './useIsUserLoggedIn';
import useCallAPI from './useCallAPI';

const useMessaging = () => {
    const appState = useAppState();

    const isUserLoggedIn = useIsUserLoggedIn();
    const dispatch = useAppDispatch();

    const handleNotification = useCallback((notificationData: any, isFromCloseState: boolean) => {
        try {
            if (isUserLoggedIn && !!notificationData) {
                log('handleNotification_parse', JSON.parse(notificationData));
                // handleClickNotification(JSON.parse(notificationData), isFromCloseState);
            }
        } catch (error) {
            logError('handleNotification_Error', error);
        }

    }, [isUserLoggedIn]);

    const { callApi: registerToken } = useCallAPI(
        registerNotificationTokenService,
        undefined,
        undefined,
        undefined,
        false,
        false,
        false
    );

    const onRegisterToken = useCallback(async () => {
        const [deviceName, fcmToken] = await Promise.all([
            getDeviceName(),
            FireBaseMessaging().getToken(),
        ]);

        log('__________fcmToken', fcmToken);
        log('__________deviceName', deviceName);

        registerToken({
            device_type: Platform.OS,
            device_name: deviceName,
            device_token: fcmToken
        });
    }, []);

    const requestPermission = useCallback(async () => {
        if (IS_ANDROID) {
            const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS); // if react-native >= 0.70.7 => PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            if (res === PermissionsAndroid.RESULTS.GRANTED) {
                onRegisterToken();
            }
        } else {
            // await FireBaseMessaging().registerDeviceForRemoteMessages();
            FireBaseMessaging()
                    .requestPermission()
                    .then(() => {
                        onRegisterToken();
                    })
                    .catch((error) => {
                        logError('requestPermission_Error', error);
                    });
        }

    }, [onRegisterToken]);

    const checkPermission = useCallback(async () => {
        const authStatus = await FireBaseMessaging().hasPermission();
        if (authStatus === FireBaseMessaging.AuthorizationStatus.AUTHORIZED || authStatus === FireBaseMessaging.AuthorizationStatus.PROVISIONAL) {
            onRegisterToken();
        } else {
            requestPermission();
        }
    }, [onRegisterToken, requestPermission]);

    // auto ask for notification permission and register token if user turn on notification setting
    useEffect(() => {
        if (appState === 'active' && isUserLoggedIn) {
            setTimeout(() => {
                checkPermission();
            }, 1000);
        }
    }, [appState, checkPermission, isUserLoggedIn]);

    // create notification channel
    useEffectOnce(() => {
        notifee.createChannels([{ id: 'notifee_default', name: 'Default channel notification' }]);
    });

    useDeepCompareEffect(() => {
        // notification come when app in FOREGROUND & click notification when app in BACKGROUND
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            log('__________notifee.onBackgroundEvent', detail);
            if (type === EventType.PRESS) {
                handleNotification(detail.notification?.data?.notification, false);
            }
        });

        // notification come when app in FOREGROUND & click notification when app in FOREGROUND
        const unsubscribeForegroundEvent = notifee.onForegroundEvent(({ detail, type }) => {
            log('__________notifee.onForegroundEvent', detail);

            if (type === EventType.PRESS) {
                handleNotification(detail.notification?.data?.notification, false);
            }
        });

        // notification come when app in FOREGROUND & click notification when the application is in CLOSE
        notifee.getInitialNotification().then((initialNotification) => {
            log('__________notifee.getInitialNotification', initialNotification);

            if (initialNotification) {
                handleNotification(initialNotification.notification?.data?.notification, true);
            }
        });

        // notification come when app in BACKGROUND or CLOSE & click notification when the application is in CLOSE
        FireBaseMessaging()
                .getInitialNotification()
                .then((initialNotification) => {
                    log('__________getInitialNotification', initialNotification);

                    if (initialNotification) {
                        handleNotification(initialNotification?.data?.notification || '{}', true);
                    }
                });

        // notification come when app in BACKGROUND or CLOSE & click notification when the application is in BACKGROUND or FOREGROUND
        const unsubscribeNotificationOpenedApp = FireBaseMessaging().onNotificationOpenedApp((remoteMessage) => {
            log('__________onNotificationOpenedApp', remoteMessage);

            if (remoteMessage) {
                handleNotification(remoteMessage?.data?.notification, false);
            }
        });

        // receiver notification when app in BACKGROUND or CLOSED
        FireBaseMessaging().setBackgroundMessageHandler(async (remoteMessage) => {
            log('__________setBackgroundMessageHandler', remoteMessage);
        });

        //receiver notification when app in FOREGROUND
        const unsubscribeForegroundMessage = FireBaseMessaging().onMessage((remoteMessage) => {
            log('__________onMessage', remoteMessage);
            dispatch(getUnreadNotificationCountThunk());

            const { notification, data, messageId } = remoteMessage;

            notifee.displayNotification({
                id: messageId,
                title: notification?.title,
                body: notification?.body,
                android: {
                    channelId: 'notifee_default',
                    smallIcon: 'ic_notification',
                    color: '#FFD435',
                    pressAction: {
                        id: 'default', // This will open the app on press
                    },
                },
                data: omit(data || {}, ['fcm_options']),
            });
        });

        return () => {
            unsubscribeForegroundEvent();
            unsubscribeNotificationOpenedApp();
            unsubscribeForegroundMessage();
        };
    }, [handleNotification]);
};

export default useMessaging;

