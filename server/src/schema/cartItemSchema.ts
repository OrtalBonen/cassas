import { Schema, validationResult } from "express-validator";
import { getProduct } from "../routes/cart";

export const cartItemSchema: Schema = {
    quantity: {
        exists: {
            errorMessage: 'Field `Quantity` is required',
            bail: true
        },
        isInt: {
            options: { min: 0 },
            errorMessage: 'Field `Quantity` must be a number equal / bigger then zero'
        },
        toInt: true
    },
    productId: {
        exists: {
            errorMessage: 'Field `Product Id` is required',
            bail: true
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Field `Product Id` must be a number bigger then zero',
            bail: true
        },
        toInt: true,
        custom: {
            options: async (value: number, { req, location, path }) => {
                const result = validationResult(req)
                if (!result.isEmpty()) return true
                const productId = value
                const product = await getProduct(productId)
                if (!product) return Promise.reject('Product not found')
            }
        }
    }
}