import { Request, Response } from 'express';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { createStaff } from '../../core/repository/admin/staff/service';
import { CustomError } from '../../core/commons/exceptions';

const createStaffC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const data = await createStaff(model)
        if(data.user) {
            return successResponse(res, {
                message: 'Create staff success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Create staff failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { createStaffC }