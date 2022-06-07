import express, { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { SQL } from "../configs/dbconfig";
import { onlyLogged } from '../middlewares/onlyLogged';
import { validateRequestSchema } from '../middlewares/validateRequestSchema';
import { RegisterRequest } from "../models/register.model";
import { User } from "../models/User.model";
import { emailSchema } from '../schema/emailSchema';
import { israeliIdSchema } from '../schema/israeliIdSchema';
import { loginSchema } from '../schema/loginSchema';
import { registerSchema } from '../schema/registerSchema';
import { comparePassword, hashPassword } from "../utilities/hashPassword";

export const router = express.Router()

//check if user is loggedin or not
router.get('/', async (req, res) => {
    const { userId } = req.session
    try {
        if (!userId) return res.send({})
        const user = await findUser(userId)
        user.hash = "undefined" // required always!!!
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/confirmEmail/:email',
    checkSchema(emailSchema, ['params']),
    validateRequestSchema,
    async (req: Request, res: Response) => {
        const { email } = req.params
        try {
            const emailExist = await isEmailExist(email)
            res.send({ emailExist })
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    })

//validate israeliId (valid and isn't exist)
router.get('/confirmIsraeliId/:israeliId',
    checkSchema(israeliIdSchema, ['params']), validateRequestSchema,
    async (req, res) => {
        const { israeliId } = req.params
        try {
            const israeliIdExist = await isIsraeliIdExist(israeliId)
            res.send({ israeliIdExist })
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    })

router.post('/register',
    checkSchema(registerSchema), validateRequestSchema,
    async (req: Request, res: Response) => {
        const body: RegisterRequest = req.body
        const {
            email,
            israeliId,
            password,
            firstName,
            lastName,
            cityId,
            street,
            streetNumber,
            dateOfBirth } = body
        try {
            const hash = await hashPassword(password)
            console.log(hash)
            const result = await SQL(`INSERT INTO users(email, israeliId, hash, firstName, lastName,cityId,
                                     street,streetNumber,dateOfBirth )
                             values(?, ?, ?, ?, ?,?, ?, ?, ?)`, [
                email, israeliId, hash, firstName, lastName, cityId,
                street, streetNumber, dateOfBirth
            ])
            const user: User = await findUser(result.insertId)
            user.hash = "undefined" // required always!!!
            //after register user considerd as loggedin
            req.session.userId = user.id
            req.session.isAdmin = user.isAdmin
            res.status(201).send(user)
            return
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    })

router.post('/login', checkSchema(loginSchema, ['body']), validateRequestSchema, async (req, res) => {
    const { email, password } = req.body
    try {
        const users: User[] = await SQL('SELECT * FROM users WHERE users.email=?', email)
        if (!users.length) return res.status(404).send('User not found')
        const user = users[0]

        const match = await comparePassword(password, user.hash)
        if (!match) return res.status(400).send({ error: 'Incorrect combination of email and password' })

        req.session.userId = user.id
        req.session.isAdmin = user.isAdmin
        delete user.hash  //required always!!!
        res.send(user)
    } catch (err) {
        console.log(err)
    }
})

router.delete('/logout', onlyLogged, async (req, res) => {
    try {
        req.session.destroy((err: any) => err)
        res.status(201).send({ msg: "log out succeed" })
    } catch (err) {
        console.log(err)
    }
})

async function findUser(id: number) {
    const query = 'SELECT * from users WHERE id=?'
    const result: User[] = await SQL(query, id)
    if (!result.length) return null
    const user = result[0]
    return user
}

export async function isIsraeliIdExist(israeliId) {
    const ids: { id: number }[] = await SQL(`SELECT id from users WHERE israeliId=?`, israeliId)
    return !!ids.length
}

export async function isEmailExist(email: string) {
    const emails: { id: number }[] = await SQL(`SELECT id FROM users WHERE email=?`, email)
    return !!emails.length
}
