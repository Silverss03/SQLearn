import React, { memo, useCallback } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import TouchableComponent from '@src/components/TouchableComponent';
import { BackArrowIcon, ChapterIcon } from '@src/assets/svg';
import { useRoute } from '@react-navigation/native';
import { LessonDetailScreenProps } from '@src/navigation/NavigationRouteProps';
import NavigationService from '@src/navigation/NavigationService';
import { Colors } from '@src/configs';
import StudyGirlIcon from '@src/assets/svg/StudyGirlIcon';
import WebView from 'react-native-webview';
import { SCREENS } from '@src/navigation/config/screenName';

const LessonDetailScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const route = useRoute<LessonDetailScreenProps>();

    const { lesson, topicName } = route.params;
    const rawHtml = lesson?.lesson_content ;
    const decodedHtml = rawHtml
            .replace(/\\n/g, '\n')
            .replace(/\\x3C/g, '<')
            .replace(/\\x3E/g, '>')
            .replace(/\\"/g, '"');
    let chapter, content;
    const enhancedHtml = React.useMemo(() => {
        const exerciseButton = `
            <div style="
                margin-top: 40px; 
                padding: 20px; 
                text-align: center; 
                border-top: 2px solid #e0e0e0;
                background-color: #f8f9fa;
            ">
                <button 
                    onclick="window.ReactNativeWebView.postMessage('exercise_pressed')"
                    style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                        transition: transform 0.2s ease;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.transform='translateY(0)'"
                >
                    📝 Làm bài tập về chương này
                </button>
                <p style="
                    margin-top: 15px; 
                    color: #666; 
                    font-size: 14px;
                ">
                    Kiểm tra hiểu biết của bạn với các câu hỏi thực hành
                </p>
            </div>
        `;

        return decodedHtml + exerciseButton;
    }, [decodedHtml]);

    const match = topicName.match(/^(Chương\s*\d+)\s*:\s*(.+)$/);

    if (match) {
        chapter = match[1];
        content = match[2];
    }

    const onMessage = useCallback((event : any) => {
        const message = event.nativeEvent.data;
        if (message === 'exercise_pressed') {
            NavigationService.navigate(SCREENS.LESSON_QUESTION_SCREEN, {
                lessonId: lesson?.id,
                lessonTitle: lesson?.lesson_title,
                topicName: topicName,
            });
        }
    }, [lesson?.id, lesson?.lesson_title, topicName]);

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#2689D1D3', '#2A9BD8C1']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.homeHeader}
            >
                <TouchableComponent
                    onPress={() => NavigationService.goBack()}
                    hitSlop={Dimens.DEFAULT_HIT_SLOP}
                >
                    <BackArrowIcon
                        width={Dimens.H_24}
                        height={Dimens.H_24}
                        fill={Colors.COLOR_WHITE}
                    />
                </TouchableComponent>

                <View style= {styles.headerContainer}>
                    <View style={styles.topicNameContainer}>
                        <TextComponent style={styles.chapterNameText}>
                            {chapter}
                        </TextComponent>
                        <TextComponent style={styles.introductionText}>
                            {content}
                        </TextComponent>
                    </View>

                    <StudyGirlIcon
                        width={Dimens.W_100}
                        height={Dimens.H_120}
                    />
                </View>

                <View style={[styles.chapterContainer]}>
                    <ChapterIcon/>
                    <TextComponent style={styles.chapterItemText}>
                        {lesson?.lesson_title}
                    </TextComponent>
                </View>
            </LinearGradient>

            <View style={styles.contentContainer}>

                <WebView
                    originWhitelist={['*']}
                    source={{ html: enhancedHtml }}
                    javaScriptEnabled
                    domStorageEnabled
                    style={{ flex: 1 }}
                    onMessage={onMessage}
                />

            </View>
        </View>
    );
};

export default memo(LessonDetailScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_48,
        justifyContent: 'space-between',
    },
    scrollViewWrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themeColors.color_app_background,
        marginVertical: Dimens.H_16,
    },
    contentContainer: {
        backgroundColor: themeColors.color_app_background,
        flex: 1,
    },
    introductionText: {
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text_3,
    },
    chapterNameText: {
        fontSize: Dimens.FONT_30,
        color: themeColors.color_text_3
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Dimens.H_100,
        marginTop: Dimens.H_16
    },
    topicNameContainer: {
        justifyContent: 'space-between',
        height: '80%'
    },
    chapterContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_4,
        borderRadius: Dimens.RADIUS_8,
        marginTop: Dimens.H_12,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    chapterItemText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
    webViewContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: Dimens.RADIUS_12,
    },
});