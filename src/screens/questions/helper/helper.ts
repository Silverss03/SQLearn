import { DuoDragDropRef } from '@jamsch/react-native-duo-drag-drop';
import { QuestionType } from '@src/network/dataTypes/question-types';

export const isMcQuestion = (question: any) : question is QuestionType.McqQuestion => 'answer_A' in question ;
export const isSqlQuestion = (question: any) : question is QuestionType.SqlQuestion => 'interaction_type' in question ;

export const getSqlQuestionData = (question: QuestionType.SqlQuestion) => {
    try {
        const questionData = JSON.parse(question.question_data);
        const solutionData = JSON.parse(question.solution_data);
        return { questionData, solutionData };
    } catch (error) {
        console.error('Error parsing SQL question data:', error);
        return { questionData: null, solutionData: null };
    }
};

export const validateSqlAnswer = ({ currentQuestion, dragDropAnswer, sqlAnswers }: any) => {
    if (!currentQuestion || !isSqlQuestion(currentQuestion)) return false;

    const data = getSqlQuestionData(currentQuestion);
    if (!data) return false;

    const { solutionData } = data;

    if (currentQuestion.interaction_type === 'drag_drop') {
        const correctAnswer = solutionData.query;
        console.log('Correct Answer:', correctAnswer);
        console.log('User Answer:', dragDropAnswer);
        return dragDropAnswer === correctAnswer;
    } else if (currentQuestion.interaction_type === 'fill_blanks') {
        const correctAnswers = solutionData.answers;
        return Object.keys(correctAnswers).every((key) => sqlAnswers[key] === correctAnswers[key]);
    }

    return false;
};

export const canSubmit = ({ currentQuestion, selectedAnswer, sqlAnswers }: any) => {
    if (currentQuestion && isMcQuestion(currentQuestion)) {
        return !!selectedAnswer;
    }
    if (currentQuestion && isSqlQuestion(currentQuestion)) {
        if (currentQuestion.interaction_type === 'drag_drop') {
            return 1;
        }
        if (currentQuestion.interaction_type === 'fill_blanks') {
            const data = getSqlQuestionData(currentQuestion);
            if (data) {
                return data.questionData.blanks.every((blank: any) =>
                    sqlAnswers[blank.index.toString()]
                );
            }
        }
    }
    return false;
};

export const getButtonText = ({ isSubmitted, isLastQuestion, t }: any) => {
    if (!isSubmitted) {
        return t('Kiểm tra');
    }
    return isLastQuestion ? t('Hoàn thành') : t('Tiếp tục');
};

export const getCorrectAnswerText = ({ currentQuestion, t } : any) => {
    if (currentQuestion && isMcQuestion(currentQuestion)) {
        const correctOption = [
            { key: 'A', text: currentQuestion.answer_A },
            { key: 'B', text: currentQuestion.answer_B },
            { key: 'C', text: currentQuestion.answer_C },
            { key: 'D', text: currentQuestion.answer_D },
        ].find((option) => option.key === currentQuestion.correct_answer);

        return t('Đáp án đúng: {{answer}}', { answer: correctOption ? `${correctOption.key}. ${correctOption.text}` : '' });
    }

    if (currentQuestion && isSqlQuestion(currentQuestion)) {
        const data = getSqlQuestionData(currentQuestion);
        if (data) {
            return t(`Câu truy vấn đúng: ${data.solutionData.query}`);
        }
    }
};

