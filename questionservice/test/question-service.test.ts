import { generateQuestions } from '../services/question-generator';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const request = require('supertest');
import app from '../src/app';


let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGODB_URI = mongoUri;
    await mongoose.connect(mongoUri);
});
