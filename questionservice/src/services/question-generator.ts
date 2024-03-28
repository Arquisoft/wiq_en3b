import { QuestionModel } from '../models/question-model';
import { getWikidataSparql } from '@entitree/helper';
import { getTranslatedQuestions } from './translation-service';

// Gets a random Item from an array
function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Builds a question JSON out of parameters
const questionJsonBuilder = (
  templateNumber: number,
  questionGen: string,
  answersArray: object[]
): object => {
  const myJson = {
    id: templateNumber,
    question: questionGen,
    answers: answersArray,
    correctAnswerId: 1,
  };

  return myJson;
};

// In charge of asking wikidata the sparql query and building JSON question response
const generateQuestionJson = async (
  document: any,
  templateNumber: number
): Promise<object | void> => {
  try {
    // Template Query
    var sparqlQuery: string = document.question_type.query;

    // Options may be present...
    var optionEntities = document.question_type.entities as string[];
    if (optionEntities.length > 0) {
      var randomEntity = getRandomItem(optionEntities);
      sparqlQuery = sparqlQuery.replace(/\$\$\$/g, randomEntity);
    }

    console.log('Stuck?');
    // Make wikidata request and obtain response
    const res = await getWikidataSparql(sparqlQuery);
    console.log('No');

    // Pick random responses
    var randomIndexes: number[] = [];
    for (var i = 0; i < 4; i++) {
      var possibleRandom = Math.floor(Math.random() * res.length);
      while (randomIndexes.includes(possibleRandom))
        possibleRandom = Math.floor(Math.random() * res.length);

      randomIndexes[i] = possibleRandom;
    }

    // Generate question
    var questionGen = document.questionTemplate.replace(
      /\$\$\$/g,
      res[randomIndexes[0]].templateLabel
    );

    // Generate answers
    var answersArray: object[] = [];
    for (var i = 0; i < 4; i++) {
      var answer = res[randomIndexes[i]].answerLabel;
      answersArray[i] = {
        id: i + 1,
        text: answer,
      };
    }

    // Build it
    return questionJsonBuilder(templateNumber, questionGen, answersArray);
  } catch (error) {
    console.error('Error while fetching Wikidata');
    throw error;
  }
};

// Generate the JSON questions Array
const generateQuestionsArray = async (
  randomQuestionsTemplates: any
): Promise<object[]> => {
  // Simply a fx to add the JSON questions to the Array

  // For each questionTemplate, we generate an async func to generate the questions
  // and its answers
  const promises = randomQuestionsTemplates.map(
    async (template: any, i: number) => {
      try {
        const questionJson = await generateQuestionJson(template, i);

        return questionJson;
      } catch (error) {
        console.error(
          'Error while generating question for template: ' + template
        );
        throw error;
      }
    }
  );

  return Promise.all(promises);
};

const translateQuestionsArray = async (
  questionsArray: any,
  language: any
): Promise<object[]> => {
  try {
    const translation: any[] = await getTranslatedQuestions(
      questionsArray,
      language
    );

    translation.forEach((translation: any, i: number) => {
      questionsArray[i].question = translation.question;
      questionsArray[i].answers = translation.answers;
    });
  } catch (err) {
    console.error(err);
    throw new Error('Error during translation');
  }

  return questionsArray;
};

// Principal function in charge of generating the questions
async function generateQuestions(
  n: number,
  lang: any
): Promise<object[] | void> {
  try {
    // Generating sample test. TODO: To be removed for next iteration

    // Obtain n random documents
    const randomQuestionsTemplates = await QuestionModel.aggregate([
      { $sample: { size: n } },
    ]);

    // Generate and return questions generated from those documents
    const questionsArray = await generateQuestionsArray(
      randomQuestionsTemplates
    );

    console.log(questionsArray);

    if (lang && lang.toLowerCase() !== 'en') {
      return await translateQuestionsArray(questionsArray, lang);
    }

    return questionsArray;
  } catch (error) {
    throw error;
  }
}

export { generateQuestions };
