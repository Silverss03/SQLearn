import React, {
    memo,
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import useCallAPI from '@src/hooks/useCallAPI';
import TouchableComponent from '@src/components/TouchableComponent';
import { BackArrowIcon, ChapterIcon } from '@src/assets/svg';
import { useRoute } from '@react-navigation/native';
import { LessonsScreenProps } from '@src/navigation/NavigationRouteProps';
import { LessonType } from '@src/network/dataTypes/lesson-type';
import { getLessonsByTopicService } from '@src/network/services/lessonService';
import NavigationService from '@src/navigation/NavigationService';
import { Colors } from '@src/configs';
import StudyGirlIcon from '@src/assets/svg/StudyGirlIcon';
import Accordion from 'react-native-collapsible/Accordion';
import { ArrowDownIcon } from '@src/assets/svg';
import ArrowUpIcon from '@src/assets/svg/ArrowUpIcon';
import { SCREENS } from '@src/navigation/config/screenName';

const LessonsScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    const route = useRoute<LessonsScreenProps>();
    const { topicId, topicName } = route.params;
    const [activeSections, setActiveSections] = useState<number[]>([]);
    let chapter, content;

    const match = topicName.match(/^(Chương\s*\d+)\s*:\s*(.+)$/);

    if (match) {
        chapter = match[1];
        content = match[2];
    }

    const [lessonsList, setLessonsList] = React.useState<LessonType.Lesson[]>([]);

    const { callApi: fetchLessonsList } = useCallAPI(
            useCallback(() => getLessonsByTopicService(topicId), [topicId]),
            undefined,
            useCallback((data: LessonType.Lesson[]) => {
                setLessonsList(data);
            }, []),
    );

    useEffect(() => {
        if (topicId) {
            fetchLessonsList();
        }
    }, [fetchLessonsList, topicId]);

    const renderHeader = useCallback((section: LessonType.Lesson, index: number, isActive: boolean) => (
        <View style={[styles.chapterContainer]}>
            <ChapterIcon/>
            <TextComponent style={styles.chapterItemText}>
                {section.lesson_title}
            </TextComponent>
            <View>
                {isActive ? (
                    <ArrowUpIcon/>
                ) : (
                    <ArrowDownIcon/>
                )}
            </View>

        </View>
    ), [styles]);

    const onLearnPress = useCallback((lesson: LessonType.Lesson) => {
        NavigationService.navigate(SCREENS.LESSON_DETAIL_SCREEN, { lesson, topicName });
    }, [topicName]);

    const onDoQuestionsPress = useCallback((lesson: LessonType.Lesson) => {
        NavigationService.navigate(SCREENS.LESSON_QUESTION_SCREEN, {
            lessonId: lesson?.id,
            lessonTitle: lesson?.lesson_title,
            topicName: topicName,
        });
    }, [topicName]);

    const renderContent = useCallback((section: LessonType.Lesson) => (
        <View style={styles.accordionContentContainer}>
            <TouchableComponent
                onPress={() => onLearnPress(section)}
            >
                <TextComponent style={styles.accordionContentText}>
                    {t('Học lý thuyết')}
                </TextComponent>
            </TouchableComponent>
            <TouchableComponent
                onPress={() => onDoQuestionsPress(section)}
            >
                <TextComponent style={styles.accordionContentText}>
                    {t('Làm bài')}
                </TextComponent>
            </TouchableComponent>
        </View>
    ), [onDoQuestionsPress, onLearnPress, styles.accordionContentContainer, styles.accordionContentText, t]);

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
            </LinearGradient>

            <View style={styles.contentContainer}>

                <Accordion
                    sections={lessonsList}
                    activeSections={activeSections}
                    onChange={setActiveSections}
                    touchableComponent={TouchableComponent}
                    touchableProps={{ activeOpacity: 1 }}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                />
            </View>
        </View>
    );
};

export default memo(LessonsScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_48,
        justifyContent: 'space-between',
        borderBottomLeftRadius: Dimens.RADIUS_12,
        borderBottomRightRadius: Dimens.RADIUS_12,
    },
    nameText: {
        fontSize: Dimens.FONT_21,
        color: themeColors.color_text_3,
        marginBottom: Dimens.H_16
    },
    contentContainer: {
        backgroundColor: themeColors.color_app_background,
        padding: Dimens.W_16,
        flex: 1,
    },
    introductionText: {
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text_3,
    },
    chapterContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_16,
        borderTopLeftRadius: Dimens.RADIUS_8,
        borderTopRightRadius: Dimens.RADIUS_8,
        marginTop: Dimens.H_16,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    chapterItemText: {
        fontSize: Dimens.FONT_14,
        flex: 1,
        marginLeft: Dimens.W_8,
        flexWrap: 'wrap',
        color: themeColors.color_text_2,
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
    accordionContentContainer: {
        height: Dimens.H_40,
        backgroundColor: themeColors.color_dialog_background,
        justifyContent: 'flex-end',
        paddingVertical: Dimens.H_8,
        paddingHorizontal: Dimens.W_16,
        marginBottom: Dimens.H_16,
        flexDirection: 'row',
        borderBottomLeftRadius: Dimens.RADIUS_8,
        borderBottomRightRadius: Dimens.RADIUS_8,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 2,
    },
    accordionContentText: {
        fontSize: Dimens.FONT_12,
        color: 'rgba(0, 0, 0, 0.5)',
        marginRight: Dimens.W_12,
        textDecorationLine: 'underline',
    }
});