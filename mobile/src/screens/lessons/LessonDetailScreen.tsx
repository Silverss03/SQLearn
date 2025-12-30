import React, { memo, useCallback } from 'react';
import {
    ScrollView,
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
import RenderHTML from 'react-native-render-html';
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

    const match = topicName.match(/^(Chương\s*\d+)\s*:\s*(.+)$/);

    if (match) {
        chapter = match[1];
        content = match[2];
    }

    const tagsStyles = {
        h1: { fontSize: Dimens.FONT_24, fontWeight: 'bold', textAlign: 'center', color: '#722ED1', marginBottom: Dimens.H_10 },
        h2: { fontSize: Dimens.FONT_20, fontWeight: 'bold', marginBottom: Dimens.H_8 },
        h3: { fontSize: Dimens.FONT_18, fontWeight: 'bold', marginBottom: Dimens.H_6 },
        h4: { fontSize: Dimens.FONT_16, fontWeight: 'bold', marginBottom: Dimens.H_4 },
        p: { fontSize: Dimens.FONT_14, lineHeight: Dimens.H_20, marginBottom: Dimens.H_10 },
        blockquote: { backgroundColor: '#f0f0f0', padding: Dimens.H_10, borderLeftWidth: 4, borderLeftColor: '#9254DE', marginBottom: Dimens.H_10 },
        ul: { marginBottom: Dimens.H_10 },
        li: { fontSize: Dimens.FONT_14, lineHeight: Dimens.H_20 },
        table: { borderWidth: 1, borderColor: '#000', width: '100%', marginBottom: Dimens.H_10 },
        th: { borderWidth: 1, borderColor: '#000', padding: Dimens.H_8, backgroundColor: '#e0e0e0', fontWeight: 'bold' },
        td: { borderWidth: 1, borderColor: '#000', padding: Dimens.H_8 },
        pre: { backgroundColor: '#f5f5f5', padding: Dimens.H_10, borderRadius: 4, marginBottom: Dimens.H_10 },
        code: { fontFamily: 'monospace', fontSize: Dimens.FONT_12 },
    };

    const classesStyles = {
        blockquote: { backgroundColor: '#f0f0f0', padding: Dimens.H_10, borderLeftWidth: 4, borderLeftColor: '#9254DE', marginBottom: Dimens.H_10 },
    };

    const onPressExerciseButton = useCallback(() => {
        NavigationService.navigate(SCREENS.LESSON_QUESTION_SCREEN, {
            lessonId: lesson?.id,
            lessonTitle: lesson?.lesson_title,
            topicName: topicName,
        });
    }, [lesson, topicName]);

    return (
        <View style={{ flex: 1, backgroundColor: themeColors.color_dialog_background }}>
            <LinearGradient
                colors={['#2689D1D3', '#2A9BD8C1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
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
            </LinearGradient>

            <View style={styles.contentContainer}>
                <ScrollView style={{ flex: 1 }}>
                    <RenderHTML
                        source={{ html: decodedHtml }}
                        tagsStyles={tagsStyles}
                        classesStyles={classesStyles}
                    />
                </ScrollView>

            </View>
            <View style={styles.exerciseButtonContainer}>
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.exerciseButtonGradient}
                >
                    <TouchableComponent
                        onPress={onPressExerciseButton}
                        style={styles.exerciseButton}
                    >
                        <TextComponent style={styles.exerciseButtonText}>
                            📝 Làm bài tập
                        </TextComponent>
                    </TouchableComponent>
                </LinearGradient>
            </View>
        </View>
    );
};

export default memo(LessonDetailScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_24,
        justifyContent: 'space-between',
    },
    scrollViewWrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themeColors.color_app_background,
        marginVertical: Dimens.H_16,
    },
    contentContainer: {
        backgroundColor: themeColors.color_dialog_background,
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: Dimens.H_16,
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
        height: Dimens.H_68,
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
    exerciseButtonContainer: {
        padding: Dimens.H_12,
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#f8f9fa',
    },
    exerciseButtonGradient: {
        borderRadius: Dimens.RADIUS_8,
        padding: Dimens.H_12,
        alignItems: 'center',
    },
    exerciseButton: {
        alignItems: 'center',
    },
    exerciseButtonText: {
        color: 'white',
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
    },
    exerciseButtonSubtext: {
        marginTop: Dimens.H_15,
        color: '#666',
        fontSize: Dimens.FONT_14,
        textAlign: 'center',
    },
});