import { Request } from 'express';

/**
 * Validates if the required fields appear in the request body
 * @param req Request to be validated
 * @param requiredFields Fields that must appear in the request body
 * @throws Error when there is a missing field
 */
function validateRequiredFields(req: Request, requiredFields: string[]) {
    for (const field of requiredFields) {
        if (!(field in req.body)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
}

/**
 * Validates if the fields are not empty
 * @param req Request to be validated
 * @param fieldsThatCannotBeEmpty Fields that must have valid content (not empty)
 * @throws Error when there is an empty field
 */
function validateNotEmpty(req: Request, fieldsThatCannotBeEmpty: string[]) {
    for (const field of fieldsThatCannotBeEmpty) {
        if (req.body[field]?.trim().length === 0) {
            throw new Error(`The field "${field}" cannot be empty`);
        }
    }
}

/**
 * Validates if the fields have the required length
 * @param req Request to be validated
 * @param fields Fields that must have the required length
 * @param requiredLength Required length of the fields
 * @throws Error when there is a field that does not have the required length
 */
function validateRequiredLength(
    req: Request,
    fields: string[],
    requiredLength: number
) {
    for (const field of fields) {
        if (req.body[field]?.length < requiredLength) {
            throw new Error(
                `The field "${field}" must have at least ${requiredLength} characters`
            );
        }
    }
}
module.exports =  { validateRequiredFields, validateNotEmpty, validateRequiredLength };
