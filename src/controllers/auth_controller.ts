import { exceptionResponse, successResponse } from "../core/commons/response"
import { Request, Response } from 'express';
import { CustomError } from "../core/commons/exceptions";
import { loginUser, refreshSession } from "../core/repository/staff/auth/service";


const login = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const data = await loginUser(model)
        if(data.user) {
            return successResponse(res, {
                message: 'Login success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'User not found'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getRefreshSession = async (req: Request, res:Response) => {
    try {
        const token = req.body.refresh_token
        const data = await refreshSession(token)
        if(data) {
            return successResponse(res, {
                message: 'Refresh token success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Token not found'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { login, getRefreshSession }