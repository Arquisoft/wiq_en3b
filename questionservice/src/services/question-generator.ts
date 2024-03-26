import { QuestionModel } from '../models/question-model';
import { getWikidataSparql } from '@entitree/helper';

const distractorsNumber: number = 3;
const optionsNumber: number = distractorsNumber + 1;
const SPARQL_TIMEOUT = 2000; // 2000 ms = 2s
// Tested manually usign our beloved "Who wrote..." If
// timer runs out, only returns the data that met that requirement (ex: requested 2 questions --> returned 1 question if
// a question lasted too much) --> This can be changed to simply rethrow the error

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
    let questionsArray = await generateQuestionsArray(
      randomQuestionsTemplates
    );

    questionsArray = questionsArray.filter( q => typeof(q) === 'object' );

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
 * @returns the JSON question
 */
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

/**
 * In charge of asking wikidata the sparql query and building JSON question response
 * @param document the template of the question
 * @param templateNumber number of the template
 * @returns JSON with the question and possible answers
 */
const generateQuestionJson = async (
  document: any,
  templateNumber: number
): Promise<object | void> => {
  try {

    // Options may be present...
    let sparqlQuery: string = getSparqlQueryFromDocument(document);

    // Make wikidata request and obtain response
    let wikidataResponse;
    try {
      wikidataResponse = await getWikidataSparqlWithTimeout(sparqlQuery, SPARQL_TIMEOUT);
    } catch(error){
      return ; // simply skipping the production of question since it lasted too long
    }

    // Pick random responses
    var randomIndexes: number[] = generateRandomIndexes(wikidataResponse.length);

    // Generate question
    var questionGen = document.questionTemplate.replace(
      /\$\$\$/g,
      wikidataResponse[randomIndexes[0]].templateLabel
    );

    // Generate answers
    var answersArray: object[] = getRandomResponses(wikidataResponse, randomIndexes);

    // Build it
    return questionJsonBuilder(templateNumber, questionGen, answersArray);
  } catch (error) {
    console.error(error);
    console.error('Error while fetching Wikidata');
    throw error;
  }
};

/**
 * Enhanced Sparql method that adds a timeout to the API call using Promise.race()
 * With this approach, we either obtain the wikidataResponse or an Error stating
 * that the timeout has exceeded. This way, the Question Service will never be
 * kept on hold by waiting the response in case some queries last too long.
 * 
 * @param sparqlQuery the query to prompt into Wikidata Sparql service.
 * @param requestTimeout the timeout in MS for the Service to respond
 * @returns A promise with the aforementioned functionality. 
 */
async function getWikidataSparqlWithTimeout(sparqlQuery: string, requestTimeout: number): Promise<any>{

  // Promise 1: Prompt to Sparql service
  const wikidataPromise = getWikidataSparql(sparqlQuery);
  
  // Promise 2: Timer
  const timeoutPromise = new Promise( (_, reject) => {

    // If timer is exceeded, an error is thrown
    setTimeout(() => reject(new Error("Timeout exceeded for query: " + sparqlQuery )), 
          requestTimeout)

  })

  // Promise.race() => Group an array of Promises into a single one. The result of
  // this new promise is the result of ANY of the promises given.
  return Promise.race( [wikidataPromise, timeoutPromise] )
}

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
