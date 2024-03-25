import { Request } from 'express';

/**
 * Validates if the size parameter is present in the request
 * @param req Request to be validated
 */
function validateSizePresent(req: Request) {
    if (!req.query.size) {
        throw new Error('You need to provide a size for questions to be generated!');
    }
}

/**
 * Validates if the field is a number
 * @param field Field to be validated
 * @returns The field as a number
 */
function validateNumber(field: string) {
    const size = parseInt(field as string, 10);
    // Checking parameter is a number
    if (isNaN(size)) {
        throw new Error('The size parameter must be a number');
    }
    return size;
}
export { validateNumber, validateSizePresent };