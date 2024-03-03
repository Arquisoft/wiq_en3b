import {Schema, model} from 'mongoose';

// Verbosing due to TS and Mongoose!!
// Check https://dev.to/lioness100/youre-integrating-typescript-and-mongoose-wrong-1cdo
// Perhaps adding that to NPM

interface QuestionType{
  name: String;
  query: String;
}

const questionTypeSchema = new Schema<QuestionType>({
  name: { type: String,  required: true},
  query: { type: String,  required: true }
});

interface Question {
  questionTemplate: String;
  question_type: QuestionType
}

// _id ALREADY ADDED BY MONGOOSE!!
const questionSchema = new Schema<Question>({
  questionTemplate: {type: String, required: true},
  question_type: questionTypeSchema
});

const QuestionModel = model<Question>('Question', questionSchema);

const generateSampleTest =  async () => {
  // -------- TEST!! REMOVE THIS DATA SAMPLE....WE NEED ANOTHER WAY TO STORE 
// TEMPLATES UPON CONSTRUCTION
let aQuestion = new QuestionModel({
  questionTemplate: "What is the Capital of Peru?",
  question_type:{
    name: "Capitals",
    query: "DELETE ALL"
  }
});

aQuestion.save()

aQuestion = new QuestionModel({
  questionTemplate: "What is the Population of Peru?",
  question_type:{
    name: "Demography",
    query: "DELETE ALL"
  }
});

aQuestion.save()

aQuestion = new QuestionModel({
  questionTemplate: "What is a famous place from Peru?",
  question_type:{
    name: "Landmarks",
    query: "DELETE ALL"
  }
});

aQuestion.save()

aQuestion = new QuestionModel({
  questionTemplate: "What is the typical dish of Peru?",
  question_type:{
    name: "Gastronomy",
    query: "DELETE ALL"
  }
});

aQuestion.save()
}

export {QuestionModel, generateSampleTest};
