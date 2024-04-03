import { QuestionModel } from '../models/question-model';
const saveQuestions = async (questionsArray: any) => {
    try {
        questionsArray.forEach(async (question: any) => {
            await saveUniqueQuestion(question);
        });
    } catch (err) {
        throw new Error('Error during question generation');
    }
}

const saveUniqueQuestion = async (question: any) => {
    if (question.image != undefined)
        await saveUniqueQuestionImage(question);
    else
        await saveUniqueQuestionNoImage(question);
}

const saveUniqueQuestionImage = async (question: any) => {
    const questionExists = await QuestionModel.exists({ image: question.image });
    if (questionExists == null)
        QuestionModel.create(question);
}

const saveUniqueQuestionNoImage = async (question: any) => {
    const questionExists = await QuestionModel.exists({ question: question.question });
    if (questionExists == null)
        QuestionModel.create(question);
}

export { saveQuestions }