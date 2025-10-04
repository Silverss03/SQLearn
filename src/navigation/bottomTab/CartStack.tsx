import React, { memo } from 'react';

import { SCREENS } from '@navigation/config/screenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/NavigationRouteProps';
import CartScreen from '@src/screens/cart/CartScreen';
import useThemeColors from '@src/themes/useThemeColors';

import { screenOptionsDefault } from '../config/screenOptionsDefault';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const CartStack = () => {
    const themeColors = useThemeColors();

    return (
        <StackNavigator.Navigator
            screenOptions={{ ...screenOptionsDefault,
                gestureEnabled: false,
                statusBarStyle: 'light',
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: themeColors.color_app_background } }}
            // initialRouteName={SCREENS.CART_SCREEN}
        >
            <StackNavigator.Screen
                name={SCREENS.CART_SCREEN}
                component={CartScreen}
            />
        </StackNavigator.Navigator>
    );
};

export default memo(CartStack);
