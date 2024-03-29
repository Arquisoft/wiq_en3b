import { QuestionModel } from '../src/models/question-model';
import { getWikidataSparql } from '@entitree/helper';
import { generateQuestions } from '../src/services/question-generator';

// Mocking: QuestionModel.aggregate()
// Avoiding flakiness of DB calls
jest.mock("../src/models/question-model")

// Mocking: getWikidataSparql()
// Avoiding flakiness of API calls
jest.mock("@entitree/helper")

const defaultNumberQuestions = 1;
describe("Question Service - Question Generator", () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    it("should return 1 question when DB has 1 template", async () => {

        // Setting up the mocks
        const aggregateMock = await mockQuestionModelAggregate(defaultNumberQuestions);
        await mockWikidataSparql(defaultNumberQuestions)
        
        // Testing function
        const response = await generateQuestions(1) as any;
        
        // The call to QuestionModel.aggregate must be of size 1
        checkCallsAggregateWithSize(aggregateMock, defaultNumberQuestions)
        
        // It must be generated 1 question
        expect(response.length).toBe(defaultNumberQuestions)
    })

    it("should return 2 questions even when DB has 1 template", async () => {

        // Setting up the mocks
        const numberQuestions = 2;
        const aggregateMock = await mockQuestionModelAggregate(numberQuestions);
        await mockWikidataSparql(numberQuestions)

        // Testing function
        const response = await generateQuestions(numberQuestions) as any;

        // The first call to QuestionModel.aggregate must be of size 2
        expect(aggregateMock.mock.calls[0][0]).toStrictEqual([
            { $sample: { size: 2 } },
        ])

        // The second call to QuestionModel.aggregate must be of size 1
        // since in the first call we emulate the DB returning only
        // one question template
        expect(aggregateMock.mock.calls[1][0]).toStrictEqual([
            { $sample: { size: 1 } },
        ])
        
        // It must be generated two questions
        expect(response.length).toBe(numberQuestions)


    })

    it("should return 1 question with all correct parameters when DB has 1 template", async () => {

        // Setting up the mocks
        await mockQuestionModelAggregate(defaultNumberQuestions);
        await mockWikidataSparql(defaultNumberQuestions)
        
        // Testing function
        const response = await generateQuestions(1) as any;

        // Checking all fields are correct and only 1 question
        expect(response.length).toBe(defaultNumberQuestions)
        checkAllFields(response);
    })

    it("should return 2 questions with all correct parameters even when DB has 1 template", async () => {

        // Setting up the mocks
        const numberQuestions = 2;
        await mockQuestionModelAggregate(numberQuestions);
        await mockWikidataSparql(numberQuestions)

        // Testing function
        const response = await generateQuestions(numberQuestions) as any;
        
        // It must be generated two questions
        expect(response.length).toBe(numberQuestions)
        checkAllFields(response);
    })

    it("should return an error if fetching documents from Mongo fails - First call", async () => {

        // Mock response for fetching MongoDB documents
        const rejectedMongoResponse = new Error("Mock - Error fetching Questions");
        (QuestionModel.aggregate as jest.Mock).mockRejectedValue(rejectedMongoResponse);

        // Expect that aggregate function rejected with the rejectedMongoResponse
        await expect(generateQuestions(defaultNumberQuestions)).rejects.toThrow("Mock - Error fetching Questions");
    })

    it("should return an error if fetching documents from Mongo fails - Sucessive call", async () => {

        const rejectedMongoResponse = new Error("Mock - Error fetching Questions");
        (await mockQuestionModelAggregate(defaultNumberQuestions)).mockRejectedValue(rejectedMongoResponse);

        // Expect that aggregate function rejected with the rejectedMongoResponse
        await expect(generateQuestions(defaultNumberQuestions)).rejects.toThrow("Mock - Error fetching Questions");
    })
 
    it("should return 1 image question with all correct parameters when generator succeeds", async () => {

        const aggregateMock = await mockQuestionModelAggregateWithImage();
        await mockWikidataSparqlWithImage()

        const response = await generateQuestions(defaultNumberQuestions);

        checkCallsAggregateWithSize(aggregateMock, defaultNumberQuestions);

        checkAllFieldsWithImage(response);
    })

    it("should return 1 question with all correct parameters and no image field when not needed", async () => {

        const aggregateMock = await mockQuestionModelAggregate(defaultNumberQuestions);
        await mockWikidataSparql(defaultNumberQuestions)
        
        // Testing function
        const response = await generateQuestions(1) as any;
        
        // The call to QuestionModel.aggregate must be of size 1
        checkCallsAggregateWithSize(aggregateMock, defaultNumberQuestions)

        checkAllFieldsWithoutImage(response);
    })
    
})

