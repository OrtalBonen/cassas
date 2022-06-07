import { NextFunction, Request, Response } from "express";

export async function onlyLoggedAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session.isAdmin) {
        res.status(401).send({ error: "You are not authorized to perform this action, only Admin can" })
        return
    }
    next()
}