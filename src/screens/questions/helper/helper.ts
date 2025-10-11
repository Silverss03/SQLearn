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

export const validateSqlAnswer = ({ currentQuestion, dragDropAnswer, sqlAnswers } : any) => {
    if (!currentQuestion || !isSqlQuestion(currentQuestion)) return false;

    const data = getSqlQuestionData(currentQuestion);
    if (!data) return false;

    const { solutionData } = data;

    if (currentQuestion.interaction_type === 'drag_drop') {
        const correctOrder = solutionData.order;
        return JSON.stringify(dragDropAnswer.map((item : any) => item.id)) === JSON.stringify(correctOrder);
    } else if (currentQuestion.interaction_type === 'fill_blanks') {
        const correctAnswers = solutionData.answers;
        return Object.keys(correctAnswers).every((key) => sqlAnswers[key] === correctAnswers[key]);
    }

    return false;
};

