import React, { memo } from 'react';

import { SCREENS } from '@navigation/config/screenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptionsDefault } from '@src/navigation/config/screenOptionsDefault';
import { RootStackParamList } from '@src/navigation/NavigationRouteProps';
import MenuScreen from '@src/screens/menu/MenuScreen';
import useThemeColors from '@src/themes/useThemeColors';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const ProfileStack = () => {
    const themeColors = useThemeColors();

    return (
        <StackNavigator.Navigator
            screenOptions={{ ...screenOptionsDefault,
                gestureEnabled: false,
                statusBarStyle: 'light',
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: themeColors.color_app_background } }}
            // initialRouteName={SCREENS.MENU_SCREEN}
        >
            <StackNavigator.Screen
                name={SCREENS.MENU_SCREEN}
                component={MenuScreen}
            />
        </StackNavigator.Navigator>
    );
};

export default memo(ProfileStack);
