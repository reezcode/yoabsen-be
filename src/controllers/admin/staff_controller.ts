import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { createStaff, deleteStaff, getStaff, listStaff, updateStaff } from '../../core/repository/admin/staff/service';

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

const updateStaffC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const id = req.params.id
        const data = await updateStaff(id, model)
        if(data) {
            return successResponse(res, {
                message: 'Update staff success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Update staff failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const deleteStaffC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await deleteStaff(id)
        if(data) {
            return successResponse(res, {
                message: 'Delete staff success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Delete staff failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getStaffC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await getStaff(id)
        if(data) {
            return successResponse(res, {
                message: 'Get staff success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get staff failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const listStaffC = async (req: Request, res: Response) => {
    try {
        const data = await listStaff()
        if(data) {
            return successResponse(res, {
                message: 'List staff success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'List staff failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { createStaffC, deleteStaffC, getStaffC, listStaffC, updateStaffC };

