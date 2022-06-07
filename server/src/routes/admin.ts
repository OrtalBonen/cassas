import express, { Request, Response, Router } from "express"
import { checkSchema } from "express-validator"
import { SQL } from "../configs/dbconfig"
import { onlyLoggedAdmin } from "../middlewares/onlyLoggedAdmin"

export const router = express.Router()
router.use(onlyLoggedAdmin)

//Add new product
router.post('/product',
    async (req, res) => {
        const { name, price, previewImgUrl, quantity, colorId, categoryId } = req.body
        try {
            const result = await SQL(`INSERT INTO rootProducts (name)
            values(?)`, name)
            console.log({ categoryId })
            const rootProductId = result.insertId
            await SQL(`INSERT INTO products_categories (category_id, root_product_id)
                           values(?, ?)`, [categoryId, rootProductId])

            await SQL(`INSERT INTO products
                (price, preview_img_url, quantity, color_id, rootProduct_id)
                values(?, ?, ?, ?, ?)`, [price, previewImgUrl, quantity, colorId, rootProductId])

            return res.status(201).send({ msg: "Product added" })
        } catch (error) {
            res.sendStatus(500)
        }
    })

// edit product
router.put('/edit/product/:rootProductId/:productOptionId', async (req, res) => {
    const { rootProductId, productOptionId } = req.params
    const { name, price, previewImgUrl, quantity, colorId } = req.body

    try {
        await SQL(`UPDATE rootproducts SET name=? WHERE id=?`,
            [name, rootProductId])

        await SQL(`UPDATE products
             SET price=?, preview_img_url=?, quantity=?, color_id=?
                          WHERE id=?`,
            [price, previewImgUrl, quantity, colorId, productOptionId])
        return res.send({ msg: "edit" })
    } catch (error) {
        res.send({ msg: "500" })
    }
})



//============================
//sheets

// checkSchema(createNewProductSchema, ['body']), validateRequestSchema,
// update product by id to available/unavailable
router.put('/update/:productId/:available', async (req: Request, res: Response) => {
    const { productId, available } = req.params
    if (!productId || !available || typeof available != "boolean") {
        return res.status(400).send({ error: "missing / wrong info" })
    }
    try {
        await SQL(`UPDATE realProducts SET available=?, WHERE id=?
               values(?,?)`,
            [available, productId])
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})
//  edit product
router.put('/edit/:rootProductId', async (req, res) => {
    const { rootProductId } = req.params
    const body = req.body
    const { newRootProductsReq, categoriesIds, products } = body
    const { name,
        description,
        composition,
        origin,
        height,
        width,
        depth,
        collectionId,
    } = newRootProductsReq
    try {
        const result = await SQL(`UPDATE rootproducts
        SET name=?, description=?, composition=?, origin=?, height=?, width=?, depth=?
        WHERE id=?`,
            [name, description, composition, origin, height, width, depth, rootProductId])

        return res.send({ msg: "edit" })
    } catch (error) {
        res.send({ msg: "500" })
    }
})
