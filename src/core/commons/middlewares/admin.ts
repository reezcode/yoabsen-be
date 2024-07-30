import { NextFunction, Request, Response } from "express"
import { exceptionResponse } from "../response"
import { CustomError } from "../exceptions"
import client from "../../../database/client"
import { getUserByUUID } from "../../repository/staff/profile/user"

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        return exceptionResponse(res, new CustomError(401, 'Unauthorized'))
    }
    try {
        const { data, error } = await client.auth.getUser(token.replace('Bearer ', ''));
        if (error || !data.user) {
            if(error?.message == "invalid JWT: unable to parse or verify signature, token has invalid claims: token is expired") {
                return exceptionResponse(res, new CustomError(401, 'Token expired'));
            } else {
                return exceptionResponse(res, new CustomError(401, 'Invalid JWT'));
            }
        } else {
            try {
                const datum = await getUserByUUID(data.user.id)
                if(datum.role == 'Admin') {
                    next();
                } else {
                    return exceptionResponse(res, new CustomError(401, 'Unauthorized'));
                }
            } catch (e) {
                return exceptionResponse(res, new CustomError(403, "Forbidden"));
            }
     }
    } catch (err) {
        return exceptionResponse(res, new CustomError(500, 'Internal Server Error'));
    }
}

export { adminMiddleware }