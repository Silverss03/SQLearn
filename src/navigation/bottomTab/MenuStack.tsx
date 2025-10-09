import React, { memo } from 'react';

import { SCREENS } from '@navigation/config/screenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptionsDefault } from '@src/navigation/config/screenOptionsDefault';
import { RootStackParamList } from '@src/navigation/NavigationRouteProps';
import useThemeColors from '@src/themes/useThemeColors';
import ChaptersScreen from '@src/screens/chapters/ChaptersScreen';
import LessonsScreen from '@src/screens/lessons/LessonsScreen';
import LessonDetailScreen from '@src/screens/lessons/LessonDetailScreen';
import LessonQuestionScreen from '@src/screens/questions/LessonQuestionScreen';

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
                name={SCREENS.CHAPTERS_SCREEN}
                component={ChaptersScreen}
            />
            <StackNavigator.Screen
                name={SCREENS.LESSONS_SCREEN}
                component={LessonsScreen}
            />
            <StackNavigator.Screen
                name={SCREENS.LESSON_DETAIL_SCREEN}
                component={LessonDetailScreen}
            />
            <StackNavigator.Screen
                name={SCREENS.LESSON_QUESTION_SCREEN}
                component={LessonQuestionScreen}
            />
        </StackNavigator.Navigator>
    );
};

export default memo(ProfileStack);
