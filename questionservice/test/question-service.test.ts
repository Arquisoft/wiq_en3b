const request = require('supertest');
import app from '../src/app';
import { generateQuestions } from '../src/services/question-generator';
import { generateQuestionsController } from '../src/controllers/question-controller';


describe("Question Service - Health", () => {

    it("should return 200 if / is accessed", async () => {
        requestAndSuccess('/')
    })

    it("should return / if any url is accessed", async () => {
        requestAndSuccess('/testTest')
    })

})

describe("Question Service - Erroneous parameters for /questions", () => {

    it("should return 400 if accessed without parameter", async () => {
        await requestAndGetError('/questions')
    })

    it("should return 400 if accessed with erroneous parameter", async () => {
        await requestAndGetError('/questions?errorTest')
    })

    it("should return 400 if accessed with size parameter but is not provided", async () => {
        await requestAndGetError('/questions?size')
    })

    it("should return 400 if accessed with size parameter but value type is wrong", async () => {
        await requestAndGetError('/questions?size=wrongValue')
    })

    it("should return 400 if accessed with only lang parameter", async () => {
        await requestAndGetError('/questions?lang=en')
    })

    it("should return 400 if accessed with size parameter and not supported language", async () => {
        await requestAndGetError('/questions?size=10&lang=notSupported')
    })

    it("should return 400 if the size is too big", async () => {
        await requestAndGetError('/questions?size=101')

    })

    it("should return 400 if the size is negative", async () => {
        await requestAndGetError('/questions?size=-1')
    })

})

function expectOperative(response: any) {
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty("health", "Operative")
}

function expectError(response: any) {
    expect(response.status).toBe(400)
    expect(response.body.data).toHaveProperty("error")
}

async function requestAndGetError(url: string) {
    const response = await request(app).get(url);
    expectError(response);
}

async function requestAndSuccess(url: string) {
    const response = await request(app).get(url);
    expectOperative(response);
}
// Mocking the question-generator.ts to test question-controller
// Done to avoid flakiness by calling DB or API
jest.mock('../src/services/question-generator')

describe("Question Service - Question Generation", () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return questions when controller succeeds", async () => {

        // Mocking the response of generateQuestions(size) => Questions
        const mockResponse = ['Question 1', 'Question 2', 'Question 3'];
        (generateQuestions as jest.Mock).mockResolvedValue(mockResponse)

        // Mock req and res for controller
        const req = { query: { size: mockResponse.length, lang: "en" } } as any
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as any

        await generateQuestionsController(req, res)

        // Ensuring mock fn was called like => await generateQuestions(3)
        expect(generateQuestions).toHaveBeenCalledWith(mockResponse.length, "en", undefined);
        // Ensuring mock fn was called like => res.json(['Question1', 'Question2', 'Question3'])
        expect(res.json).toHaveBeenCalledWith(mockResponse)

    })

    it("should return an error 500 when controller fails", async () => {

        // Mocking the response of generateQuestions(size) => Error!
        const mockError = new Error("Mock!! A fail");
        (generateQuestions as jest.Mock).mockRejectedValue(mockError)

        // Mock req and res for controller
        const req = { query: { size: 3, lang: "en" } } as any
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as any

        await generateQuestionsController(req, res)

        // Ensuring mock fn was called like => await generateQuestions(3)
        expect(generateQuestions).toHaveBeenCalledWith(3, "en", undefined);
        // Ensuring mock fn was called like => res.status(500)
        expect(res.status).toHaveBeenCalledWith(500)
        // Ensuring mock fn was called like => res.json({status: 'fail'})
        expect(res.json).toHaveBeenLastCalledWith({
            status: 'fail',
            message: "Can't generate questions! Mock!! A fail"
        })


    })

})