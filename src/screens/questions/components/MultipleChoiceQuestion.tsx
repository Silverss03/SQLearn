import TextComponent from '@src/components/TextComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import { QuestionType } from '@src/network/dataTypes/question-types';
import useThemeColors from '@src/themes/useThemeColors';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

const MultipleChoiceQuestion = ({ currentQuestion, isSubmitted, selectedAnswer, setSelectedAnswer } : {currentQuestion: QuestionType.McqQuestion, isSubmitted: boolean, selectedAnswer: string | null, setSelectedAnswer: (answer: string) => void}) => {
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
            if (answer === currentQuestion?.correct_answer) {
                baseStyle.push(styles.correctAnswer) ;
            } else if (selectedAnswer === answer && answer !== currentQuestion?.correct_answer) {
                baseStyle.push(styles.incorrectAnswer) ;
            }
        }

        return baseStyle;
    }, [currentQuestion?.correct_answer, isSubmitted, selectedAnswer, styles.answerOption, styles.correctAnswer, styles.incorrectAnswer, styles.selectedAnswer]);
    return (
        <View>
            <TextComponent style={styles.questionText}>
                {currentQuestion.description}
            </TextComponent>

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
                            {option.key}
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
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedAnswer: {
        borderColor: themeColors.color_primary,
        backgroundColor: `${themeColors.color_primary}20`,
    },
    correctAnswer: {
        borderColor: '#28a745',
        backgroundColor: '#d4edda',
    },
    incorrectAnswer: {
        borderColor: '#dc3545',
        backgroundColor: '#f8d7da',
    },
    answerLabel: {
        fontSize: Dimens.FONT_16,
        fontWeight: 'bold',
        color: themeColors.color_text,
        width: Dimens.W_32,
        textAlign: 'center',
        marginRight: Dimens.W_12,
    },
    answerText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text,
        flex: 1,
    },
    questionText: {
        fontSize: Dimens.FONT_18,
        fontWeight: '600',
        color: themeColors.color_text,
        marginBottom: Dimens.H_32,
        textAlign: 'center',
    },
});

export default MultipleChoiceQuestion;