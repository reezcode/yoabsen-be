import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { getProfile, updateProfile } from '../../core/repository/staff/profile/service';

const getProfileC = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization
        const data = await getProfile(token!)
        if(data) {
            return successResponse(res, {
                message: 'Get profile success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get profile failed'))
        }
    } catch (e: any) {
        return exceptionResponse(res, e)
    }
}

const updateProfileC = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization
        const model = req.body
        const data = await updateProfile(token!, model)
        if(data) {
            return successResponse(res, {
                message: 'Update profile success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Update profile failed'))
        }
    } catch (e:any) {
        return exceptionResponse(res, e)
    }
}

export { getProfileC, updateProfileC }