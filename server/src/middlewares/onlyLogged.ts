import { NextFunction, Request, Response } from "express";
//a midleware - only logged(admin & users)
export async function onlyLogged(req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
        res.status(401).send({ error: "You are not authorized to perform this action, please loggin" })
        return
    }
    next()
}