import { Schema } from "express-validator";
import { areArrayItemsUnique } from "../utilities/areArrayItemsUnique";
import { existValidator } from "./validators";

export const createNewProductSchema: Schema = {
    'newRootProductsReq.name': {
        exists: existValidator,
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
            options: { max: 60 },
            errorMessage: `Field 'description' must be 300 character long `
        }
    },
    'newRootProductsReq.description': {
        exists: {
            options: {
                checkFalsy: true
            },
            errorMessage: 'Field `description` must be provided',
            bail: true
        },
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `name` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `description` must be a string',
            bail: true
        },
        isLength: {
            options: { max: 300 },
            errorMessage: `Field 'description' must be 300 character long `
        }
    },

    'newRootProductsReq.composition': {
        optional: true,
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `composition` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `composition` must be a string',
            bail: true
        },
        isLength: {
            options: { max: 100 },
            errorMessage: `Field 'composition' must be 100 character long `
        }
    },
    'newRootProductsReq.origin': {
        optional: true,
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'Field `composition` can not be empty',
            bail: true
        },
        isString: {
            errorMessage: 'Field `composition` must be a string',
            bail: true
        },
        isLength: {
            options: { max: 100 },
            errorMessage: `Field 'composition' must be 100 character long `
        }
    },
    'newRootProductsReq.height': {
        optional: true,
        isFloat: {
            options: { gt: 0 },
            errorMessage: 'Field `height` must be a number>0'

        }
    },
    'newRootProductsReq.width': {
        optional: true,
        isFloat: {
            options: { gt: 0 },
            errorMessage: 'Field `width` must be a number>0'

        }
    },
    'newRootProductsReq.depth': {
        optional: true,
        isFloat: {
            options: { gt: 0 },
            errorMessage: 'Field `depth` must be a number>0'

        }
    },

    'categoriesIds': {
        exists: {
            errorMessage: 'Field `categoriesIds` is required',
            bail: true
        },
        isArray: {
            options: { min: 1 },
            errorMessage: 'Field `categoriesIds` must be an array with minimum length of 1',
            bail: true
        },
        custom: {
            options: (value: number[], { req, location, path }) => {
                const categoriesIds = value
                if (categoriesIds.length > 1) {
                    const isIdsAreUnique = areArrayItemsUnique(categoriesIds)
                    if (!isIdsAreUnique) throw new Error("All items in categoriesIds must be unique")
                }

                return true
            }
        }
    },
    'categoriesIds.*': {
        isInt: {
            options: { gt: 0 },
            errorMessage: 'each item in `categoriesIds` must be a number>0'
        },

    },
    'products': {
        exists: {
            errorMessage: 'Field `products` is required',
            bail: true
        },
        isArray: {
            options: { min: 1 },
            errorMessage: 'Field `products` must be an array with minimum length of 1',
            bail: true
        },
    },
    'products.*.price': {
        exists: {
            errorMessage: 'Field `price` is required',
            bail: true
        },
        isFloat: {
            options: { gt: 0 },
            errorMessage: 'Field `price` must be a number>0'

        }

    },
    'products.*.available': {
        exists: {
            errorMessage: 'Field `available` is required',
            bail: true
        },
        isBoolean: {
            errorMessage: 'Field `available` must be boolean'

        }

    },
    'products.*.quantity': {
        exists: {
            errorMessage: 'Field `quantity` is required',
            bail: true
        },
        isInt: {
            options: { min: 0 },
            errorMessage: 'Field `quantity` must be a number>=0'

        }
    },
    'products.*.colorId': {
        exists: {
            errorMessage: 'Field `colorId` is required',
            bail: true
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'Field `colorId` must be a number>0'

        }
    },
    'products.*.previewImgUrl': {
        exists: {
            errorMessage: 'Field `colorId` is required',
            bail: true
        },
        isURL: { errorMessage: 'Field `previewImgUrl` must be url' }
    },

    'products.*.images.*': {
        isURL: { errorMessage: 'Field `previewImgUrl` must be url' }
    },
}