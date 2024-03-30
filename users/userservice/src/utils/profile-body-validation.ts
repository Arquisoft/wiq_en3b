import { Request } from 'express';
import { UserDocument } from '../types';

const validateProfileBody = (req: Request, user: UserDocument) => {
    Object.keys(req.body.profile).forEach(key => {
        if (!(key in user.profile)) {
            throw new Error(
                `The provided field '${key}' is not part of the user profile.`
            );
        }
        else if (typeof req.body.profile[key] != 'string') {
            throw new Error(
                `Invalid field '${key}'. Only string values are allowed.`
            );
        }
    });
}

export { validateProfileBody };