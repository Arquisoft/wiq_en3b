import { QuestionModel } from '../models/question-model';
import {
  getRandomItem,
  getWikidataSparqlWithTimeout,
  Question,
} from '../utils/question-generator-utils';
import { getTranslatedQuestions } from './translation-service';

const distractorsNumber: number = 3;
const optionsNumber: number = distractorsNumber + 1;
const SPARQL_TIMEOUT = 5000; // 5000 ms = 5s
// Tested manually usign our beloved "Who wrote..." If
// timer runs out, only returns the data that met that requirement (ex: requested 2 questions --> returned 1 question if
// a question lasted too much) --> This can be changed to simply rethrow the error

/**
 * Generates n random questions  using Wikidata
 * @param n number of questions to be generated
 * @returns array containing questions and possible answers
 */
async function generateQuestions(
  n: number,
  lang: any
): Promise<object[] | void> {
  try {
    // Trying to obtain n random documents
    let randomQuestionsTemplates = await getRandomQuestions(n);

    // Generate and return questions generated from those documents
    let questionsArray = await generateQuestionsArray(randomQuestionsTemplates);

    // Skipping questions not generated a.k.a. void
    questionsArray = questionsArray.filter(q => typeof q === 'object');

    if (lang && lang.toLowerCase() !== 'en') {
      return await translateQuestionsArray(questionsArray, lang);
    }

    return questionsArray;
  } catch (error) {
    throw error;
  }
}

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

/*
  My initial approach was:
  while(templates.length < n){
    ...
    // Causes unexpected behaviour due to loops and awaits (concurrency) 
    // If query was size = 9, it was adding 5 + 4 + 3 + 2 + 1 instead of 5 + 4)
    additionalQuestions = await ... 

    // Appart from that, this part was adding directly the arrays: 
    // randomQuestions = [t1, t2, t3, t4, t5, [t6, t7, t8, t9], [t10, t11, t12], ...]
    randomQuestions.push(additional Questions)
    ...
  }

  In conclusion, careful with loops and concurrency issues. Also, have in mind
  this curious feature of "..." for pushing arrays
*/
async function getRandomQuestions(n: number): Promise<any[]> {
  // We try to obtain the whole random templates
  let randomQuestionsTemplates = await QuestionModel.aggregate([
    { $sample: { size: n } },
  ]);

  async function addMoreRandomQuestionsIfNeeded() {
    // If required questions are fulfilled, simply returning the questions
    if (randomQuestionsTemplates.length >= n) return randomQuestionsTemplates;

    // Up to here, we need more documents. We calculate the remaining ones
    const remaining = n - randomQuestionsTemplates.length;

    // Fetch again from DB more templates
    const additionalQuestions = await QuestionModel.aggregate([
      { $sample: { size: remaining } },
    ]);
    // ... additionalQuestions -> this is called "sparse" syntax
    // is used to concatenate the elements of array individually and not the whole array
    // otherwise, the result would be:
    randomQuestionsTemplates.push(...additionalQuestions);

    // This recursive calls are helpful for performing awaits inside while loops
    return addMoreRandomQuestionsIfNeeded();
  }

  // call function that add more if needed
  return addMoreRandomQuestionsIfNeeded();
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
        return await generateQuestionJson(template, i);
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

    // Try a wikidata request
    let wikidataResponse;
    try {
      wikidataResponse = await getWikidataSparqlWithTimeout(
        sparqlQuery,
        SPARQL_TIMEOUT
      );
    } catch (error) {
      // If an error has occured (timeout), retry again with a fast query

      try {
        questionTemplate = await QuestionModel.findOne({
          'question_type.name': 'Chemistry',
        });
        sparqlQuery = getSparqlQueryFromDocument(questionTemplate);
        wikidataResponse = await getWikidataSparqlWithTimeout(
          sparqlQuery,
          SPARQL_TIMEOUT
        );
      } catch (error) {
        // an error occurred again (timeout), this time skipping
        return;
      }
    }

    // Pick random responses
    var randomIndexes: number[] = generateRandomIndexes(
      wikidataResponse.length
    );

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
    var answersArray: object[] = getRandomResponses(
      wikidataResponse,
      randomIndexes
    );

    // Build it
    if (image != null)
      return questionJsonBuilder(
        templateNumber,
        questionGen,
        answersArray,
        image
      );
    else return questionJsonBuilder(templateNumber, questionGen, answersArray);
  } catch (error) {
    console.error('Error while fetching Wikidata');
    throw error;
  }
};

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
  image: string = ''
): object => {
  const myJson: Question = {
    id: templateNumber,
    question: questionGen,
    answers: answersArray,
    correctAnswerId: 1,
  };

  if (image != '') {
    myJson.image = image;
  }

  return myJson;
};

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
 * Generates random indexes for the answers
 * @param length length of the array
 * @param numberOfIndexes number of indexes to generate
 * @returns an array with the indexes
 */
function generateRandomIndexes(
  length: number,
  numberOfIndexes: number = optionsNumber
) {
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
 * Generates random responses from the values returned by Wikidata
 * @param wikidataResponse response from Wikidata
 * @param randomIndexes array of random indexes
 * @returns array of answers
 */
function getRandomResponses(
  wikidataResponse: any,
  randomIndexes: number[]
): any {
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
