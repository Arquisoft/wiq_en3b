import { Question } from "../utils/question-generator-utils";
import { Schema, model } from 'mongoose';


const questionSchema = new Schema<Question>({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    answers: { type: [Object], required: true },
    correctAnswerId: { type: Number, required: true },
    image: { type: String, required: false }
});

const QuestionModel = model<Question>('Question', questionSchema);


export { QuestionModel }