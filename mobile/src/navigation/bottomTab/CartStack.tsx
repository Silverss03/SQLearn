import React, { memo } from 'react';

import { SCREENS } from '@navigation/config/screenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/NavigationRouteProps';
import ChapterQuestionScreen from '@src/screens/revision/ChapterQuestionScreen';
import ChapterExercisesScreen from '@src/screens/revision/components/ChapterExercisesScreen';
import useThemeColors from '@src/themes/useThemeColors';

import { screenOptionsDefault } from '../config/screenOptionsDefault';
import ChapterQuestionScreenComplete from '@src/screens/revision/components/ChapterQuestionScreenComplete';

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
                name={SCREENS.CHAPTER_QUESTION_SCREEN}
                component={ChapterQuestionScreen}
            />
            <StackNavigator.Screen
                name={SCREENS.CHAPTER_EXERCISE_SCREEN}
                component={ChapterExercisesScreen}
            />
            <StackNavigator.Screen
                name={SCREENS.CHAPTER_EXERCISE_COMPLETE_SCREEN}
                component={ChapterQuestionScreenComplete}
            />
        </StackNavigator.Navigator>
    );
};

export default memo(CartStack);
