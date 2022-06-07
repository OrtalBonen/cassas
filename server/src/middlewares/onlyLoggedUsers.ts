import { NextFunction, Request, Response } from 'express';

export async function onlyLoggedUser(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId || req.session.isAdmin) {
        res.status(401).send({ err: "You are not authorized to perform this action, only logged user can" })
        return
    }
    next()
} 