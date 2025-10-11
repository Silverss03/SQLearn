import React, {
    memo,
    useCallback,
    useEffect,
    useState
} from 'react';
import {
    Alert,
    StyleSheet,
    View,
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
import { getMcQuestionByLessonService, getSqlQuestionByLessonService } from '@src/network/services/questionServices';
import {
    getSqlQuestionData,
    isMcQuestion,
    isSqlQuestion,
    validateSqlAnswer
} from './helper/helper';
import DragDropQuestion from './components/DragDropQuestion';
import FillblankQuestion from './components/FillBlankQuestion';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';

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

    const currentQuestion = allQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;
    const totalQuestions = allQuestions.length;

    const { callApi: fetchMcQuestion } = useCallAPI(
            useCallback(() => getMcQuestionByLessonService(lessonId), [lessonId]),
            undefined,
            useCallback((data: QuestionType.McqQuestion[]) => {
                console.log('Fetched MC Questions:', data);
                setAllQuestions((prev) => [...prev, ...data]);
            }, []),
    );

    const { callApi: fetchSqlQuestions } = useCallAPI(
            useCallback(() => getSqlQuestionByLessonService(lessonId), [lessonId]),
            undefined,
            useCallback((data: QuestionType.SqlQuestion[]) => {
                console.log('Fetched SQL Questions:', data);
                setAllQuestions((prev) => {
                    const combined = [...prev, ...data];
                    const shuffled = combined.sort(() => Math.random() - 0.5);
                    return shuffled;
                });
            }, []),
    );

    useEffect(() => {
        if (lessonId) {
            fetchMcQuestion();
            fetchSqlQuestions();
        }
    }, [fetchMcQuestion, fetchSqlQuestions, lessonId]);

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
                isCorrect = validateSqlAnswer({ currentQuestion, dragDropAnswer, sqlAnswers });
            }

            setQuestionResult(isCorrect ? 'correct' : 'incorrect');
            setIsSubmitted(true);

            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
            }
        } else {
            if (isLastQuestion) {
                Alert.alert(
                        t('Hoàn thành!'),
                        t('Bạn đã hoàn thành bài tập!\nĐiểm số {{score}}/{{total}}', {
                            score,
                            total: totalQuestions,
                        }),
                        [
                            {
                                text: t('Trở lại'),
                                onPress: () => NavigationService.goBack(),
                            }
                        ]
                );
            } else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setSelectedAnswer(null);
                setQuestionResult(null);
                setIsSubmitted(false);
                setSqlAnswers({});
                setDragDropAnswer([]);
            }
        }
    }, [currentQuestion, dragDropAnswer, isLastQuestion, isSubmitted, score, selectedAnswer, sqlAnswers, t, totalQuestions]);

    const getButtonText = useCallback(() => {
        if (!isSubmitted) {
            return t('Xác nhận');
        }
        return isLastQuestion ? t('Hoàn thành') : t('Tiếp tục');
    }, [isLastQuestion, isSubmitted, t]);

    const getResultText = () => {
        if (questionResult === 'correct') {
            return t('Chính xác! 🎉');
        }
        if (questionResult === 'incorrect') {
            return t('Sai rồi! 😔');
        }
        return '';
    };

    const renderDragDropQuestion = useCallback((question: QuestionType.SqlQuestion) => {
        const data = getSqlQuestionData(question);
        if (!data) return null;

        const { questionData } = data;
        const availableComponents = questionData.components.filter(
                (comp: any) => !dragDropAnswer.find((ans) => ans.id === comp.id)
        );

        return (
            <DragDropQuestion
                question={currentQuestion}
                dragDropAnswer={dragDropAnswer}
                setDragDropAnswer={setDragDropAnswer}
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
        <View style={{ flex: 1 }}>
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
                    <TextComponent style={styles.progressText}>
                        {currentQuestionIndex + 1}/{totalQuestions}
                    </TextComponent>
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

                <View style={styles.bottomContainer}>
                    {questionResult && (
                        <View style={[
                            styles.resultContainer,
                            questionResult === 'correct' ? styles.correctResult : styles.incorrectResult
                        ]}
                        >
                            <TextComponent style={styles.resultText}>
                                {getResultText()}
                            </TextComponent>
                        </View>
                    )}

                    <TouchableComponent
                        style={[
                            styles.submitButton,
                            !selectedAnswer && !isSubmitted &&
                            currentQuestion && isMcQuestion(currentQuestion) && styles.disabledButton
                        ]}
                        onPress={handleSubmitOrContinue}
                        disabled={
                            currentQuestion && isMcQuestion(currentQuestion) && !selectedAnswer && !isSubmitted
                        }
                    >
                        <TextComponent style={styles.submitButtonText}>
                            {getButtonText()}
                        </TextComponent>
                    </TouchableComponent>
                </View>
            </View>
        </View>
    );
};

export default memo(LessonQuestionScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_48,
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
        fontSize: Dimens.FONT_14,
        color: Colors.COLOR_WHITE,
        marginTop: Dimens.H_4,
    },
    contentContainer: {
        backgroundColor: themeColors.color_app_background,
        flex: 1,
        padding: Dimens.W_16,
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
        paddingVertical: Dimens.H_20,
    },
    bottomContainer: {
        paddingTop: Dimens.H_20,
    },
    resultContainer: {
        padding: Dimens.H_16,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
    },
    correctResult: {
        backgroundColor: '#d4edda',
    },
    incorrectResult: {
        backgroundColor: '#f8d7da',
    },
    resultText: {
        fontSize: Dimens.FONT_16,
        fontWeight: 'bold',
        color: themeColors.color_text,
    },
    submitButton: {
        backgroundColor: themeColors.color_primary,
        padding: Dimens.H_16,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: themeColors.color_text_3,
        opacity: 0.5,
    },
    submitButtonText: {
        fontSize: Dimens.FONT_16,
        fontWeight: 'bold',
        color: Colors.COLOR_WHITE,
    },
});