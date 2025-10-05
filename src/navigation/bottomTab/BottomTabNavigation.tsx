import React, {
    memo,
    useCallback,
} from 'react';

import { useTranslation } from 'react-i18next';

import {
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomTabBar from '@src/navigation/bottomTab/components/CustomTabBar';
import { SCREENS } from '@src/navigation/config/screenName';

import RewardStack from './RewardStack';
import CartStack from './CartStack';
import HomeStack from './HomeStack';
import MenuStack from './MenuStack';
import ProfileStack from './ProfileStack';

const BottomTabNavigator = createBottomTabNavigator();

const BottomTab = () => {
    const { t } = useTranslation();

    const renderTabBar = useCallback((props: BottomTabBarProps) => (
        <CustomTabBar {...props} />
    ), []);

    return (
        <BottomTabNavigator.Navigator
            tabBar={renderTabBar}
            screenOptions={{
                headerShown: false,
            }}
            // initialRouteName={SCREENS.HOME_TAB_SCREEN}
        >
            <BottomTabNavigator.Screen
                options={{
                    title: t('Home'),
                }}
                name={SCREENS.HOME_TAB_SCREEN}
                component={HomeStack}
            />
            <BottomTabNavigator.Screen
                options={{
                    title: t('Profile'),
                    lazy: false
                }}
                name={SCREENS.ACCOUNT_TAB_SCREEN}
                component={ProfileStack}
            />
        </BottomTabNavigator.Navigator>
    );
};

export default memo(BottomTab);
