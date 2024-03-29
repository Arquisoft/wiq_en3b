import { generateQuestions } from '../src/services/question-generator'
import { getWikidataSparqlWithTimeout } from '../src/utils/question-generator-utils'
import { QuestionModel } from '../src/models/question-model';

jest.mock('../src/models/question-model')
jest.mock('../src/utils/question-generator-utils')

const defaultNumberQuestions = 1;
describe("Question Service - Question Generator", () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return 1 question If Wikidata does NOT get timed out", async () => {

        const aggregateMock = await mockQuestionModelAggregate();
        const findMock = await mockQuestionModelFindOne();
        await mockWikidataTimeout(0)
        
        const result = await generateQuestions(defaultNumberQuestions, "en") as any;

        expect(aggregateMock).toHaveBeenCalledTimes(1)
        expect(findMock).toHaveBeenCalledTimes(0)
        expect(result.length).toBe(1);
        expect(result[0].question).toContain("What is the Capital of")

    })

    it("should return 1 question If Wikidata gets timed out ONCE", async () => {

        const aggregateMock = await mockQuestionModelAggregate();
        const findMock = await mockQuestionModelFindOne();
        await mockWikidataTimeout(1)
        
        const result = await generateQuestions(defaultNumberQuestions, "en") as any;
    
        expect(aggregateMock).toHaveBeenCalledTimes(1)
        expect(findMock).toHaveBeenCalledTimes(1)
        expect(result.length).toBe(1);
        expect(result[0].question).toContain("What is the chemical symbol of")
    })

    it("should return no questions If Wikidata gets timed out MORE THAN ONCE", async () => {

        const aggregateMock = await mockQuestionModelAggregate();
        const findMock = await mockQuestionModelFindOne();
        await mockWikidataTimeout(2)
        
        const result = await generateQuestions(defaultNumberQuestions, "en") as any;

        expect(aggregateMock).toHaveBeenCalledTimes(1)
        expect(findMock).toHaveBeenCalledTimes(1)
        expect(result.length).toBe(0);
    })

    

})

/**
 * Mocks the wikidataTimeout() function given a preset that configures its returns.
 * -- PRESETS --
 * 0/default: returns the first response obtained from the original template (Capitals)
 * 1: throws a Timeout error and then responds with new values different from the original template (Chemical Symbols)
 * 2: throws a Timeout error twice
 * 
 * @param preset the configuration for the mock function
 * @returns the mock built upon preset
 */
async function mockWikidataTimeout(preset: number){
    
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

    const mockResponseWikidataAfterFail = [{
        templateLabel: "Gold",
        answerLabel: "Au"
    }, {
        templateLabel: "Alluminum",
        answerLabel: "Al"
    }, {
        templateLabel: "Helium",
        answerLabel: "He"
    }, {
        templateLabel: "Oxygen",
        answerLabel: "O"
    }]

    const timeoutMock = getWikidataSparqlWithTimeout as jest.Mock;

    const timeoutError = new Error("Timeout exceeded for query");

    switch(preset){
        case 0: return timeoutMock.mockResolvedValue(mockResponseWikidata);
        case 1: return timeoutMock.mockRejectedValueOnce(timeoutError).mockResolvedValueOnce(mockResponseWikidataAfterFail)
        case 2: return timeoutMock.mockRejectedValueOnce(timeoutError).mockRejectedValueOnce(timeoutError)
        default: return timeoutMock.mockResolvedValue(mockResponseWikidata);
    }
}

async function mockQuestionModelAggregate() {
    
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
    
    return (QuestionModel.aggregate as jest.Mock).mockReturnValue(mockResponseAggregate);
}

async function mockQuestionModelFindOne() {
    
    // Mock-Response for: QuestionModel.findOne({'question_type.name': 'Chemistry'})
    const mockResponseFindOne: object = {
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
    };
    
    return (QuestionModel.findOne as jest.Mock).mockReturnValue(mockResponseFindOne);
}