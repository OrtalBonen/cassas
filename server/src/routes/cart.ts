import { query, Router } from "express";
import { SQL } from "../configs/dbconfig";
import { orderType } from "../models/product.model";
import express, { Request, Response } from 'express';
import { body, check, checkSchema, param, Schema, validationResult } from 'express-validator';
import { validateRequestSchema } from "../middlewares/validateRequestSchema";
import { cartItemSchema } from "../schema/cartItemSchema";
import { onlyLogged } from "../middlewares/onlyLogged";
import { onlyLoggedUser } from "../middlewares/onlyLoggedUsers";

export const router = Router()
router.use(onlyLoggedUser)

//13.check if user has a cart if has get the cart and it's orderItems
router.get('/getCart', async (req: Request, res: Response) => {
    const { userId } = req.session

    try {
        const cartId = await getCartId(userId)

        if (!cartId) {
            return res.send({ cart: null })
        }
        const cartItems = await getCartItems(cartId)

        res.send({ cart: { id: cartId, cartItems } })
    } catch (error) {
        res.sendStatus(500)
    }
})

router.delete('/emptyCart', async (req, res) => {
    const { userId } = req.session
    try {
        const cartId = await getCartId(userId)
        await emptyCart(cartId)
        res.status(201).send({ msg: "Deleted" })
    } catch (error) {
        res.sendStatus(500)
    }

})

router.delete('/item/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId)
    // const { userId } = req.session
    try {
        // const cartId = await getCartId(userId)
        await deleteCartItem(itemId)
        res.status(201).send({ msg: "Deleted" })
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/addproduct/:productId/:quantity', checkSchema(cartItemSchema), validateRequestSchema, async (req, res) => {
    const { userId } = req.session
    let productId = req.params.productId as number
    const quantity = req.params.quantity as number

    try {
        let actionType: string
        const cartId = await getCartId(userId)
        //if user has not a cart
        if (!cartId) {
            if (quantity > 0) {
                const cartId = await createUserCart(userId)
                await insertToCart(cartId, productId, quantity)
                actionType = "insert"
            }
            return res.send({ msg: `New cart created, product is insert, if 0 quantity not` })
        }

        //user have a cart

        // check if product already exist in user cart
        const cartItem = await getCartItem(cartId, productId)

        if (!cartItem) {
            if (quantity > 0) {
                await insertToCart(cartId, productId, quantity)
                actionType = 'insert'
            }
        }
        else if (cartItem) {
            if (quantity === 0) {
                await deleteCartItem(cartItem.id)
                actionType = 'deleted'
            } else if (quantity > 0) {

                await updateCartItemQuantity(quantity, cartItem.id, cartItem.quantity)
                actionType = 'quantity update'
            }
        }
        res.status(201).send({ msg: `product ${actionType}` })
    } catch (error) {
        return res.sendStatus(500)
    }
})

export async function getProduct(productId: number) {
    const query = `SELECT products.* FROM products
                   WHERE id=?`
    const result = await SQL(query, productId)
    if (!result.length) {
        return null
    }
    const product = result[0]
    return product
}

export async function getCartId(userId: number) {

    const query = `SELECT orders.id from orders
                   WHERE user_id=? AND type=?`

    const result = await SQL(query, [userId, orderType.cart])
    if (!result.length) {
        return null
    }
    const cart = result[0]
    return cart.id as number
}

async function createUserCart(userId: number) {
    const query = `INSERT INTO orders(user_id, type)
                   VALUES(?,?)`
    const result = await SQL(query, [userId, orderType.cart])
    const cartId = result.insertId
    return cartId
}

export async function getCartItems(cartId: number) {
    const query = `SELECT 
    order_items.id, product_id AS productId, order_items.quantity, products.price, products.price*order_items.quantity as totalPrice ,rootproducts.name,height,
    width, depth, color_id AS colorId, colors.name AS colorName, preview_img_url AS previewImgUrl,
    products.quantity AS inStock
    FROM 
    order_items
    INNER JOIN products ON products.id=order_items.product_id
    INNER JOIN rootproducts ON rootproducts.id=products.rootProduct_id
    INNER JOIN colors ON colors.id=products.color_id
    WHERE order_id=?`

    const cartItems = await SQL(query, cartId)
    return cartItems
}

async function getCartItem(cartId: number, productId: number) {
    const query = `SELECT id, quantity
    FROM order_items 
    WHERE order_id=? AND product_id=?`
    const result = await SQL(query, [cartId, productId])
    if (!result.length) {
        return null
    }

    const cartItem = result[0]
    return cartItem
}

function insertToCart(cartId: number, productId: number, quantity: number) {
    const query = `INSERT INTO order_items(order_id, product_id, quantity)
    VALUES(?, ?, ?)`
    return SQL(query, [cartId, productId, quantity])
}

function deleteCartItem(itemId: number) {
    const query = `DELETE FROM order_items
    WHERE id=?`
    return SQL(query, itemId)
}

function updateCartItemQuantity(quantity: number, cartItemId: number, cartItemQuantity: number) {
    const newQuantity = quantity + cartItemQuantity
    const query = `UPDATE order_items
    SET quantity=?
    WHERE id=?`
    return SQL(query, [newQuantity, cartItemId])
}

function emptyCart(cartId: number) {
    const query = `DELETE  FROM order_items
     WHERE order_id=?`
    return SQL(query, cartId)
}

async function isDeliveryDateValid(date: Date) {
    const query = `SELECT COUNT(id) AS numberOfDeliveries FROM deliveries
WHERE date=?`
    const result = await SQL(query, date)
}
