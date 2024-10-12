import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { getLocation, updateLocation } from '../../core/repository/admin/location/service';

const getLocationC = async (req: Request, res: Response) => {
    try {
        const data = await getLocation()
        if(data) {
            return successResponse(res, {
                message: 'Get location success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get location failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const updateLocationC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const data = await updateLocation(model)
        if(data) {
            return successResponse(res, {
                message: 'Update location success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Update location failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { getLocationC, updateLocationC };

