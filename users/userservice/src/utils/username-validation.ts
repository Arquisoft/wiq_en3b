import { Request } from 'express';

function validateNoSpaces(req: Request, fieldsThatCannotHaveSpace: string[]) {
    for (const field of fieldsThatCannotHaveSpace) {
        if (req.body[field]!.indexOf(' ') >= 0) {
            throw new Error(`The field "${field}" cannot have spaces`);
        }
    }
}

function validateMaxLength(req: Request, fields: string[], maxLength: Number) {
    for (const field of fields) {
        if (req.body[field]!.length > maxLength) {
            throw new Error(`The field "${field}" cannot have more than ${maxLength} characters`);
        }
    }
}

export { validateNoSpaces, validateMaxLength };