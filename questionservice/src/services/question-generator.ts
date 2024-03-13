import { QuestionModel } from '../models/question-model';
import { getWikidataSparql } from '@entitree/helper';

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

  console.log('23');
  console.log(myJson);

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

    // Make wikidata request and obtain response
    const res = await getWikidataSparql(sparqlQuery);

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
  var resQuestions: object[] = [];
  const addObjectResponse = function (res: any) {
    resQuestions.push(res);
  };

  // For each questionTemplate, we generate an async func to generate the questions
  // and its answers
  const promises = randomQuestionsTemplates.map(
    async (template: any, i: number) => {
      try {
        const res = await generateQuestionJson(template, i);
        addObjectResponse(res);
      } catch (error) {
        console.error(
          'Error while generating question for template: ' + template
        );
        throw error;
      }
    }
  );

  // Waiting for the full generation of questions, it blocks the execution!!!
  // TODO: think of a way to optimize this
  await Promise.all(promises);

  return resQuestions;
};

// Principal function in charge of generating the questions
async function generateQuestions(n: number): Promise<object[] | void> {
  try {
    // Generating sample test. TODO: To be removed for next iteration

    // Obtain n random documents
    const randomQuestionsTemplates = await QuestionModel.aggregate([
      { $sample: { size: n } },
    ]);
    // console.log('124');
    // console.log(randomQuestionsTemplates[0].question_type.name);

    // Generate and return questions generated from those documents
    const questionsArray = await generateQuestionsArray(
      randomQuestionsTemplates
    );
    return questionsArray;
  } catch (error) {
    throw error;
  }
}

export { generateQuestions };
