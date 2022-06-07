import { Schema } from "express-validator"
import { isIsraeliIdValid } from "../utilities/isIsraeliIdValid"

export const israeliIdSchema: Schema = {
    israeliId: {
        custom: {
            options: async (value: string, { req, location, path }) => {
                const israeliId = value
                const israeliIdValid = isIsraeliIdValid(israeliId)
                if (!israeliIdValid) throw new Error('Israeli Id is not valid')
            }
        }
    }
}