import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { createJobPosition, deleteJobPosition, getJobPosition, listJobPosition, updateJobPosition } from '../../core/repository/admin/job_position/service';

const createJobPositionC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const data = await createJobPosition(model)
        if(data) {
            return successResponse(res, {
                message: 'Create job position success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Create job position failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const updateJobPositionC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const id = req.params.id
        const data = await updateJobPosition(id, model)
        if(data) {
            return successResponse(res, {
                message: 'Update job position success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Update job position failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const deleteJobPositionC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await deleteJobPosition(id)
        if(data) {
            return successResponse(res, {
                message: 'Delete job position success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Delete job position failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getJobPositionC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await getJobPosition(id)
        if(data) {
            return successResponse(res, {
                message: 'Get job position success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get job position failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const listJobPositionC = async (req: Request, res: Response) => {
    try {
        const data = await listJobPosition()
        if(data) {
            return successResponse(res, {
                message: 'List job position success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'List job position failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { createJobPositionC, deleteJobPositionC, getJobPositionC, listJobPositionC, updateJobPositionC };
