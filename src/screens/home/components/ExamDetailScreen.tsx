import React, {
    memo,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    View,
} from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import TouchableComponent from '@src/components/TouchableComponent';
import NavigationService from '@src/navigation/NavigationService';
import { QuestionType } from '@src/network/dataTypes/question-types';
import { ExamDetailScreenProps } from '@src/navigation/NavigationRouteProps';
import { useRoute } from '@react-navigation/native';
import useCallAPI from '@src/hooks/useCallAPI';
import { startExamService } from '@src/network/services/questionServices';
import {
    canSubmit,
    getSqlQuestionData,
    isMcQuestion,
    isSqlQuestion,
    validateSqlAnswer
} from '@screens/questions/helper/helper';
import DragDropQuestion from '@src/screens/questions/components/DragDropQuestion';
import FillblankQuestion from '@src/screens/questions/components/FillBlankQuestion';
import MultipleChoiceQuestion from '@src/screens/questions/components/MultipleChoiceQuestion';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SCREENS } from '@src/navigation/config/screenName';
import { DuoDragDropRef } from '@jamsch/react-native-duo-drag-drop';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRightIcon } from '@src/assets/svg';

const ExamDetailScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    const route = useRoute<ExamDetailScreenProps>();

    const { examId, examTitle, examDuration, initialData } = route.params;

    const [allQuestions, setAllQuestions] = useState<(QuestionType.McqQuestion | QuestionType.SqlQuestion)[]>([]);
    const [sqlAnswers, setSqlAnswers] = useState<{ [key: string]: string }>({});
    const [dragDropAnswer, setDragDropAnswer] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [progressAnim] = useState(new Animated.Value(0));
    const [session_token, setSessionToken] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(examDuration * 60);

    const timerRef = useRef<NodeJS.Timeout>();
    const currentQuestion = allQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
    const totalQuestions = allQuestions.length;
    const ref = useRef<DuoDragDropRef>(null);

    const handleExamData = useCallback((data: QuestionType.StartExamResponse) => {
        const questions = data.questions;
        const sqlQuestionsArray = Object.values(questions.sqlQuestions || {});
        const combined = [...questions.multipleChoice, ...sqlQuestionsArray];
        const shuffled = combined.sort(() => Math.random() - 0.5);
        setAllQuestions(shuffled);
        setSessionToken(data.session_token);
    }, []);

    const { callApi: fetchExerciseDetail } = useCallAPI(
            startExamService,
            undefined,
            handleExamData
    );

    useEffect(() => {
        if (initialData) {
            handleExamData(initialData);
        } else if (examId) {
            fetchExerciseDetail({
                exam_id: examId,
                device_fingerprint: 'fake-device-id-for-demo'
            });
        }
    }, [examId, initialData, handleExamData, fetchExerciseDetail]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    // Time's up - clear interval and navigate to complete screen
                    clearInterval(timerRef.current);
                    NavigationService.replace(SCREENS.EXAM_COMPLETE_SCREEN, {
                        examId,
                        score,
                        totalQuestions,
                        session_token,
                    });
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup on component unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [examDuration, examId, score, totalQuestions, session_token]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (currentQuestion && isSqlQuestion(currentQuestion)) {
            const data = getSqlQuestionData(currentQuestion);
            if (data) {
                if (currentQuestion.interaction_type === 'drag_drop') {
                    setDragDropAnswer([]) ;
                } else if (currentQuestion.interaction_type === 'fill_blanks') {
                    setSqlAnswers({}) ;
                }
            }
        }
    }, [currentQuestion]);

    useEffect(() => {
        const progress = totalQuestions > 0 ? (currentQuestionIndex + 1) / totalQuestions : 0;
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [currentQuestionIndex, progressAnim, totalQuestions]);

    const handleSubmitOrContinue = useCallback(() => {
        let isCorrect = false;

        if (currentQuestion && isMcQuestion(currentQuestion)) {
            if (!selectedAnswer) {
                Alert.alert(t('Thông báo'), t('Vui lòng chọn đáp án trước khi nộp bài.'));
                return;
            }
            isCorrect = selectedAnswer === currentQuestion.correct_answer;
        } else if (currentQuestion && isSqlQuestion(currentQuestion)) {
            let answer ;
            if (currentQuestion.interaction_type === 'drag_drop' && ref.current) {
                const answeredWords = ref.current.getAnsweredWords();
                answer = answeredWords.join(' ');
            }
            isCorrect = validateSqlAnswer({ currentQuestion, dragDropAnswer: answer, sqlAnswers });
        }

        setIsSubmitted(true);

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }
        if (isLastQuestion) {
            NavigationService.navigate(SCREENS.EXAM_COMPLETE_SCREEN, {
                examId,
                score: score,
                totalQuestions,
                session_token: session_token,
            });
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
            setSqlAnswers({});
            setDragDropAnswer([]);
        }
    }, [currentQuestion, isLastQuestion, selectedAnswer, t, sqlAnswers, score, examId, totalQuestions, session_token]);

    const renderDragDropQuestion = useCallback((question: QuestionType.SqlQuestion) => {
        const data = getSqlQuestionData(question);
        if (!data) return null;

        const { questionData } = data;
        const availableComponents = questionData.components.filter(
                (comp: any) => !dragDropAnswer.find((ans) => ans.id === comp.id)
        );

        return (
            <DragDropQuestion
                ref={ref}
                question={currentQuestion}
                dragDropAnswer={dragDropAnswer}
                availableComponents={availableComponents}
                isSubmitted={isSubmitted}
            />
        );
    }, [currentQuestion, dragDropAnswer, isSubmitted]);

    const renderFillBlanksQuestion = useCallback((question: QuestionType.SqlQuestion) => {
        const data = getSqlQuestionData(question);
        if (!data) return null;

        const { questionData } = data;

        return (
            <FillblankQuestion
                question={question}
                questionData={questionData}
                sqlAnswers={sqlAnswers}
                setSqlAnswers={setSqlAnswers}
                isSubmitted={isSubmitted}
            />
        );

    }, [isSubmitted, sqlAnswers]);

    if (allQuestions.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <TextComponent style={styles.loadingText}>
                    {t('Đang tải câu hỏi...')}
                </TextComponent>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#55CCFF', '#A282FFBD']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.homeHeader}
                >
                    <View style={styles.headerContent}>
                        <TextComponent style={styles.headerTitle}>
                            {examTitle}
                        </TextComponent>

                        <TextComponent style={styles.timerText}>
                            ⏱️ {formatTime(timeLeft)}
                        </TextComponent>

                        <View style={styles.progressContainer}>
                            <View style={styles.progressBarBackground}>
                                <Animated.View
                                    style={[
                                        styles.progressBarFill,
                                        {
                                            width: progressAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0%', '100%'],
                                            }),
                                        }
                                    ]}
                                />
                            </View>
                            <TextComponent style={styles.progressText}>
                                {currentQuestionIndex + 1}/{totalQuestions}
                            </TextComponent>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.contentContainer}>
                    <View style={styles.questionContainer}>
                        {currentQuestion && isMcQuestion(currentQuestion) && (
                            <MultipleChoiceQuestion
                                currentQuestion={currentQuestion}
                                isSubmitted={isSubmitted}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                isChapterExercise
                            />
                        )}

                        {currentQuestion && isSqlQuestion(currentQuestion) &&
                        currentQuestion.interaction_type === 'drag_drop' &&
                        renderDragDropQuestion(currentQuestion)}

                        {currentQuestion && isSqlQuestion(currentQuestion) &&
                        currentQuestion.interaction_type === 'fill_blanks' &&
                        renderFillBlanksQuestion(currentQuestion)}
                    </View>

                    <TouchableComponent
                        style={[
                            styles.floatingButton,
                            !canSubmit({ currentQuestion, selectedAnswer, sqlAnswers }) && 
                            styles.disabledButton
                        ]}
                        onPress={handleSubmitOrContinue}
                        disabled={!canSubmit({ currentQuestion, selectedAnswer, sqlAnswers })}
                    >
                        {isLastQuestion ? (
                            <TextComponent style={styles.submitText}>
                                {t('Nộp bài')}
                            </TextComponent>
                        ) : (
                            <ArrowRightIcon
                                width={24}
                                height={24}
                                fill={themeColors.color_text_3}
                            />
                        )}
                    </TouchableComponent>
                </View>
            </SafeAreaView>

        </GestureHandlerRootView>
    );
};

