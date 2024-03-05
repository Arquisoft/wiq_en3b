import { Schema, model } from 'mongoose';

// Verbosing due to TS and Mongoose!!
// Check https://dev.to/lioness100/youre-integrating-typescript-and-mongoose-wrong-1cdo
// Perhaps adding that to NPM

interface QuestionType {
  name: String;
  query: String;
  question_type_entities: String[];
}

const questionTypeSchema = new Schema<QuestionType>({
  name: { type: String, required: true },
  query: { type: String, required: true },
  question_type_entities: { type: [String], required: false }
});

interface Question {
  questionTemplate: String;
  question_type: QuestionType
}

// _id ALREADY ADDED BY MONGOOSE!!
const questionSchema = new Schema<Question>({
  questionTemplate: { type: String, required: true },
  question_type: questionTypeSchema
});

const QuestionModel = model<Question>('Question', questionSchema);

const generateSampleTest = async () => {
  // -------- TEST!! REMOVE THIS DATA SAMPLE....WE NEED ANOTHER WAY TO STORE 
  // TEMPLATES UPON CONSTRUCTION

  // Template for capital of a country
  let aQuestion = new QuestionModel({
    questionTemplate: "What is the Capital of $$$ ?", // $$$ is a placeholder, we will substitute it with the country name
    question_type: {
      name: "Capitals",
      query: `SELECT ?templateLabel ?answerLabel
            WHERE {
              ?template wdt:P31 wd:$$$; # Entity
                      wdt:P36 ?answer.  # Capital 
              SERVICE wikibase:label { bd:serviceParam wikibase:language "en,es"}
            }
            ORDER BY UUID() # Add randomness to the results
            LIMIT 10`,
      question_type_entities: ["Q6256" // Country (any)
        , "Q10742" // Autonomous Community of Spain
        , "Q35657"] // State of the United States
    }
  });

  aQuestion.save()

  aQuestion = new QuestionModel({
    questionTemplate: "What is the Population of $$$?",
    question_type: {
      name: "Demography",
      query: `SELECT ?templateLabel ?answerLabel
            WHERE {
              ?template wdt:P31 wd:$$$;  # Entity
                      wdt:P1082 ?answer. # Population
              SERVICE wikibase:label { bd:serviceParam wikibase:language "en,es"}
            }
            ORDER BY UUID() # Add randomness to the results
            LIMIT 10`,
      question_type_entities: ["Q6256" // Country (any)
        , "Q10742" // Autonomous Community of Spain
        , "Q35657"] // State of the United States
    }
  });

  aQuestion.save()

  // Raúl
  // With this query I can consistently get several tourists attractions/famous places from a country.
  // There are a few things to consider:
  // Some entities may not have an associated label, making it so what is returned is not a name but an 
  // entity in format QXXXXXX. If this happens we will probably need to cancel the creation of the question.
  // We could try to obtain more attractions, but the time to perform the query becomes unfeasible.
  // I could also make it so that several countries are considered. However, it becomes much less consistent.
  // Also, there are countries which do not return any attractions.
  // If we want to generate the question, in this case one query will not be enough.
  // We need to decide what to do:
  // We can do more simple things for now, since this is just the first prototype.
  // We can try to modify the Question Model or find a new way to approach the problem to try manage this type of cases.
  // We could also forget this specific question and go on, but we will probably encounter similar problems
  // in the future.
  // IMPORTANT: Probably there is a better approach for the query below, but with mi current knowledge of 
  // the Wikidata Query Service, I don't know which it's.

  aQuestion = new QuestionModel({
    questionTemplate: "What is a famous place from Peru?",
    question_type: {
      name: "Landmarks",
      query: `SELECT ?templateLabel ?answerLabel
              WHERE {

                ?template wdt:P31/wdt:P279* wd:Q4989906;
                wdt:P17  ?answer.
                
                SERVICE wikibase:label { bd:serviceParam wikibase:language "en,es"}.
                
                {
                  SELECT ?answer
                  WHERE {
                    ?answer wdt:P31 wd:Q6256; # Entity
                  }
                  ORDER BY UUID()
                  LIMIT 1
                }
              }
              ORDER BY UUID() # Add randomness to the results
              LIMIT 2`
    }
  });

  aQuestion.save()

  aQuestion = new QuestionModel({
    questionTemplate: "What is the typical dish of Peru?",
    question_type: {
      name: "Gastronomy",
      query: "DELETE ALL"
    }
  });

  aQuestion.save()
}

export { QuestionModel, generateSampleTest };
