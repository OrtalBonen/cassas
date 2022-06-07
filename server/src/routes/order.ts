import express from "express";
import { checkSchema } from "express-validator";
import { existsSync, mkdir, mkdirSync, writeFile, writeFileSync } from "fs";
//import fs from "fs";
import { SQL } from "../configs/dbconfig";
import { onlyLoggedUser } from "../middlewares/onlyLoggedUsers";
import { validateRequestSchema } from "../middlewares/validateRequestSchema";
import { orderSchema } from "../schema/orderSchema";
import { formatDate } from "../utilities/formatDate";
import { getCartId, getCartItems } from "./cart";

export const router = express.Router()

router.use(onlyLoggedUser)

//confirm and create order (final check) 
router.post('/', checkSchema(orderSchema), validateRequestSchema, async (req, res) => {
    const { creditCardNumber, cityId, street, streetNumber, delieveryDate } = req.body

    if (new Date(delieveryDate) <= new Date()) return res.send({ error: `Delivery date is not available` })
    const { userId } = req.session
    try {

        const cartId: null | number = await getCartId(userId)
        if (!cartId) return res.status(400).send({ error: 'Cart not found' })

        //create an order 
        const totalOrderPrice = await getTotalOrderPrice(cartId)
        const lastFourDigitsCreditCard = creditCardNumber.substring(creditCardNumber.length, creditCardNumber.length - 4)
        await createOrder(lastFourDigitsCreditCard, cityId, street, streetNumber, delieveryDate, cartId, totalOrderPrice)

        res.status(201).send({ msg: "Order created", totalOrderPrice })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/confirm-date', async (req, res) => {
    const dateString = req.query.date as string
    const date = new Date(dateString)

    try {
        const isDateValid = await confirmDelieveryDate(date)
        res.send({ isDateValid })
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/delivery/unavailableDates', async (req, res) => {
    try {
        const unavailableDates = await getUnavailableDelieveryDates()
        res.send(unavailableDates)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/invoice/:cartId', async (req, res) => {
    const { cartId } = req.params

    const file = `invoices/${cartId}.txt`

    res.download(file)
})

async function getTotalOrderPrice(cartId: number) {
    const query = `SELECT SUM(order_items.quantity*products.price) AS totalPrice 
    FROM order_items
    INNER JOIN products  ON products.id = order_items.product_id
    WHERE  order_items.order_id=?`
    const result: { totalPrice: number }[] = await SQL(query, cartId)
    const { totalPrice } = result[0]
    return totalPrice
}

async function createOrder(lastFourDigitsCreditCard, cityId: number,
    street: string, streetNumber: number, delieveryDate: Date, cartId: number, totalPrice: number) {
    const query = `UPDATE order_items o_i
                   INNER JOIN products p ON p.id = o_i.product_id
                   INNER JOIN orders o ON o.id = o_i.order_id
                   SET o_i.price = p.price,
                   p.quantity = p.quantity-o_i.quantity,
                   o.type=1,
                   o.last_four_digits_credit_card=?,
                   o.order_date=now(),
                   o.city_id=?,
                   o.street=?,
                   o.street_number=?,
                   o.delievery_date=?,
                   o.total_price=?
                   WHERE o.id=? AND o.type=2`
    await SQL(query, [lastFourDigitsCreditCard, cityId, street, streetNumber, delieveryDate, totalPrice, cartId])

    await createOrderInvoice(cartId)
}

async function createOrderInvoice(cartId: number) {
    const items = await getCartItems(cartId)

    let invoice = `Invoice #${cartId}\n`

    for (let item of items) {
        invoice += `${item.name}    ${item.quantity}   ${item.totalPrice}$\n`
    }

    if (!existsSync('invoices')) {
        mkdirSync('invoices')
    }

    writeFileSync(`invoices/${cartId}.txt`, invoice)
}

async function confirmCart(cartId: number) {
    const unavailableItems = await getUnavailableItems(cartId)
    const cartConfirmation = {
        cartId,
        isConfirmed: !unavailableItems.length,
        unavailableItems
    }
    return cartConfirmation
}

async function getUnavailableItems(cartId: number) {
    const query = ` SELECT 
    order_items.id, product_id AS productId, order_items.quantity, products.price, products.price*order_items.quantity as totalPrice ,rootproducts.name,height,
    width, depth, color_id AS colorId, colors.name AS colorName, preview_img_url AS previewImgUrl,
    products.quantity AS inStock
    FROM finalprojecttest.order_items
    INNER JOIN products ON products.id=order_items.product_id
    INNER JOIN rootproducts ON rootproducts.id=products.rootProduct_id
    INNER JOIN colors ON colors.id=products.color_id
    WHERE order_id=?
      AND products.quantity<order_items.quantity`
    const unavailableItems = await SQL(query, cartId)
    return unavailableItems
}

async function getUnavailableDelieveryDates() {

    const query = `SELECT  delievery_date AS date
     FROM orders
     WHERE type=1
     AND delievery_date IS NOT NULL
     AND delievery_date > CURDATE()
     GROUP BY delievery_date
     HAVING COUNT(id) > 2
     ORDER BY delievery_date`

    const result = await SQL(query)

    const formatYmd = date => date.toISOString().slice(0, 10)
    const unavailableDates = result.map(o => formatYmd(o.date))
    const today = formatYmd(new Date())
    unavailableDates.unshift(today)
    return unavailableDates
}

//only 3 delieveries are permited per date
//delivery date can't be current date
async function confirmDelieveryDate(date: Date) {
    const query = `SELECT COUNT(*) AS deliveryCount FROM orders 
    WHERE delievery_date =? AND type = 1 AND delievery_date IS NOT NULL`
    const result = await SQL(query, formatDate(date))
    const { deliveryCount } = result[0]
    if (deliveryCount > 2) return false
    return true
}


async function getProductUserPurchuse(orderId: number) {
    const query = `SELECT order_items.product_id AS id, quantity
    FROM order_items WHERE order_id=?`
    const productsPurchused = SQL(query, orderId)
    return productsPurchused
}
