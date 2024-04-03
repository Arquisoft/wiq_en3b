import { QuestionModel } from '../models/question-model';
/**
 * Stores the questions in the database.
 * If these questions are already on the database, they won't stored.
 * @param questionsArray array of questions to be stored
 */
const saveQuestions = async (questionsArray: any) => {
    try {
        questionsArray.forEach(async (question: any) => {
            await saveUniqueQuestion(question);
        });
    } catch (err) {
        throw new Error('Error during question generation');
    }
}

/**
 * Stores a question in the database.
 * @param question 
 */
const saveUniqueQuestion = async (question: any) => {
    if (question.image != undefined)
        await saveUniqueQuestionImage(question);
    else
        await saveUniqueQuestionNoImage(question);
}

/**
 * Stores a question with image in the database.
 * @param question the question to be stored
 */
const saveUniqueQuestionImage = async (question: any) => {
    const questionExists = await QuestionModel.exists({ image: question.image });
    if (questionExists == null)
        QuestionModel.create(question);
}

/**
 * Stores a question without image in the database.
 * @param question the question to be stored
 */
const saveUniqueQuestionNoImage = async (question: any) => {
    const questionExists = await QuestionModel.exists({ question: question.question });
    if (questionExists == null)
        QuestionModel.create(question);
}

export { saveQuestions }