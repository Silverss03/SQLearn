import React, { memo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RewardScreen from '@src/screens/reward/RewardScreen';
import useThemeColors from '@src/themes/useThemeColors';

import { SCREENS } from '../config/screenName';
import { screenOptionsDefault } from '../config/screenOptionsDefault';
import { RootStackParamList } from '../NavigationRouteProps';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const AwardStack = () => {
    const themeColors = useThemeColors();

    return (
        <StackNavigator.Navigator
            screenOptions={{
                ...screenOptionsDefault,
                gestureEnabled: false,
                statusBarStyle: 'light',
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: {
                    backgroundColor: themeColors.color_app_background,
                },
            }}
            // initialRouteName={SCREENS.REWARD_SCREEN}
        >
            <StackNavigator.Screen
                name={SCREENS.REWARD_SCREEN}
                component={RewardScreen}
            />
        </StackNavigator.Navigator>
    );
};

export default memo(AwardStack);