export default memo(ExamDetailScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
        marginLeft: Dimens.W_16,
    },
    headerTitle: {
        fontSize: Dimens.FONT_18,
        fontWeight: 'bold',
        color: themeColors.color_text_3,
        textAlign: 'center',
    },
    progressText: {
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text_3,
        fontWeight: '600',
    },
    contentContainer: {
        backgroundColor: themeColors.color_dialog_background,
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.color_app_background,
    },
    loadingText: {
        fontSize: Dimens.FONT_16,
        color: themeColors.color_text,
    },
    questionContainer: {
        flex: 1,
        paddingVertical: Dimens.H_16,
        paddingHorizontal: Dimens.W_16,
    },
    bottomContainer: {
        backgroundColor: themeColors.color_app_background,
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_16,
        borderTopWidth: 1,
        borderTopColor: themeColors.color_text_3,
        height: Dimens.H_90,
    },
    bottomContainerExpanded: {
        height: Dimens.H_180,
    },
    resultContainer: {
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'flex-start',
        marginBottom: Dimens.H_12,
    },
    resultText: {
        fontSize: Dimens.FONT_18,
        fontWeight: 'bold',
        color: themeColors.color_text_correct,
        marginLeft: Dimens.W_8,
    },
    incorrectText: {
        color: themeColors.color_text_incorrect,
    },
    correctAnswerText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_incorrect,
        marginTop: Dimens.H_4,
    },
    continueButton: {
        backgroundColor: themeColors.color_text_correct,
    },
    incorrectContinueButton: {
        backgroundColor: themeColors.color_text_incorrect,
    },
    submitButton: {
        backgroundColor: themeColors.color_primary,
        paddingVertical: Dimens.H_16,
        paddingHorizontal: Dimens.W_24,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
        minHeight: Dimens.H_48,
    },
    submitButtonText: {
        fontSize: Dimens.FONT_18,
        fontWeight: 'bold',
        color: themeColors.color_text_3,
    },
    progressContainer: {
        marginTop: Dimens.H_8,
        width: '80%',
        alignItems: 'center',
    },
    progressBarBackground: {
        width: '100%',
        height: Dimens.H_6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: Dimens.H_3,
        marginBottom: Dimens.H_4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: themeColors.color_text_3,
        borderRadius: Dimens.H_3,
    },
    timerText: {
        fontSize: Dimens.FONT_16,
        color: themeColors.color_text_3,
        fontWeight: '600',
        marginTop: Dimens.H_4,
    },
    floatingButton: {
        position: 'absolute',
        bottom: Dimens.H_24,
        right: Dimens.W_24,
        width: Dimens.W_56,
        height: Dimens.W_56,
        borderRadius: Dimens.W_28,
        backgroundColor: themeColors.color_primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    disabledButton: {
        opacity: 0.5,
    },
    submitText: {
        color: themeColors.color_text_3,
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
    },
});