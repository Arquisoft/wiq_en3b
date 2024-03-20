//import mongoose from 'mongoose';
//import { MongoMemoryServer } from 'mongodb-memory-server';
const request = require('supertest');
import app from '../src/app';
import { generateQuestions } from '../src/services/question-generator';
import { generateQuestionsController } from '../src/controllers/question-controller';

/* NOT USED SO FAR IN TEST...
let mongoServer: MongoMemoryServer;

    // Creating DB connections before ALL tests
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        process.env.MONGODB_URI = mongoUri;
        await mongoose.connect(mongoUri);
    });

    // Closing DB connections after ALL test have been performed
    afterAll(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });
*/

describe("Question Service - Health", () => {

    it("should return 200 if / is accessed", async () => {

        const response = await request(app).get('/');
        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty("health", "Operative")
        
    })

    it("should return / if any url is accessed", async () => {

        const response = await request(app).get('/testTest');
        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty("health", "Operative")

    })

})

describe("Question Service - Erroneous parameters for /questions", () => {
    
    it("should return 400 if accessed without parameter", async () => {

        const response = await request(app).get('/questions')
        expect(response.status).toBe(400)
        expect(response.body.data).toHaveProperty("error")

    })

    it("should return 400 if accessed with erroneous parameter", async () => {

        const response = await request(app).get('/questions?errorTest')
        expect(response.status).toBe(400)
        expect(response.body.data).toHaveProperty("error")

    })

    it("should return 400 if accessed with size parameter but is not provided", async () => {

        const response = await request(app).get('/questions?size')
        expect(response.status).toBe(400)
        expect(response.body.data).toHaveProperty("error")

    })

    it("should return 400 if accessed with size parameter but value type is wrong", async () => {

        const response = await request(app).get('/questions?size=wrongValue')
        expect(response.status).toBe(400)
        expect(response.body.data).toHaveProperty("error")

    })

})

// Mocking the generateQuestions(size) function
jest.mock("../src/services/question-generator")

describe("Question Service - Question Controller", () => {

    it("should return questions when controller succeeds", async () =>{

        // Mocking the response of generateQuestions(size) => Questions
        const mockResponse = ['Question 1', 'Question 2', 'Question 3'];
        (generateQuestions as jest.Mock).mockResolvedValue(mockResponse)

        // Mock req and res for controller
        const req = { query: { size: mockResponse.length } } as any
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as any

        await generateQuestionsController(req, res)
        
        // Ensuring mock fn was called like => await generateQuestions(3)
        expect(generateQuestions).toHaveBeenCalledWith(mockResponse.length);
        // Ensuring mock fn was called like => res.json(['Question1', 'Question2', 'Question3'])
        expect(res.json).toHaveBeenCalledWith(mockResponse)
      
    })

    it("should return an error when controller fails", async () => {

        // Mocking the response of generateQuestions(size) => Error!
        const mockError = new Error("Mock!! A fail");
        (generateQuestions as jest.Mock).mockRejectedValue(mockError)

        // Mock req and res for controller
        const req = { query: { size: 3 } } as any
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as any

        await generateQuestionsController(req, res)

        // Ensuring mock fn was called like => await generateQuestions(3)
        expect(generateQuestions).toHaveBeenCalledWith(3);
        // Ensuring mock fn was called like => res.status(500)
        expect(res.status).toHaveBeenCalledWith(500)
        // Ensuring mock fn was called like => res.json({status: 'fail'})
        expect(res.json).toHaveBeenLastCalledWith({
            status: 'error',
            message: "Can't generate questions! Internal server error"
        })


    })




})