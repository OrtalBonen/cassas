import express from 'express'

import { SQL } from '../configs/dbconfig'
import { onlyLoggedAdmin } from '../middlewares/onlyLoggedAdmin'
import { onlyLoggedUser } from '../middlewares/onlyLoggedUsers'

export const router = express()

router.get('/', async (req, res) => {
    try {
        const cities = await getCities()
        res.send(cities)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

function getCities() {
    return SQL(`SELECT id, name FROM cities
                ORDER BY name`)
}