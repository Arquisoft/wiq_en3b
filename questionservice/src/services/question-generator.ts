import {QuestionModel,generateSampleTest} from '../models/question-model'
import { getWikidataSparql } from '@entitree/helper';

let onlyOnce = true; // TODO: REMOVE

const generateQuestions = async (n: number) =>{
    
    console.log("The number of questions to retrieve are: " + n)
    
    // Generating 5 questions template --> TEST
    if(onlyOnce){
        await generateSampleTest();
        onlyOnce = false;
    }
        
    // Actual algorithm --------

    try{

        // Get n random templates from db
        const randomQuestionsTemplates = await QuestionModel.aggregate([  
            { $sample: { size: n } }
        ]);

        // TODO: The method above actually gets n random (NOT EQUAL) documents
        // so if trying to retrieve 10 questions but only 7 documents are
        // available, only retrieves that


        // For each template...
        randomQuestionsTemplates.forEach( (template,templateNumber) => {
            
            // Template Query
            let sparqlQuery:string = template.question_type.query
            
            // Options may be present...
            let optionEntities = template.question_type.entities as string[]
            if(optionEntities.length > 0){
                let randomEntity = getRandomItem(optionEntities)
                sparqlQuery = sparqlQuery.replace(/\$\$\$/g, randomEntity)
            }
            
            // Make wikidata request and obtain response
            // WORKS!!! BUT AT WHAT COST...
            getWikidataSparql(sparqlQuery).then( res => {
                
                // Pick random responses
                let randomIndexes: number[] = new Array()
                for(let i = 0; i < 4; i++){
                    
                    let possibleRandom = Math.floor(Math.random() * res.length)
                    while(randomIndexes.includes(possibleRandom))
                        possibleRandom = Math.floor(Math.random() * res.length)

                    randomIndexes[i] = possibleRandom
                }

                // Generate questions
                let question = template.questionTemplate.replace(/\$\$\$/g, res[randomIndexes[0]].templateLabel)
                console.log("\nQuestion " + templateNumber + " --> " + question)
                console.log("Answer --> " + res[randomIndexes[0]].answerLabel)
                for(let i = 1; i < 4; i++)
                    console.log("Distractor " + i + " --> " + res[randomIndexes[i]].answerLabel)
                console.log("--------------------------------")


            }).catch(error => {
                console.log("Error while fetching Wikidata")
                throw error
            })
            
            
        })

        // TODO: JSON FOR QUESTIONS!!
        // TODO: REFACTORING!!!
        // TODO: QUESTION TEMPLATES DUMP

        return randomQuestionsTemplates;
        


    }catch(error){
        console.error("Error while fetching questions")
        throw error
    }

}

function getRandomItem<T>(array: T[]): T{
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export { generateQuestions };