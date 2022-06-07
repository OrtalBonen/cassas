import { Schema } from "express-validator"
import { SQL } from "../configs/dbconfig"
import { User } from "../models/User.model"
import { isEmailExist } from "../routes/session"
import { comparePassword } from "../utilities/hashPassword"

export const loginSchema: Schema = {
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

    },
    password: {
        exists: {
            errorMessage: 'Field `Password` is required',
            bail: true,

        },
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `name` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `Password` must be a string',
            bail: true
        },
        isLength: {
            options: { min: 5, max: 10 },
            errorMessage: 'Password max length should be 10 characters'
        }
    }
}
