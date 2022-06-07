import { Schema } from "express-validator";

export const dateSchema: Schema = {
    delieveryDate: {
        isDate: {
            errorMessage: 'Field `Date` must be a date type',
            bail: true
        },
        exists: {
            errorMessage: 'Field `Date` is required',
        },
    }
}