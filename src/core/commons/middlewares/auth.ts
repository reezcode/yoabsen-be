import { NextFunction, Request, Response } from "express"
import { exceptionResponse } from "../response"
import { CustomError } from "../exceptions"
import client from "../../../database/client"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        return exceptionResponse(res, new CustomError(401, 'Unauthorized'))
    }
    try {
        const { data, error } = await client.auth.getUser(token.replace('Bearer ', ''));
        if (error || !data.user) {
            return exceptionResponse(res, new CustomError(401, 'Unauthorized'));
        }
        next();
    } catch (err) {
        return exceptionResponse(res, new CustomError(500, 'Internal Server Error'));
    }
}

export { authMiddleware }