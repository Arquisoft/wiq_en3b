import {QuestionModel,generateSampleTest} from '../models/question-model';

let onlyOnce = true; // TODO: REMOVE

const generateQuestions = async (n: number) =>{
    
    console.log("The number of questions to retrieve are: " + n)
    
    // Generating 5 questions template --> TEST
    if(onlyOnce){
        await generateSampleTest();
        onlyOnce = false;
    }
        

    try{

        const randomQuestionsTemplates = await QuestionModel.aggregate([  
            { $sample: { size: n } }
        ]);

        return randomQuestionsTemplates;


    }catch(error){
        console.error("Error while fetching questions")
        throw error
    }

}

export { generateQuestions };