/**
 * Checks how the mock aggregate function is being called.
 * @param aggregateMock the mock to test
 * @param sizeAggregate the size of the templates called through this function
 */
function checkCallsAggregateWithSize(aggregateMock: any, sizeAggregate: number){
    
    expect(aggregateMock).toHaveBeenCalledWith([
        { $sample: { size: sizeAggregate } },
    ]);

}

/**
 * Creates a mock for getWikidataSparql function, emulating an API response.
 * @param numberReturnValues number of responses to be returned by this function
 * @returns the created mock
 */
async function mockWikidataSparql(numberReturnValues: number) {
    
    // Mock-Response for: getWikidataSparql(sparqlQuery)
    const mockResponseWikidata = [{
        templateLabel: "Peru",
        answerLabel: "Lima"
    }, {
        templateLabel: "Spain",
        answerLabel: "Madrid"
    }, {
        templateLabel: "Russia",
        answerLabel: "Moscow"
    }, {
        templateLabel: "Ucrania",
        answerLabel: "Kiev"
    }];

    // Mock: getWikidataSparql(sparqlQuery)
    const wikidataMock = getWikidataSparql as jest.Mock;
    
    // Adding <numberReturnValues> responses to this mock
    for(let i = 0; i < numberReturnValues; i++)
        wikidataMock.mockReturnValue(mockResponseWikidata)

    return wikidataMock

    
}

/**
 * Creates a mock for QuestionModel.aggregate function, emulating a DB response.
 * @param numberReturnValues number of templates to be returned by this function
 * @returns the created mock
 */
async function mockQuestionModelAggregate(numberReturnValues: number) {
    
    // Mock-Response for: QuestionModel.aggregate([{ $sample: { size: remaining } }])
    const mockResponseAggregate: object[] = [{
        questionTemplate: 'What is the Capital of $$$ ?',
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
                'Q6256',
                'Q10742',
            ],
        }
    }];

    // Mock: QuestionModel.aggregate([{ $sample: { size: remaining } }])
    const aggregateMock = QuestionModel.aggregate as jest.Mock;

    // Adding <numberReturnValues> responses to this mock
    for(let i = 0; i < numberReturnValues; i++)
        aggregateMock.mockReturnValue(mockResponseAggregate);
    
    return aggregateMock
}

async function mockQuestionModelAggregateWithImage(){
    // Mock response for fetching MongoDB documents
    const mockResponseAggregate: object[] = [{
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
    }];

    return (QuestionModel.aggregate as jest.Mock).mockReturnValue(mockResponseAggregate)
}

async function mockWikidataSparqlWithImage() {
    
    // Mock response for Wikidata call
    const mockResponseWikidata = [{
        templateLabel: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Lesotho.svg",
        answerLabel: "Lesotho"
    }, {
        templateLabel: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Senegal.svg",
        answerLabel: "Senegal"
    }, {
        templateLabel: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Zambia.svg",
        answerLabel: "Zambia"
    }, {
        templateLabel: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Slovakia%20%281939%E2%80%931945%29.svg",
        answerLabel: "Slovak Republic"
    }];
    return (getWikidataSparql as jest.Mock).mockReturnValue(mockResponseWikidata);
}


/**
 * Checks that the response given by question-generator has all required fields
 * (not checking image field!)
 * 
 * @param response the response obtained after calling generateQuestions() 
 */
function checkAllFields(response: any) {

    for(let r of response){
        expect(r).toHaveProperty("id") // a given id
        expect(r).toHaveProperty("question") // the generated question
        expect(r).toHaveProperty("answers") // a list of answers
        expect(r.answers.length).toBe(4) // 4 answers
        expect(r).toHaveProperty("correctAnswerId", 1) // a correct answer Id set to 1
    }
  
}

function checkAllFieldsWithImage(response: any) {
    checkAllFields(response)
    for(let r of response)
        expect(r).toHaveProperty("image") // an image field
}

function checkAllFieldsWithoutImage(response: any) {
    checkAllFields(response)
    for(let r of response)
        expect(r).not.toHaveProperty("image") // no image field
}

