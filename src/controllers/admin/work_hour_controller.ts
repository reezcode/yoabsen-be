import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { getWorkHour, listWorkHour, updateWorkHour } from '../../core/repository/admin/work_hour/service';

const updateWorkHourC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const id = req.params.id
        const data = await updateWorkHour(id,model)
        if(data) {
            return successResponse(res, {
                message: 'Update work hour success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Update work hour failed'))
        }    
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const listWorkHourC = async (req: Request, res: Response) => {
    try {
        const data = await listWorkHour()
        if(data) {
            return successResponse(res, {
                message: 'List work hour success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'List work hour failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getWorkHourC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await getWorkHour(id)
        if(data) {
            return successResponse(res, {
                message: 'Get work hour success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get work hour failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { getWorkHourC, listWorkHourC, updateWorkHourC };
