import { Schema } from "express-validator"

export const orderSchema: Schema = {
    creditCardNumber: {
        exists: {
            errorMessage: 'Field `Credit Card Number` is required',
            bail: true
        },
        isCreditCard: {
            errorMessage: 'Field `Credit Card` is not valid'
        }
    },
    cityId: {
        exists: {
            errorMessage: 'Field `City Id` is required',
            bail: true
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Field `City Id` must be a number>0'
        }
    },
    street: {
        exists: {
            errorMessage: 'Field `Street` is required',
            bail: true
        },
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `Street` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `Street` must be a string',
            bail: true
        }
    },
    streetNumber: {
        exists: {
            errorMessage: 'Field `Street Number` is required',
            bail: true
        },
        isString: {
            errorMessage: 'Field `Street Number` is not valid'
        }
    }
}


