import { Schema } from "express-validator"
import { isEmailExist, isIsraeliIdExist } from "../routes/session"
import { isIsraeliIdValid } from "../utilities/isIsraeliIdValid"

export const registerSchema: Schema = {
    email: {
        exists: {
            errorMessage: 'Field `E-mail` is required',
            bail: true
        },
        isEmail: {
            errorMessage: 'E-mail is not valid',
            bail: true
        },
        normalizeEmail: true,
        custom: {
            options: async (value: string, { req, location, path }) => {
                const email = value
                const emailExist = await isEmailExist(email)
                if (emailExist) return Promise.reject('E-mail already in use')
            }
        }
    },
    israeliId: {
        exists: {
            errorMessage: 'Field `Israeli Id` is required',
            bail: true
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Field `Israeli Id` is not valid',
            bail: true
        },
        custom: {
            options: async (value: string, { req, location, path }) => {
                const israeliId = value
                const israeliIdValid = isIsraeliIdValid(israeliId)
                if (!israeliIdValid) return Promise.reject({ israeliIdValid })
                const israeliIdExist = await isIsraeliIdExist(israeliId)
                if (israeliIdExist) return Promise.reject({ israeliIdExist })

            }
        }
    },
    password: {
        exists: {
            errorMessage: 'Field `password` is required',
            bail: true
        },
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `name` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `name` must be a string',
            bail: true
        },
        isLength: {
            options: { min: 5, max: 10 },
            errorMessage: 'Password max length should be 10 characters'
        }
    },
    confirmPassword: {
        exists: {
            errorMessage: 'Field `confirmPassword` is required',
            bail: true
        },
        custom: {
            options: async (value: string, { req, location, path }) => {
                const confirmPassword = value
                if (confirmPassword !== req.body.password) {
                    throw new Error('Password confirmation does not match password')
                }
            }
        }
    },
    firstName: {
        exists: {
            errorMessage: 'Field `First Name` is required',
            bail: true
        },
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `First Name` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `First Name` must be a string',
            bail: true
        },
    },
    lastName: {
        exists: {
            errorMessage: 'Field `Last Name` is required',
            bail: true
        },
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `Last Name` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `Last Name` must be a string',
            bail: true
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
    dateOfBirth: {
        optional: true,
        isDate: true,
        toDate: true
    }
}
