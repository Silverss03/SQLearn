import React, {
    memo,
    useCallback,
    useRef,
    useState,
} from 'react';

import LoadingOverlay from '@components/LoadingOverlay';
import CustomToastProvider from '@components/toast/CustomToastProvider';
import { SCREENS } from '@navigation/config/screenName';
import NavigationService from '@navigation/NavigationService';
// import analytics from '@react-native-firebase/analytics';
import {
    NavigationContainer,
    NavigationContainerRef,
} from '@react-navigation/native';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import useIsUserLoggedIn from '@src/hooks/useIsUserLoggedIn';
import BottomTab from '@src/navigation/bottomTab/BottomTabNavigation';
import { RootStackParamList } from '@src/navigation/NavigationRouteProps';
import PokemonDetailScreen from '@src/screens/example/PokemonDetailScreen';
import SplashScreen from '@src/screens/splash/SplashScreen';
import useThemeColors from '@src/themes/useThemeColors';
import { log } from '@src/utils/logger';
import LoginScreen from '@src/screens/login/LoginScreen';

const StackNavigator = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    const { themeColors } = useThemeColors();
    // useMessaging();
    // useDeepLinkHandle();

    const navigationRef = useRef<NavigationContainerRef<{}>>();
    const routeNameRef = useRef<string>();

    const [loading, setLoading] = useState(true);

    // const userData = useAppSelector((state) => state.storageReducer.userData);

    const isUserLoggedIn = useIsUserLoggedIn();

    const getInitData = useCallback(async () => {

        // if (isUserLoggedIn) {
        // get user data in case open app from close state
        // await getUserData();
        // }

        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }, []);

    const ref = useCallback((refNavigation: NavigationContainerRef<{}>) => {
        navigationRef.current = refNavigation;
        NavigationService.setTopLevelNavigator(refNavigation);
    }, []);

    const onStateChange = useCallback(async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        log('Screen: ', currentRouteName);

        if (previousRouteName !== currentRouteName) {
            // await analytics().logScreenView({
            //     screen_name: currentRouteName,
            //     screen_class: currentRouteName,
            // });
        }

        routeNameRef.current = currentRouteName;
    }, []);

    const onReady = useCallback(() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        if (isUserLoggedIn) {
            // set axios header token when open app from close state
            // setHeaderToken(userData?.token);
        }
        getInitData();
    }, [getInitData, isUserLoggedIn]);

    const checkAppScreen = useCallback(() => {
        if (loading) {
            return (
                <StackNavigator.Screen
                    name={SCREENS.SPLASH_SCREEN}
                    component={SplashScreen}
                    options={{
                        ...TransitionPresets.ModalFadeTransition,
                        gestureEnabled: false,
                    }}
                />
            );
        }

        if (!isUserLoggedIn) {
            return (
                <StackNavigator.Screen
                    name={SCREENS.LOGIN_SCREEN}
                    component={LoginScreen}
                    options={{
                        ...TransitionPresets.ModalFadeTransition,
                    }}
                />
            );
        }

        return (
            <>
                <StackNavigator.Screen
                    name={SCREENS.BOTTOM_TAB_SCREEN}
                    component={BottomTab}
                    options={{
                        ...TransitionPresets.ModalFadeTransition,
                    }}
                />
                <StackNavigator.Screen
                    name={SCREENS.POKEMON_DETAIL_SCREEN}
                    component={PokemonDetailScreen}
                />
            </>
        );
    }, [loading, isUserLoggedIn]);

    return (
        <NavigationContainer
            ref={ref}
            onReady={onReady}
            onStateChange={onStateChange}
        >
            <StackNavigator.Navigator
                detachInactiveScreens={false}
                // initialRouteName={SCREENS.BOTTOM_TAB_SCREEN}
                screenOptions={{
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false,
                    gestureEnabled: true,
                    cardStyle: {
                        backgroundColor: themeColors.color_app_background,
                    },
                }}
            >
                {checkAppScreen()}
            </StackNavigator.Navigator>
        </NavigationContainer>
    );
};

const NavigationWrapper = () => (
    <>
        <AppNavigation />
        <CustomToastProvider />
        <LoadingOverlay />
    </>
);

export default memo(NavigationWrapper);
