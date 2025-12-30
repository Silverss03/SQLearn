import TextComponent from '@src/components/TextComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import { QuestionType } from '@src/network/dataTypes/question-types';
import useThemeColors from '@src/themes/useThemeColors';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

const MultipleChoiceQuestion = ({ currentQuestion, isSubmitted, selectedAnswer, setSelectedAnswer, isChapterExercise = false } : {currentQuestion: QuestionType.McqQuestion, isSubmitted: boolean, selectedAnswer: string | null, setSelectedAnswer: (answer: string) => void, isChapterExercise?: boolean}) => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);

    const handleAnswerSelect = useCallback((answer: string) => {
        if (isSubmitted) return;
        setSelectedAnswer(answer);
    }, [isSubmitted, setSelectedAnswer]);

    const getAnswerStyle = useCallback((answer: string) => {
        const baseStyle = [styles.answerOption];

        if (!isSubmitted) {
            if (selectedAnswer === answer) {
                baseStyle.push(styles.selectedAnswer) ;
            }
        } else {
            if (!isChapterExercise) {
                if (answer === currentQuestion?.correct_answer) {
                    baseStyle.push(styles.correctAnswer) ;
                } else if (selectedAnswer === answer && answer !== currentQuestion?.correct_answer) {
                    baseStyle.push(styles.incorrectAnswer) ;
                }
            }
        }

        return baseStyle;
    }, [currentQuestion?.correct_answer, isChapterExercise, isSubmitted, selectedAnswer, styles.answerOption, styles.correctAnswer, styles.incorrectAnswer, styles.selectedAnswer]);
    return (
        <View>
            <View style={styles.questionDescription}>
                <TextComponent style={styles.questionText}>
                    {currentQuestion.description}
                </TextComponent>
            </View>

            <View style={styles.answersContainer}>
                {[
                    { key: 'A', text: currentQuestion.answer_A },
                    { key: 'B', text: currentQuestion.answer_B },
                    { key: 'C', text: currentQuestion.answer_C },
                    { key: 'D', text: currentQuestion.answer_D },
                ].map((option) => (
                    <TouchableComponent
                        key={option.key}
                        style={getAnswerStyle(option.key)}
                        onPress={() => handleAnswerSelect(option.key)}
                        disabled={isSubmitted}
                    >
                        <TextComponent style={styles.answerLabel}>
                            {option.key}.
                        </TextComponent>
                        <TextComponent style={styles.answerText}>
                            {option.text}
                        </TextComponent>
                    </TouchableComponent>
                ))}
            </View>
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    answersContainer: {
        marginTop: Dimens.H_20,
    },
    answerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_16,
        marginBottom: Dimens.H_12,
        borderRadius: Dimens.RADIUS_8,
        borderWidth: 1,
        borderColor: themeColors.color_question_border,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    selectedAnswer: {
        borderColor: themeColors.color_primary,
        borderWidth: 2,
    },
    correctAnswer: {
        borderColor: themeColors.color_text_correct,
    },
    incorrectAnswer: {
        borderColor: themeColors.color_text_incorrect,
    },
    answerLabel: {
        fontSize: Dimens.FONT_16,
        fontWeight: 'bold',
        color: themeColors.color_text_2,
        width: Dimens.W_32,
        textAlign: 'center',
        marginRight: Dimens.W_12,
    },
    answerText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
        flex: 1,
    },
    questionText: {
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_32,
        textAlign: 'center',
    },
    questionDescription: {
        borderWidth: 1,
        borderColor: themeColors.color_question_border,
        padding: Dimens.W_16,
        borderRadius: Dimens.RADIUS_4,
        backgroundColor: themeColors.color_question_background
    }
});

export default MultipleChoiceQuestion;