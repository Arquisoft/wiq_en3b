import { Request } from 'express';
const {validateNotEmpty, validateRequiredFields, validateRequiredLength} = require("../src/field-validations");

describe('Users Utils', () => {
    // Empty field validation
    it('should get an error when passing an empty parameter', async () => {
        const mockRequest = {
            body: {}
        } as Request;
        mockRequest.body['history'] = '';

        let gotError = false;
        try {
            validateNotEmpty(mockRequest, ['history']);
        } catch (error) {
            gotError = true
        }
        if (!gotError)
            fail('Should get an error');

        // Should ignore field if does not exist
        try {
            validateNotEmpty(mockRequest, ['nonexistent']);
        } catch (error) {
            fail('Should not get an error');
        }
    });

    // Unexpected length validation
    it('should get an error when passing a parameter without the expected length', async () => {
        const mockRequest = {
            body: {}
        } as Request;
        mockRequest.body['test'] = '123456789';

        let gotError = false;
        try {
            validateRequiredLength(mockRequest, ['test'], 10);
        } catch (error) {
            gotError = true;
        }
        if (!gotError)
            fail('Should get an error');

        // Should ignore field if does not exist
        try {
            validateRequiredLength(mockRequest, ['nonexistent'], 10);
        } catch (error) {
            fail('Should not get an error');
        }
    });

    // Expected fields validation
    it('passing an expected parameter should work', async () => {
        const mockRequest = {
            body: {}
        } as Request;
        mockRequest.body['test'] = 'test';

        try {
            validateRequiredFields(mockRequest, ['test']);
        } catch (error) {
            fail('Should not get an error');
        }
    });

    // Unexpected fields validation
    it('should get an error when passing an unexpected parameter', async () => {
        const mockRequest = {
            body: {}
        } as Request;
        mockRequest.body['test'] = 'test';

        // Should get an error when the field does not exist
        let gotError = false;
        gotError = false;
        try {
            validateRequiredFields(mockRequest, ['nonexistent']);
        } catch (error) {
            gotError = true;
        }
        if (!gotError)
            fail('Should get an error');
    });
});
