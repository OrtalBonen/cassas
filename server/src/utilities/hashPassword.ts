import bcrypt from 'bcrypt'
import { resolve } from 'path'


export function hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}

export function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}


