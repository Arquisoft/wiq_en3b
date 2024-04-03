import { generateQuestions } from '../src/services/question-generator'
import { getWikidataSparqlWithTimeout } from '../src/utils/question-generator-utils'
import { TemplateModel } from '../src/models/template-model';
import { QuestionModel } from '../src/models/question-model';

jest.mock('../src/models/template-model')
jest.mock('../src/utils/question-generator-utils')
jest.mock('../src/models/question-model');

const defaultNumberQuestions = 1;
describe("Question Service - Question Generator", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should return 1 question If Wikidata does NOT get timed out", async () => {

        const aggregateMock = await mockTemplateModelAggregate();
        const aggregateQuestionMock = await mockQuestionAggregateEmpty();
        await mockWikidataTimeout(0)
        await mockQuestionCount()

        const result = await generateQuestions(defaultNumberQuestions, "en") as any;

        expect(aggregateMock).toHaveBeenCalledTimes(1)
        expect(aggregateQuestionMock).toHaveBeenCalledTimes(1)
        expect(result.length).toBe(1);
        expect(result[0].question).toContain("What is the Capital of")

    })

    it("should return no question If Wikidata gets timed out and there are no questions on DB", async () => {

        const aggregateMock = await mockTemplateModelAggregate();
        const findQuestionMock = await mockQuestionAggregateEmpty();
        await mockQuestionCount(0)
        await mockWikidataTimeout(1)


        const result = await generateQuestions(defaultNumberQuestions, "en") as any;

        expect(aggregateMock).toHaveBeenCalledTimes(1)
        expect(findQuestionMock).toHaveBeenCalledTimes(1)
        expect(result.length).toBe(0);
    })

    it("should return 1 question If Wikidata gets timed out and there are questions on DB", async () => {

        const aggregateMock = await mockTemplateModelAggregate();
        const findQuestionMock = await mockQuestionAggregate();
        await mockQuestionCount(1)
        const mockTimeout = await mockWikidataTimeout(1)


        const result = await generateQuestions(defaultNumberQuestions, "en") as any;

        expect(aggregateMock).toHaveBeenCalledTimes(1)
        expect(findQuestionMock).toHaveBeenCalledTimes(1)
        console.log(result)
        expect(mockTimeout).toHaveBeenCalledTimes(1);
        expect(result.length).toBe(1);
    })

})

/**
 * Mocks the wikidataTimeout() function given a preset that configures its returns.
 * -- PRESETS --
 * 0/default: returns the first response obtained from the original template (Capitals)
 * 1: throws a Timeout error
 * 
 * @param preset the configuration for the mock function
 * @returns the mock built upon preset
 */
async function mockWikidataTimeout(preset: number) {

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

    const timeoutMock = getWikidataSparqlWithTimeout as jest.Mock;

    const timeoutError = new Error("Timeout exceeded for query");

    switch (preset) {
        case 0: return timeoutMock.mockResolvedValue(mockResponseWikidata);
        case 1: return timeoutMock.mockRejectedValue(timeoutError)
        default: return timeoutMock.mockResolvedValue(mockResponseWikidata);
    }
}

async function mockTemplateModelAggregate() {

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

    return (TemplateModel.aggregate as jest.Mock).mockReturnValue(mockResponseAggregate);
}


async function mockQuestionAggregateEmpty() {

    // Mock response for QuestionModel.aggregate making it  return an empty array
    const mockResponseAggregate: object[] = [];

    return (QuestionModel.aggregate as jest.Mock).mockReturnValue(mockResponseAggregate);
}
async function mockQuestionAggregate() {

    // Mock response for QuestionModel.aggregate making it  return an empty array
    const mockResponseAggregate: object[] = [{
        "question": "Who is this physiscist?",
        "answers": [
            {
                "id": 1,
                "text": "Christian Ludwig Gerling"
            },
            {
                "id": 4,
                "text": "Eugen von Lommel"
            },
            {
                "id": 3,
                "text": "Johann Gottlieb Nörremberg"
            },
            {
                "id": 2,
                "text": "Willard Boyle"
            }
        ],
        "correctAnswerId": 1,
        "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Christian%20Ludwig%20Gerling.jpg"
    }];

    return (QuestionModel.aggregate as jest.Mock).mockReturnValue(mockResponseAggregate);
}
async function mockQuestionCount(count: number = 0) {
    // Mock response for QuestionModel.countDocuments making it  return an empty array
    const mockResponseCount: number = count;

    return (QuestionModel.countDocuments as jest.Mock).mockReturnValue(mockResponseCount);
}