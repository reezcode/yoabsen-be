import { Request, Response } from 'express';
import { getDashboard } from '../../core/repository/staff/dashboard/service';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { CustomError } from '../../core/commons/exceptions';

const getDashboardC = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization
        const data = await getDashboard(token!)
        if(data) {
            return successResponse(res, {
                message: 'Get dashboard success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get dashboard failed'))
        }
    } catch (e: any) {
        return exceptionResponse(res, e)
    }
}

const getCurrentTime = async (req: Request, res: Response) => {
    try {
        const date = new Date()
        return successResponse(res, {
            message: 'Get current time success',
            content: date.toISOString()
        })
    } catch (e: any) {
        return exceptionResponse(res, e)
    }
}

export { getDashboardC, getCurrentTime }