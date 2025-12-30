import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import TextComponent from '@src/components/TextComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { Colors } from '@src/configs';
import NavigationService from '@src/navigation/NavigationService';

// Import your icons
import { BackArrowIcon } from '@src/assets/svg';
import CorrectIcon from '@src/assets/svg/CorrectIcon';
import IncorrectIcon from '@src/assets/svg/IncorrectIcon';
import useCallAPI from '@src/hooks/useCallAPI';
import { submitChapterExerciseService, submitExerciseService } from '@src/network/services/questionServices';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { LessonQuestionCompleteScreenProps } from '@src/navigation/NavigationRouteProps';
import { SCREENS } from '@src/navigation/config/screenName';
import { ExerciseActions } from '@src/redux/toolkit/actions/exercisesActions';

const ChapterQuestionScreenComplete = () => {
    const route = useRoute<LessonQuestionCompleteScreenProps>();
    const { t } = useTranslation();
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);

    const userProfile = useAppSelector((state) => state.storageReducer.userData?.user);

    const { chapterExerciseId, score, totalQuestions } = route.params;

    const dispatch = useAppDispatch();

    // Animation values
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.8));
    const [progressAnim] = useState(new Animated.Value(0));
    const [celebrationAnim] = useState(new Animated.Value(0));

    // Calculate performance metrics
    const finalScoreNum = totalQuestions > 0 ? (score / totalQuestions) * 10 : 0;
    const finalScore = Number(finalScoreNum.toFixed(2));
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;
    const isPassed = percentage >= 60;

    const getPerformanceData = () => {
        if (isExcellent) {
            return {
                title: t('Xuất sắc!'),
                subtitle: t('Bạn đã làm rất tốt!'),
                color: '#FFD700',
                emoji: '🎉',
                gradient: ['#FFD700', '#FFA500']
            };
        } else if (isGood) {
            return {
                title: t('Tốt lắm!'),
                subtitle: t('Kết quả khá ấn tượng!'),
                color: '#28a745',
                emoji: '👏',
                gradient: ['#28a745', '#20c997']
            };
        } else if (isPassed) {
            return {
                title: t('Đạt yêu cầu!'),
                subtitle: t('Tiếp tục cố gắng nhé!'),
                color: '#17a2b8',
                emoji: '👍',
                gradient: ['#17a2b8', '#6f42c1']
            };
        } else {
            return {
                title: t('Cần cải thiện'),
                subtitle: t('Hãy thử lại để đạt kết quả tốt hơn!'),
                color: '#dc3545',
                emoji: '💪',
                gradient: ['#dc3545', '#fd7e14']
            };
        }
    };

    const performanceData = getPerformanceData();

    // Start animations on mount
    useEffect(() => {
        Animated.sequence([
            // Fade and scale in
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]),
            // Progress bar animation
            Animated.timing(progressAnim, {
                toValue: percentage / 100,
                duration: 1500,
                useNativeDriver: false,
            }),
            // Celebration animation for excellent performance
            ...(isExcellent ? [
                Animated.loop(
                        Animated.sequence([
                            Animated.timing(celebrationAnim, {
                                toValue: 1,
                                duration: 500,
                                useNativeDriver: true,
                            }),
                            Animated.timing(celebrationAnim, {
                                toValue: 0,
                                duration: 500,
                                useNativeDriver: true,
                            }),
                        ]),
                        { iterations: 3 }
                )
            ] : [])
        ]).start();
    }, [fadeAnim, scaleAnim, progressAnim, celebrationAnim, percentage, isExcellent]);

    const { callApi: submitResult } = useCallAPI(
            submitChapterExerciseService,
            undefined,
            undefined
    );

    const handleContinue = () => {
        submitResult({
            user_id: userProfile.id,
            chapter_exercise_id: chapterExerciseId,
            score: finalScore
        });

        NavigationService.popToTop();
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={performanceData.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableComponent
                    onPress={() => NavigationService.popToTop()}
                    hitSlop={Dimens.DEFAULT_HIT_SLOP}
                    style={styles.backButton}
                >
                    <BackArrowIcon
                        width={Dimens.H_24}
                        height={Dimens.H_24}
                        fill={Colors.COLOR_WHITE}
                    />
                </TouchableComponent>

                <TextComponent style={styles.headerTitle}>
                    {t('Kết quả bài học')}
                </TextComponent>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <Animated.View
                    style={[
                        styles.resultCard,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { scale: scaleAnim },
                                {
                                    rotate: celebrationAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '2deg']
                                    })
                                }
                            ]
                        }
                    ]}
                >
                    <View style={styles.performanceSection}>
                        <TextComponent style={styles.emoji}>
                            {performanceData.emoji}
                        </TextComponent>
                        <TextComponent style={[styles.performanceTitle, { color: performanceData.color }]}>
                            {performanceData.title}
                        </TextComponent>
                        <TextComponent style={styles.performanceSubtitle}>
                            {performanceData.subtitle}
                        </TextComponent>
                    </View>

                    <View style={styles.scoreSection}>
                        <View style={[styles.scoreCircle, { borderColor: performanceData.color }]}>
                            <TextComponent style={[styles.scoreText, { color: performanceData.color }]}>
                                {percentage}%
                            </TextComponent>
                            <TextComponent style={styles.scoreLabel}>
                                {score}/{totalQuestions}
                            </TextComponent>
                        </View>
                    </View>

                    <View style={styles.progressSection}>
                        <View style={styles.progressBarBackground}>
                            <Animated.View
                                style={[
                                    styles.progressBarFill,
                                    {
                                        backgroundColor: performanceData.color,
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '100%']
                                        })
                                    }
                                ]}
                            />
                        </View>
                        <TextComponent style={styles.progressText}>
                            {t('Độ chính xác: {{percentage}}%', { percentage })}
                        </TextComponent>
                    </View>
                </Animated.View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <CorrectIcon
                            size={24}
                            color="#28a745"
                        />
                        <TextComponent style={styles.statNumber}>{score}</TextComponent>
                        <TextComponent style={styles.statLabel}>{t('Đúng')}</TextComponent>
                    </View>

                    <View style={styles.statCard}>
                        <IncorrectIcon
                            size={24}
                            color="#dc3545"
                        />
                        <TextComponent style={styles.statNumber}>{totalQuestions - score}</TextComponent>
                        <TextComponent style={styles.statLabel}>{t('Sai')}</TextComponent>
                    </View>

                </View>

                <View style={styles.actionButtons}>
                    <TouchableComponent
                        style={[styles.continueButton, { backgroundColor: performanceData.color }]}
                        onPress={handleContinue}
                    >
                        <TextComponent style={styles.continueButtonText}>
                            {isPassed ? t('Tiếp tục') : t('Hoàn thành')}
                        </TextComponent>
                    </TouchableComponent>
                </View>
            </ScrollView>
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.color_app_background,
    },
    header: {
        paddingTop: Dimens.H_44,
        paddingHorizontal: Dimens.W_16,
        paddingBottom: Dimens.H_20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: Dimens.W_16,
    },
    headerTitle: {
        fontSize: Dimens.FONT_18,
        fontWeight: 'bold',
        color: Colors.COLOR_WHITE,
        flex: 1,
        textAlign: 'center',
        marginRight: Dimens.W_40,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: Dimens.W_20,
    },
    resultCard: {
        backgroundColor: themeColors.color_dialog_background,
        borderRadius: Dimens.RADIUS_16,
        padding: Dimens.W_24,
        marginBottom: Dimens.H_24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    performanceSection: {
        alignItems: 'center',
        marginBottom: Dimens.H_24,
    },
    emoji: {
        fontSize: Dimens.FONT_40,
        marginBottom: Dimens.H_8,
    },
    performanceTitle: {
        fontSize: Dimens.FONT_28,
        fontWeight: 'bold',
        marginBottom: Dimens.H_4,
    },
    performanceSubtitle: {
        fontSize: Dimens.FONT_16,
        color: themeColors.color_text_2,
        textAlign: 'center',
    },
    scoreSection: {
        alignItems: 'center',
        marginBottom: Dimens.H_24,
    },
    scoreCircle: {
        width: Dimens.W_120,
        height: Dimens.W_120,
        borderRadius: Dimens.W_60,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.color_app_background,
    },
    scoreText: {
        fontSize: Dimens.FONT_30,
        fontWeight: 'bold',
    },
    scoreLabel: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
        marginTop: -Dimens.H_4,
    },
    progressSection: {
        alignItems: 'center',
    },
    progressBarBackground: {
        width: '100%',
        height: Dimens.H_8,
        backgroundColor: themeColors.color_text_3,
        borderRadius: Dimens.H_4,
        marginBottom: Dimens.H_8,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: Dimens.H_4,
    },
    progressText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Dimens.H_32,
        gap: Dimens.W_12,
    },
    statCard: {
        flex: 1,
        backgroundColor: themeColors.color_dialog_background,
        borderRadius: Dimens.RADIUS_12,
        padding: Dimens.W_16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statNumber: {
        fontSize: Dimens.FONT_24,
        fontWeight: 'bold',
        color: themeColors.color_text,
        marginVertical: Dimens.H_4,
    },
    statLabel: {
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text_2,
    },
    timeIcon: {
        fontSize: Dimens.FONT_24,
    },
    actionButtons: {
        gap: Dimens.H_12,
        marginBottom: Dimens.H_24,
    },
    reviewButton: {
        backgroundColor: '#6c757d',
        paddingVertical: Dimens.H_14,
        paddingHorizontal: Dimens.W_24,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
    },
    reviewButtonText: {
        color: Colors.COLOR_WHITE,
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
    },
    retryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: themeColors.color_primary,
        paddingVertical: Dimens.H_14,
        paddingHorizontal: Dimens.W_24,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
    },
    retryButtonText: {
        color: themeColors.color_primary,
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
    },
    continueButton: {
        paddingVertical: Dimens.H_16,
        paddingHorizontal: Dimens.W_24,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
    },
    continueButtonText: {
        color: Colors.COLOR_WHITE,
        fontSize: Dimens.FONT_18,
        fontWeight: 'bold',
    },
    lessonInfo: {
        alignItems: 'center',
        paddingTop: Dimens.H_16,
        borderTopWidth: 1,
        borderTopColor: themeColors.color_text_3,
    },
    lessonTitle: {
        fontSize: Dimens.FONT_18,
        fontWeight: '600',
        color: themeColors.color_text,
        marginBottom: Dimens.H_4,
        textAlign: 'center',
    },
    completedText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
});

export default ChapterQuestionScreenComplete;