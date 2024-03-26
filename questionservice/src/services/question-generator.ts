import { QuestionModel } from '../models/question-model';
import { getWikidataSparql } from '@entitree/helper';

const distractorsNumber: number = 3;
const optionsNumber: number = distractorsNumber + 1;

/**
 * Interface for a question which may or not contain an image
 */
interface Question {
  id: number,
  question: string,
  answers: object[],
  correctAnswerId: number,
  image?: string
}

/**
 * Generates n random questions  using Wikidata
 * @param n number of questions to be generated
 * @returns array containing questions and possible answers
 */
async function generateQuestions(n: number): Promise<object[] | void> {
  try {
    // Obtain n random documents
    const randomQuestionsTemplates = await QuestionModel.aggregate([
      { $sample: { size: n } },
    ]);

    // Generate and return questions generated from those documents
    const questionsArray = await generateQuestionsArray(
      randomQuestionsTemplates
    );
    return questionsArray;
  } catch (error) {
    throw error;
  }
}

/**
 * Generates an array of questions given a set of templates
 * @param randomQuestionsTemplates Array of templates
 * @returns array containing questions in JSON format
 */
const generateQuestionsArray = async (
  randomQuestionsTemplates: any
): Promise<object[]> => {
  // For each questionTemplate, we generate an async func to generate the questions
  // and its answers
  const promises = randomQuestionsTemplates.map(
    async (template: any, i: number) => {
      try {
        console.log('Generating question of type ' + template.question_type.name);
        const questionJson = await generateQuestionJson(template, i);
        console.log('Question generated!');

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


/**
 * Gets a random item from an array
 * @param array 
 * @returns A random item from the array
 */
function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Builds a question JSON out of parameters
 * @param templateNumber number of the template
 * @param questionGen  Question generated
 * @param answersArray  Array of answers
 * @param image  Image URL which is optional
 * @returns the JSON question
 */
const questionJsonBuilder = (
  templateNumber: number,
  questionGen: string,
  answersArray: object[],
  image: string = ""
): object => {
  const myJson: Question = {
    id: templateNumber,
    question: questionGen,
    answers: answersArray,
    correctAnswerId: 1,
  };

  if (image != "") {
    myJson.image = image;
  }

  return myJson;
};

/**
 * In charge of asking wikidata the sparql query and building JSON question response
 * @param questionTemplate the template of the question
 * @param templateNumber number of the template
 * @returns JSON with the question and possible answers
 */
const generateQuestionJson = async (
  questionTemplate: any,
  templateNumber: number
): Promise<object | void> => {
  try {

    // Options may be present...
    let sparqlQuery: string = getSparqlQueryFromDocument(questionTemplate);

    // Make wikidata request and obtain response
    const wikidataResponse = await getWikidataSparql(sparqlQuery);

    // Pick random responses
    var randomIndexes: number[] = generateRandomIndexes(wikidataResponse.length);

    // Generate question
    var questionGen = questionTemplate.questionTemplate.replace(
      /\$\$\$/g,
      wikidataResponse[randomIndexes[0]].templateLabel
    );

    // Check if the question is an image question
    let image = null;
    if (questionTemplate.question_type.name.includes('Images')) {
      image = wikidataResponse[randomIndexes[0]].templateLabel;
    }

    // Generate answers
    var answersArray: object[] = getRandomResponses(wikidataResponse, randomIndexes);

    // Build it
    if (image != null)
      return questionJsonBuilder(templateNumber, questionGen, answersArray, image);
    else
      return questionJsonBuilder(templateNumber, questionGen, answersArray);
  } catch (error) {
    console.error(error);
    console.error('Error while fetching Wikidata');
    throw error;
  }
};

/**
 * Generates random indexes for the answers
 * @param length length of the array
 * @param numberOfIndexes number of indexes to generate
 * @returns an array with the indexes
 */
function generateRandomIndexes(length: number, numberOfIndexes: number = optionsNumber) {
  var randomIndexes: number[] = [];
  for (var i = 0; i < numberOfIndexes; i++) {
    var possibleRandom = Math.floor(Math.random() * length);
    while (randomIndexes.includes(possibleRandom))
      possibleRandom = Math.floor(Math.random() * length);

    randomIndexes[i] = possibleRandom;
  }
  return randomIndexes;
}

/**
 * Includes the eligible entities on the SPARQL query and returns it
 * @param sparqlQuery the query
 * @param document document
 * @returns the query with the entities included, if possible
 */
function getSparqlQueryFromDocument(document: any): string {
  let sparqlQuery: string = document.question_type.query;
  let optionEntities = document.question_type.entities as string[];
  if (optionEntities.length > 0) {
    var randomEntity = getRandomItem(optionEntities);
    sparqlQuery = sparqlQuery.replace(/\$\$\$/g, randomEntity);
  }
  return sparqlQuery;
}


/**
 * Generates random responses from the values returned by Wikidata
 * @param wikidataResponse response from Wikidata
 * @param randomIndexes array of random indexes
 * @returns array of answers
 */
function getRandomResponses(wikidataResponse: any, randomIndexes: number[]): any {
  let answersArray: object[] = [];
  for (var i = 0; i < optionsNumber; i++) {
    var answer = wikidataResponse[randomIndexes[i]].answerLabel;
    answersArray[i] = {
      id: i + 1,
      text: answer,
    };
  }
  return answersArray;
}

export { generateQuestions };
