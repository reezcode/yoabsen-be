import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { dashboardAdmin } from '../../core/repository/admin/dashboard/service';

const dashboardAdminC = async (req: Request, res: Response) => {
    try {
        const data = await dashboardAdmin()
        if(data) {
            return successResponse(
                res, {
                    message: 'Get dashboard success',
                    content: data
                }
            )
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get dashboard failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { dashboardAdminC };
