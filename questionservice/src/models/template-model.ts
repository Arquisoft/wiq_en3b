import { Schema, model } from 'mongoose';

// Verbosing due to TS and Mongoose!!
// Check https://dev.to/lioness100/youre-integrating-typescript-and-mongoose-wrong-1cdo
// Perhaps adding that to NPM

interface QuestionType {
  name: string;
  query: string;
  entities: string[];
  typeName: string;
}

const questionTypeSchema = new Schema<QuestionType>({
  name: { type: String, required: true },
  query: { type: String, required: true },
  entities: { type: [String], required: false },
  typeName: { type: String, required: true },
});

interface Question {
  questionTemplate: string;
  question_type: QuestionType;
}

// _id ALREADY ADDED BY MONGOOSE!!
const templateSchema = new Schema<Question>({
  questionTemplate: { type: String, required: true },
  question_type: questionTypeSchema,
});

const TemplateModel = model<Question>('Template', templateSchema);

const addQuestionTemplate = (questionTemplate: any) => {
  let aQuestion = new TemplateModel(questionTemplate);

  aQuestion.save();
}

const generateSampleTest = () => {

  // Capital of a place
  addQuestionTemplate({
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
      typeName: 'geography',
    },
  });


  // Population of a place
  addQuestionTemplate({
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
      ],
      typeName: 'geography',
    },
  });


  //   // Year on which a city,country,etc was founded
  addQuestionTemplate({
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
      ],
      typeName: 'history',
    },
  });


  //   // Year in which an event occurred
  addQuestionTemplate({
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
        'Q198' // War
      ],
      typeName: 'history',
    },
  });

  // Chemical symbol of an element
  // We make a first query searching for any element in the periodic table
  // Then we search for elements with similar associated symbols instead of selecting at random
  // on the results to make the question not so easy
  addQuestionTemplate({
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
      typeName: 'science',
    },
  });


  // Atomic number of an element
  // Here it's not necessary to increase difficulty, it's hard enough.
  addQuestionTemplate({
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
      typeName: 'science',
    },
  });

  // Image Question templates

  // Flag of a country, autonomous community of Spain or USA state
  addQuestionTemplate({
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
      ],
      typeName: 'geography',
    },
  });


  // Guess the person by an image
  // In this case physiscists
  addQuestionTemplate({
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
      entities: [],
      typeName: 'science',
    },
  });

  // Guess the person by an image
  // In this case inventors
  addQuestionTemplate({
    questionTemplate: 'Who is this inventor?',
    question_type: {
      name: 'Images_Inventor',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?answer wdt:P31 wd:Q5;  # Instance of human
                wdt:P106 wd:Q937857;  # Occupation: "inventor"
                wdt:P18 ?template;
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      LIMIT 5  
      `,
      entities: [],
      typeName: 'science',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'What is the official language of $$$?',
    question_type: {
      name: 'Language',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel
      WHERE {
        ?template wdt:P31 wd:Q6256; 
                 wdt:P1082 ?population. 
        ?template wdt:P37 ?answer. 
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5
      `,
      entities: [],
      typeName: 'geography',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'Where did the Olympic Games of $$$ take place?',
    question_type: {
      name: 'Olympics',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?olympicGame wdt:P31 wd:Q159821; # Instances of Olympic Games
                     wdt:P276 ?answer;
                     wdt:P585 ?date.
        BIND(YEAR(?date) AS ?templateLabel)
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5      
      `,
      entities: [],
      typeName: 'sports',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'Where did the Winter Olympic Games of $$$ take place?',
    question_type: {
      name: 'Olympics',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?olympicGame wdt:P31 wd:Q82414; # Instances of Winter Olympic Games
                     wdt:P276 ?answer;
                     wdt:P585 ?date.
        BIND(YEAR(?date) AS ?templateLabel)
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5      
      `,
      entities: [],
      typeName: 'sports',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'What is the capacity of $$$?',
    question_type: {
      name: 'Stadiums',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?template wdt:P31 wd:Q483110;      # Instances of stadiums
                 wdt:P1083 ?answer.    
        FILTER (?answer >= 40000)     
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5
           
      `,
      entities: [],
      typeName: 'sports',
    },
  });


  addQuestionTemplate({
    questionTemplate: 'Which stadium is this?',
    question_type: {
      name: 'Images_Stadiums',
      query: `SELECT ?templateLabel ?answerLabel
      WHERE {
        ?answer wdt:P31 wd:Q483110;      # Instances of stadiums
                 wdt:P1083 ?capacity;
                 wdt:P18 ?template.
        FILTER (?capacity >= 40000)     
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5      
      `,
      entities: [],
      typeName: 'sports',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'Who is this football player?',
    question_type: {
      name: 'Images_FootballPlayers',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel  WHERE {
        ?answer wdt:P106 wd:Q937857;
                wdt:P21 wd:Q6581097;  # Male gender
                wdt:P27 wd:$$$;       # Nationality
                wdt:P569 ?birthDate.
        FILTER (YEAR(?birthDate) > 1980)
        ?answer wdt:P18 ?template.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5      
      `,
      entities: [
        'Q21',    // England
        'Q29',    // Spain
        'Q142',   // France
        'Q183',   // Germany
        'Q38'     // Italy
      ],
      typeName: 'sports',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'Who is this football player?',
    question_type: {
      name: 'Images_FootballPlayers',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel  WHERE {
        ?answer wdt:P106 wd:Q937857;
                wdt:P21 wd:Q6581072;  # Female gender
                wdt:P27 wd:$$$;       # Nationality
                wdt:P569 ?birthDate.
        FILTER (YEAR(?birthDate) > 1980)
        ?answer wdt:P18 ?template.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5          
      `,
      entities: [
        'Q21',    // England
        'Q29',    // Spain
        'Q142',   // France
        'Q183',   // Germany
        'Q38'     // Italy
      ],
      typeName: 'sports',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'What is the size in square kilometers of $$$?',
    question_type: {
      name: 'CountriesArea',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel WHERE {
        ?template wdt:P31 wd:Q6256;   # Instance of country
                 wdt:P2046 ?answerLabel.   # Area of the country
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      ORDER BY UUID()
      LIMIT 5              
      `,
      entities: [],
      typeName: 'geography',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'Which painting is this?',
    question_type: {
      name: 'Images_Paintings',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel WHERE {
        ?answer wdt:P31 wd:Q3305213;    # Instance of painting
                  wdt:P18 ?template;    # Image of the painting
                  wdt:P135 wd:$$$.      # Genre
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5
      `,
      entities: [
        'Q947129', // Gothic painting
        'Q37068', // Romanticism painting
      ],
      typeName: 'art',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'Which painting is this?',
    question_type: {
      name: 'Images_Paintings',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel WHERE {
        ?answer wdt:P31 wd:Q3305213;    # Instance of painting
                  wdt:P18 ?template;    # Image of the painting
                  wdt:P170 wd:$$$.    
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY UUID()
      LIMIT 5
      `,
      entities: [
        'Q5582', // Van Gogh
        'Q104884', // Caspar David Friedrich
        'Q5593', // Pablo Picasso
        'Q5598', // Rembrandt
        'Q296', // Monet
        'Q5597', // Raphael
        'Q5432' // Goya
      ],
      typeName: 'art',
    },
  });

  addQuestionTemplate({
    questionTemplate: 'Which sculpture is this?',
    question_type: {
      name: 'Images_Sculptures',
      query: `SELECT DISTINCT ?templateLabel ?answerLabel WHERE {
        ?answer wdt:P31 wd:Q860861;    # Instance of sculpture
                   wdt:P18 ?template.        # Image of the sculpture
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      LIMIT 5
      `,
      entities: [],
      typeName: 'art',
    },
  });
};

export { TemplateModel, generateSampleTest };
