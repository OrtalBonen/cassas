import { Schema } from "express-validator";

export const emailSchema: Schema = {
    email: {
        isEmail: {
            errorMessage: 'E-mail is not valid',
            bail: true
        }
    }
}