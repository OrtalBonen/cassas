import mysql from 'mysql'

const connection: mysql.Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cassas'


})
connection.connect(err => {
    if (err) {
        return console.log(err)
    }
    console.log("connected to mysql server")
})

export function SQL(query: string, values?: unknown): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

