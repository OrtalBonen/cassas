import express from 'express'
import { checkSchema, oneOf, param, Schema, validationResult } from 'express-validator'
import { SQL } from '../configs/dbconfig'
import { validateRequestSchema } from '../middlewares/validateRequestSchema'
import { getProductsParams } from '../models/product.model'

export const router = express.Router()

//  get colors list
router.get('/colors', async (req, res) => {
    try {
        const colors = await getColors()
        res.send(colors)
    } catch (error) {
        res.sendStatus(500)
    }
})

function getColors() {
    return SQL(`SELECT id, name FROM colors
    ORDER BY name`)
}

// get array of departments with categories array to each department
router.get('/departments', async (req, res) => {
    try {
        const departments = await getDepartments()
        res.send(departments)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

//get specific department
router.get('/department/:departmentId',
    param('departmentId').isInt({ gt: 0 }).toInt(), validateRequestSchema,
    async (req, res) => {
        const errors = validationResult(req)

        //const { departmentId } = req.params
        const departmentId = req.params.departmentId as number
        try {
            const department = await getDepartment(departmentId)
            if (!department) return res.sendStatus(404)
            res.send(department)
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    })

// get departments(array- every item has array with categories)
async function getDepartments() {
    const query = `SELECT departments.id,
                          departments.name,
                          CONCAT(
                          '[',
                           (SELECT GROUP_CONCAT(
                          JSON_OBJECT(
                          'name', categories.name,
                          'id', categories.id
                          )  
                          )FROM categories
                          WHERE categories.department_id=departments.id)
                          ,']') AS categories
                          FROM departments;`
    const departments = await SQL(query)
    for (const department of departments) {
        department.categories = JSON.parse(department.categories)
    }
    return departments
}

async function getDepartment(departmentId: number) {
    const query = `SELECT departments.id,
                          departments.name,
                          CONCAT(
                          '[',
                          (SELECT GROUP_CONCAT(
                          JSON_OBJECT(
                          'name', categories.name,
                          'id', categories.id
                          )  
                          )FROM categories
                          WHERE categories.department_id=departments.id)
                          ,']') AS categories
                          FROM departments
                          WHERE departments.id=?`

    const result = await SQL(query, departmentId)
    if (!result.length) return null
    const department = result[0]
    department.categories = JSON.parse(department.categories)
    return department
}

router.get('/departments', async (req, res) => {
    try {
        const departments = await SQL('SELECT id, name FROM departments')
        res.send(departments)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories = await SQL('SELECT id, name id FROM categories')
        res.send(categories)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/rootProduct/:rootProductId', param('rootProductId').isInt({ gt: 0 }).toInt(), validateRequestSchema, async (req, res) => {

    const rootProductId = req.params.rootProductId as number
    const isIncludeImages = false
    try {
        const product = await getFullProduct(rootProductId, isIncludeImages)
        if (!product) return res.sendStatus(404)
        res.send(product)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

async function getProductImages(rootProductId: number) {
    return await SQL(`SELECT
                      product_images.id, img_url AS imgUrl,
                      product_id AS productId
                      FROM product_images 
                      INNER JOIN products
                      ON product_images.product_id=products.id 
                      WHERE products.rootProduct_id=?`, rootProductId)
}

//Full product= rootProduct and it's product options (and images for each option(optional))
async function getFullProduct(rootProductId: number, isIncludeImages: boolean) {
    const query = `SELECT
                   id, name, description, composition,
                   origin, height, width, depth,
                   CONCAT(
                   '[',
                   (SELECT GROUP_CONCAT(
                   JSON_OBJECT(
                   'id', categories.id,
                   'name', categories.name,
                   'departmentId', categories.department_id,
                   'departmentName', departments.name
                   )
                   ) FROM products_categories
                   INNER JOIN categories ON categories.id=products_categories.category_id
                   INNER JOIN departments ON departments.id=categories.department_id
                   WHERE products_categories.root_product_id=rootProducts.id)
                   ,']') AS categories,
                   CONCAT(
                   '[',
                   (SELECT GROUP_CONCAT(
                   JSON_OBJECT(
                   'id', products.id,
                   'price', price,
                   'available', available,
                   'quantity', quantity,
                   'rootProductId', rootProduct_id,
                   'colorId', color_id,
                   'colorName', colors.name,
                   'previewImgUrl', preview_img_url
                   )
                   ) FROM products
                   INNER JOIN colors ON products.color_id=colors.id
                   WHERE products.rootProduct_id=rootProducts.id)
                   ,']') AS productOptions
                   FROM rootproducts WHERE rootproducts.id=?`

    const result = await SQL(query, rootProductId)
    if (!result.length) return null

    const product = result[0]
    if (product.categories === null) return product
    product.categories = JSON.parse(product.categories)

    // if (product.productOptions === null) return product
    if (product.productOptions === null) {
        product.productOptions = []
        return product
    }
    product.productOptions = JSON.parse(product.productOptions)

    if (!isIncludeImages) return product
    const images = await getProductImages(rootProductId)
    for (const productOption of product.productOptions) {
        productOption.images = []
    }
    for (const image of images) {
        for (const productOption of product.productOptions) {
            if (productOption.id === image.productId) {
                delete image.productId
                productOption.images.push(image)
            }
        }
    }
    return product
}

const SearchProductsValidator = [
    oneOf([checkSchema({
        departmentId: {
            in: 'query',
            exists: {
                options: { checkFalsy: false, checkNull: false },
                bail: true,
                errorMessage: 'departmentId is not exist'
            },
            isInt: {
                options: { gt: 0 },
                errorMessage: 'departmentId is not valid'
            },
            toInt: true
        }
    }),
    checkSchema({
        categoryId: {
            in: 'query',
            exists: {
                options: { checkFalsy: false, checkNull: false },
                bail: true,
                errorMessage: 'categoryId is not exist'
            },
            isInt: {
                options: { gt: 0 },
                errorMessage: 'categoryId is not valid'
            },
            toInt: true
        }
    }),
    checkSchema({
        searchWord: {
            in: 'query',
            exists: {
                options: { checkFalsy: false, checkNull: false },
                bail: true,
                errorMessage: 'searchWord is not exist'
            },
            notEmpty: { errorMessage: 'search word is empty' }
        }
    }),
    checkSchema({
        newCollection: {
            in: 'query',
            isBoolean: { errorMessage: 'newCollection is not valid' }
        }
    })
    ]),
]

const limitProductsSchema: Schema = {
    offset: {
        in: 'query',
        exists: {
            bail: true,
            errorMessage: 'offset is not exist'
        },
        isInt: {
            options: { gt: -1 },
            errorMessage: 'offset is not valid'
        },
        toInt: true
    }
    ,
    rowCount: {
        in: 'query',
        exists: {
            bail: true,
            errorMessage: 'rowCount is not exist'
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'rowCount is not valid'
        },
        toInt: true
    }
}

//get products
router.get('/limit', SearchProductsValidator, checkSchema(limitProductsSchema), validateRequestSchema, async (req, res) => {

    const departmentId = req.query.departmentId as number
    const categoryId = req.query.categoryId as number
    const searchWord = req.query.searchWord as string
    const newCollection = req.query.newCollection as boolean
    const offset = req.query.offset as number
    const rowCount = req.query.rowCount as number

    const productParams: getProductsParams = {
        newCollection, departmentId, categoryId, searchWord, offset, rowCount
    }

    try {
        const products = await getFullProducts(productParams)
        if (products === null) return res.sendStatus(404)
        res.send(products)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// get full products=array, each ceil contain root product and product options
async function getFullProducts(productParams: getProductsParams) {
    const { departmentId, categoryId, searchWord, offset, rowCount, newCollection } = productParams
    //secured, offset and rowCount are validate as number

    const baseQuery = `SELECT rootproducts.id, rootproducts.name, 
                       description, composition,
                       origin, height, width, depth,
                       CONCAT(
                       '[',
                       (SELECT GROUP_CONCAT(
                       JSON_OBJECT(
                       'id', products.id,
                       'date', products.date,
                       'price', price,
                       'available', available,
                       'quantity', quantity,
                       'rootProductId', rootProduct_id,
                       'colorId', color_id,
                       'colorName', colors.name,
                       'previewImgUrl', preview_img_url
                       )
                       ) FROM products
                       INNER JOIN colors ON products.color_id=colors.id
                       WHERE products.rootProduct_id=rootProducts.id)
                       ,']') AS productOptions
                       FROM rootProducts `

    if (searchWord || newCollection) {
        let condition: string
        let products
        if (searchWord) {
            condition = `WHERE rootproducts.name LIKE CONCAT('%', ?, '%')`
            products = await SQL(
                `${baseQuery}
            ${condition}
            ORDER BY rootProducts.id DESC
            LIMIT ${offset},${rowCount}`, searchWord)
        }

        if (newCollection) {
            condition = `INNER JOIN products ON products.rootProduct_id=rootProducts.id
                         WHERE products.date BETWEEN CURDATE() - INTERVAL 100 DAY AND CURDATE()
                         GROUP BY rootProducts.id
                         LIMIT ${offset},${rowCount}`
            products = await SQL(`${baseQuery}
             ${condition}`)
        }

        if (!products.length) return products
        for (const product of products) {
            if (product.productOptions) {
                product.productOptions = JSON.parse(product.productOptions)
            }
            if (product.categories) {
                product.categories = JSON.parse(product.categories)
            }
        }
        return products
    }

    if (departmentId || categoryId) {
        let condition: string
        let id: number
        if (departmentId) {
            condition = 'WHERE categories.department_id=?'
            id = departmentId
        }
        if (categoryId) {
            condition = `WHERE categories.id=?`
            id = categoryId
        }

        const products = await SQL(`${baseQuery}
    INNER JOIN products_categories ON products_categories.root_product_id =rootProducts.id
    INNER JOIN categories ON categories.id=products_categories.category_id
    ${condition}
    ORDER BY rootProducts.id DESC
    LIMIT ${offset},${rowCount}`, id)
        for (const product of products) {
            if (product.productOptions) {
                product.productOptions = JSON.parse(product.productOptions)
            }
            if (product.categories) {
                product.categories = JSON.parse(product.categories)
            }
        }
        return products
    }
}

router.get('/count', SearchProductsValidator, validateRequestSchema, async (req, res) => {
    const departmentId = req.query.departmentId as number
    const categoryId = req.query.categoryId as number
    const searchWord = req.query.searchWord as string
    const newCollection = req.query as boolean
    try {
        const count = await getTotalNumberOfProducts(searchWord, departmentId, categoryId, newCollection)
        res.send({ count })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

//return total number of products by search/department/category
//checked
async function getTotalNumberOfProducts(searchWord: string, departmentId: number, categoryId: number, newCollection: boolean) {

    let productCount: number
    let result: { count: number }[]
    if (searchWord) {
        const query = `SELECT COUNT(*) AS count
                       FROM rootproducts 
                       WHERE rootproducts.name LIKE "%${searchWord}%"`
        result = await SQL(query)
    }
    else if (departmentId) {
        const query = `SELECT COUNT(*) AS count
                       FROM products_categories 
                       inner JOIN categories ON products_categories.category_id=categories.id
                       WHERE categories.department_id=?`
        result = await SQL(query, departmentId)
    }
    else if (categoryId) {
        const query = `SELECT COUNT(id) AS count
                       FROM products_categories
                       WHERE category_id=?`
        result = await SQL(query, categoryId)
    }
    else if (newCollection) {
        const query = `SELECT COUNT( DISTINCT rootProduct_id) AS count
                       FROM rootproducts
                       INNER JOIN products ON products.rootProduct_id=rootProducts.id
                       WHERE products.date BETWEEN CURDATE() - INTERVAL 100 DAY AND CURDATE()`

        result = await SQL(query)
    }

    productCount = result[0].count
    return productCount
}

router.get('/productCount/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params
    try {
        const query = `SELECT COUNT(id) AS number
                       FROM products_categories
                       WHERE category_id=?`
        const result = await SQL(query, categoryId)
        const productCount = result[0].number
        res.send({ productCount })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// get total number of product by department
router.get('/productCount/department/:departmentId', async (req, res) => {
    const { departmentId } = req.params
    try {
        const query = `SELECT COUNT(*) AS productCount
                       FROM products_categories 
                       inner JOIN categories ON products_categories.category_id=categories.id
                       WHERE categories.department_id=?`
        const result = await SQL(query, departmentId)
        const productCount = result[0].productCount
        res.send({ productCount })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})
