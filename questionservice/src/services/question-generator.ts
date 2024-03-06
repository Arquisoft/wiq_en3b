import {QuestionModel,generateSampleTest} from '../models/question-model'
//import axios from 'axios'
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

        // For each template...
        randomQuestionsTemplates.forEach( template => {
            //let question:string = template.questionTemplate
            let sparqlQuery:string = template.question_type.query

            // Make wikidata request and obtain response
            let responseFillers = makeWikidataRequest(sparqlQuery);
            
            /*
            let numberFillers = responseFillers.length as number

            let randomIndexFiller = Math.floor(Math.random(responseFillers.length))
            */

            console.log(typeof responseFillers)
        })

        return randomQuestionsTemplates;
        


    }catch(error){
        console.error("Error while fetching questions")
        throw error
    }

}

const makeWikidataRequest =  async (query:string) => {

    let data = await getWikidataSparql(query)
    console.log(data)
    // WORKS!!! BUT AT WHAT COST...
    return "jeje"

    /*
    // Get info from Wikidata.org
    axios.get(baseURL + encodeURI(query))
        .then( res => {

            // Once we got a response, we return json

            console.log(res)

            return res.data.results.bindings;
        })
        .catch( error => {
            console.error("Error while accessing Wikidata")
            throw error
        })
    */
}

export { generateQuestions };