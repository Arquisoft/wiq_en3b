// import { generateQuestions } from '../services/question-generator';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const request = require('supertest');
import app from '../src/app';

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
