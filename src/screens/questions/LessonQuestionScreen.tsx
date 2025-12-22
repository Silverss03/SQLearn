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
    Vibration,
} from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import TouchableComponent from '@src/components/TouchableComponent';
import { BackArrowIcon } from '@src/assets/svg';
import NavigationService from '@src/navigation/NavigationService';
import { Colors } from '@src/configs';
import { QuestionType } from '@src/network/dataTypes/question-types';
import { LessonQuestionScreenProps } from '@src/navigation/NavigationRouteProps';
import { useRoute } from '@react-navigation/native';
import useCallAPI from '@src/hooks/useCallAPI';
import { getExerciseByLessonService } from '@src/network/services/questionServices';
import {
    canSubmit,
    getButtonText,
    getCorrectAnswerText,
    getSqlQuestionData,
    isMcQuestion,
    isSqlQuestion,
    validateSqlAnswer
} from './helper/helper';
import DragDropQuestion from './components/DragDropQuestion';
import FillblankQuestion from './components/FillBlankQuestion';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';
import CorrectIcon from '@src/assets/svg/CorrectIcon';
import IncorrectIcon from '@src/assets/svg/IncorrectIcon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SCREENS } from '@src/navigation/config/screenName';
import { DuoDragDropRef } from '@jamsch/react-native-duo-drag-drop';
import { SafeAreaView } from 'react-native-safe-area-context';
import { playSound } from '@src/utils/soundUtils';

type QuestionResult = 'correct' | 'incorrect' | null;

const LessonQuestionScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    const route = useRoute<LessonQuestionScreenProps>();

    const { lessonId, lessonTitle } = route.params;

    const [allQuestions, setAllQuestions] = useState<(QuestionType.McqQuestion | QuestionType.SqlQuestion)[]>([]);
    const [sqlAnswers, setSqlAnswers] = useState<{ [key: string]: string }>({});
    const [dragDropAnswer, setDragDropAnswer] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [questionResult, setQuestionResult] = useState<QuestionResult>(null);
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [progressAnim] = useState(new Animated.Value(0));
    const [lessonQuestionId, setLessonQuestionId] = useState<number | null>(null);

    const currentQuestion = allQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
    const totalQuestions = allQuestions.length;
    const ref = useRef<DuoDragDropRef>(null);

    const { callApi: fetchExerciseQuestion } = useCallAPI(
            useCallback(() => getExerciseByLessonService(lessonId), [lessonId]),
            undefined,
            useCallback((data: QuestionType.Exercise) => {
                setLessonQuestionId(data.lessonExercise.id);
                const questions = data.questions;
                const sqlQuestionsArray = Object.values(questions.sqlQuestions || {});
                const combined = [...questions.multipleChoice, ...sqlQuestionsArray];
                const shuffled = combined.sort(() => Math.random() - 0.5);
                setAllQuestions(shuffled);
            }, [])
    );

    useEffect(() => {
        if (lessonId) {
            fetchExerciseQuestion();
        }
    }, [lessonId]);

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
        if (!isSubmitted) {
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

            setQuestionResult(isCorrect ? 'correct' : 'incorrect');
            setIsSubmitted(true);

            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
                // Trigger physical feedback (vibration)
                Vibration.vibrate(500);

                // Play success sound
                // TODO: User needs to add 'correct_answer.mp3' to android/app/src/main/res/raw/ and iOS project
                playSound('correct_answer.mp3');
            } else {
                 // Trigger physical feedback (vibration) for wrong answer
                 Vibration.vibrate(500);
                 
                 // Play incorrect sound
                 // TODO: User needs to add 'wrong_answer.mp3'
                 playSound('wrong_answer.mp3');
            }
        } else {
            if (isLastQuestion) {
                NavigationService.navigate(SCREENS.LESSON_QUESTION_COMPLETE_SCREEN, {
                    lessonQuestionId,
                    lessonId,
                    score: score,
                    totalQuestions,
                    lessonTitle
                });
            } else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setSelectedAnswer(null);
                setQuestionResult(null);
                setIsSubmitted(false);
                setSqlAnswers({});
                setDragDropAnswer([]);
            }
        }
    }, [currentQuestion, isLastQuestion, isSubmitted, lessonQuestionId, score, selectedAnswer, sqlAnswers, t]);

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

                    <View style={styles.headerContent}>
                        <TextComponent style={styles.headerTitle}>
                            {lessonTitle}
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
                            />
                        )}

                        {currentQuestion && isSqlQuestion(currentQuestion) &&
                        currentQuestion.interaction_type === 'drag_drop' &&
                        renderDragDropQuestion(currentQuestion)}

                        {currentQuestion && isSqlQuestion(currentQuestion) &&
                        currentQuestion.interaction_type === 'fill_blanks' &&
                        renderFillBlanksQuestion(currentQuestion)}
                    </View>

                    <View
                        style={[
                            styles.bottomContainer,
                            questionResult && styles.bottomContainerExpanded,
                        ]}
                    >
                        {questionResult && (
                            <View style={[
                                styles.resultContainer,
                            ]}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {questionResult === 'correct' ? (
                                        <CorrectIcon size={12}/>
                                    ) : (
                                        <IncorrectIcon size={12}/>
                                    )}
                                    <TextComponent style={[
                                        styles.resultText,
                                        questionResult === 'incorrect' && styles.incorrectText
                                    ]}
                                    >
                                        {questionResult === 'correct' ? t('Đáp án chính xác') : t('Trả lời sai')}
                                    </TextComponent>
                                </View>

                                {questionResult === 'incorrect' && currentQuestion && (
                                    <TextComponent style={styles.correctAnswerText}>
                                        {getCorrectAnswerText({ currentQuestion, t })}
                                    </TextComponent>
                                )}
                            </View>
                        )}

                        <View style={{ flex: 1 }} />
                        <TouchableComponent
                            style={[
                                styles.submitButton,
                                isSubmitted && questionResult === 'correct' && styles.continueButton,
                                isSubmitted && questionResult === 'incorrect' && styles.incorrectContinueButton
                            ]}
                            onPress={handleSubmitOrContinue}
                            disabled={!canSubmit({ currentQuestion, selectedAnswer, sqlAnswers }) }
                        >
                            <TextComponent style={styles.submitButtonText}>
                                {getButtonText({ isSubmitted, isLastQuestion, t })}
                            </TextComponent>
                        </TouchableComponent>
                    </View>
                </View>
            </SafeAreaView>

        </GestureHandlerRootView>
    );
};

export default memo(LessonQuestionScreen);

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
        color: Colors.COLOR_WHITE,
        textAlign: 'center',
    },
    progressText: {
        fontSize: Dimens.FONT_12,
        color: Colors.COLOR_WHITE,
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
        color: Colors.COLOR_WHITE,
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
        backgroundColor: Colors.COLOR_WHITE,
        borderRadius: Dimens.H_3,
    },
});