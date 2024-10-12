import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { createHolidayDate, deleteHolidayDate, getHolidayDate, listHolidayDate, updateHolidayDate } from '../../core/repository/admin/holiday_date/service';

const createHolidayDateC = async (req: Request, res: Response) => {
    try {
        const data = await createHolidayDate(req.body)
        if(data) {
            return successResponse(res, {
                message: 'Create holiday date success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Create holiday date failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const updateHolidayDateC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await updateHolidayDate(id, req.body)
        if(data) {
            return successResponse(res, {
                message: 'Update holiday date success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Update holiday date failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const deleteHolidayDateC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await deleteHolidayDate(id)
        if(data) {
            return successResponse(res, {
                message: 'Delete holiday date success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Delete holiday date failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getHolidayDateC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await getHolidayDate(id)
        if(data) {
            return successResponse(res, {
                message: 'Get holiday date success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get holiday date failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getListHolidayDateC = async (req: Request, res: Response) => {
    try {
        const data = await listHolidayDate()
        if(data) {
            return successResponse(res, {
                message: 'List holiday date success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'List holiday date failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export {
    createHolidayDateC, deleteHolidayDateC,
    getHolidayDateC,
    getListHolidayDateC, updateHolidayDateC
};
