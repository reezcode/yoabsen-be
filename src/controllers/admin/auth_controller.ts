
import { Request, Response } from 'express';
import { loginAdmin, refreshSession } from '../../core/repository/admin/auth/service';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { CustomError } from '../../core/commons/exceptions';


const loginAdminC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const data = await loginAdmin(model)
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

export { loginAdminC, getRefreshSession }