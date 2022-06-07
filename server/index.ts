import cors, { CorsOptions } from 'cors';
import express from 'express';
import MySQLStore from 'express-mysql-session';
import session, * as expressSession from 'express-session';
import { router as productsRouter } from './src/routes/products';
import { router as sessionRouter } from './src/routes/session';
import { router as citiesRouter } from './src/routes/cities';
import { router as orderRouter } from './src/routes/order';
import { router as cartRouter } from './src/routes/cart';
import { router as adminRouter } from './src/routes/admin';

// import { orderType } from './src/models/product.model';
import './src/typings/express-session';
import { Schema } from 'express-validator';

const app = express();

const port = 8080
const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
}
const connectionOptions: MySQLStore.Options = {  // setting connection options
    host: 'localhost',
    user: 'root',
    database: 'cassas',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}

const Store = MySQLStore(expressSession)

const SessionStore = new Store(connectionOptions)

const sessionOptions: session.SessionOptions = {
    secret: "vjhhgfvjkho",
    name: "sessions",
    saveUninitialized: true,
    store: SessionStore,
    resave: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 60
    },
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(session(sessionOptions))

//Middlewares-routes
app.use('/admin', adminRouter)
app.use('/products', productsRouter)
app.use('/session', sessionRouter)
app.use('/cities', citiesRouter)
app.use('/order', orderRouter)
app.use('/cart', cartRouter)

// client app
app.use('/', express.static('client'))

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`)
})

