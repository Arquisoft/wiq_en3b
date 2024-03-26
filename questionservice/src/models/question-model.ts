import { Schema, model } from 'mongoose';

// Verbosing due to TS and Mongoose!!
// Check https://dev.to/lioness100/youre-integrating-typescript-and-mongoose-wrong-1cdo
// Perhaps adding that to NPM

interface QuestionType {
  name: String;
  query: String;
  entities: String[];
}

const questionTypeSchema = new Schema<QuestionType>({
  name: { type: String, required: true },
  query: { type: String, required: true },
  entities: { type: [String], required: false },
});

interface Question {
  questionTemplate: String;
  question_type: QuestionType;
}

// _id ALREADY ADDED BY MONGOOSE!!
const questionSchema = new Schema<Question>({
  questionTemplate: { type: String, required: true },
  question_type: questionTypeSchema,
});

const QuestionModel = model<Question>('Question', questionSchema);

const generateSampleTest = () => {
  // -------- TEST!! REMOVE THIS DATA SAMPLE....WE NEED ANOTHER WAY TO STORE
  // TEMPLATES ----- UPON CONSTRUCTION

  // Capital of a place
  let aQuestion = new QuestionModel({
    questionTemplate: 'What is the Capital of $$$ ?', // $$$ is a placeholder, we will substitute it with the country name
    question_type: {
      name: 'Capitals',
      query: `SELECT ?templateLabel ?answerLabel
              WHERE {
                ?template wdt:P31 wd:$$$; # Entity
                        wdt:P36 ?answer.  # Capital
                SERVICE wikibase:label { bd:serviceParam wikibase:language "en,es"}
              }
              ORDER BY UUID() # Add randomness to the results
              LIMIT 10`,
      entities: [
        'Q6256', // Country (any)
        'Q10742', // Autonomous Community of Spain
      ],
    },
  });

  aQuestion.save();

  // Population of a place
  aQuestion = new QuestionModel({
    questionTemplate: 'What is the Population of $$$?',
    question_type: {
      name: 'Demography',
      query: `SELECT ?templateLabel ?answerLabel
              WHERE {
                ?template wdt:P31 wd:$$$;  # Entity
                        wdt:P1082 ?answer. # Population
                SERVICE wikibase:label { bd:serviceParam wikibase:language "en,es"}
              }
              ORDER BY UUID() # Add randomness to the results
              LIMIT 10`,
      entities: [
        'Q6256', // Country (any)
        'Q10742', // Autonomous Community of Spain
        'Q35657', // State of the United States
      ], // City
    },
  });

  aQuestion.save();

  //   // Year on which a city,country,etc was founded
  aQuestion = new QuestionModel({
    questionTemplate: 'On which year was $$$ founded?',
    question_type: {
      name: 'Foundation',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel
        WHERE {
          ?template wdt:P31 wd:$$$; # Entity
                   wdt:P571 ?answer;
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en"}.
          BIND(YEAR(?answer) AS ?answerLabel)

        }
        ORDER BY UUID()
        LIMIT 10
        `,
      entities: [
        'Q6256', // Country (any)
        'Q10742', // Autonomous Community of Spain
        'Q35657', // State of the United States
      ], // City
    },
  });

  aQuestion.save();

  //   // Year in which an event occurred
  aQuestion = new QuestionModel({
    questionTemplate: 'On which year did the $$$ took place?',
    question_type: {
      name: 'Events',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel
          WHERE {
            ?template wdt:P31 wd:$$$; # Entity
                     wdt:P571 ?answer;
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en,es"}.
            BIND(YEAR(?answer) AS ?answerLabel)
          }
          ORDER BY UUID()
          LIMIT 10
          `,
      entities: [
        'Q198', // War
      ],

      // , "Q209715"] // Coronation of a king/queen
    },
  });

  aQuestion.save();

  // Chemical symbol of an element
  // We make a first query searching for any element in the periodic table
  // Then we search for elements with similar associated symbols instead of selecting at random
  // on the results to make the question not so easy
  aQuestion = new QuestionModel({
    questionTemplate: 'What is the chemical symbol of $$$?',
    question_type: {
      name: 'Chemistry',
      query: `SELECT ?templateLabel ?answerLabel
        WHERE
        {
          ?template wdt:P31 wd:Q11344;
                   wdt:P246 ?answer;
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        ORDER BY UUID()
        LIMIT 10
        `,
      entities: [],
    },
  });

  aQuestion.save();

  // Atomic number of an element
  // Here it's not necessary to increase difficulty, it's hard enough.
  aQuestion = new QuestionModel({
    questionTemplate: 'What is the the atomic number of $$$?',
    question_type: {
      name: 'Chemistry',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE
      {
        ?template wdt:P31 wd:Q11344;
                 wdt:P1086 ?answer;
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 10
      `,
      entities: [],
    },
  });
  aQuestion.save();

  // Image Question templates

  // Flag of a country, autonomous community of Spain or USA state
  aQuestion = new QuestionModel({
    questionTemplate: 'This flag is from...?',
    question_type: {
      name: 'Images_Flags',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?answer wdt:P31 wd:$$$; # Entity
                wdt:P41 ?template.  # Capital
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en"}
      }
      ORDER BY UUID() # Add randomness to the results
      LIMIT 5
      `,
      entities: [
        'Q6256', // Country (any)
        'Q10742', // Autonomous Community of Spain
        'Q35657' // State of the United States],
      ]
    },
  });
  aQuestion.save();


  // Guess the person by an image
  // In this case physiscists
  aQuestion = new QuestionModel({
    questionTemplate: 'Who is this physiscist?',
    question_type: {
      name: 'Images_Physics',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?answer wdt:P31 wd:Q5;  # Instance of human
                wdt:P106 wd:Q169470;  # Occupation: "physicist"
                wdt:P18 ?template;
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      LIMIT 5    
      `,
      entities: []
    },
  });
  aQuestion.save();

  // Guess the person by an image
  // In this case inventors
  aQuestion = new QuestionModel({
    questionTemplate: 'Who is this inventor?',
    question_type: {
      name: 'Images_Inventor',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?answer wdt:P31 wd:Q5;  # Instance of human
                wdt:P106 wd:Q937857;  # Occupation: "footbal player"
                wdt:P18 ?template;
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      LIMIT 5  
      `,
      entities: []
    },
  });
  aQuestion.save();

};

export { QuestionModel, generateSampleTest };
