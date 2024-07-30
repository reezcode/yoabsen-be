import { exceptionResponse, successResponse } from "../../core/commons/response"
import { Request, Response } from 'express';
import { createAttendance, getAttendance, getListAttendance } from "../../core/repository/staff/attendance/service";
import { CustomError } from "../../core/commons/exceptions";

const createAttendanceC = async (req: Request, res: Response) => {
    try {
        const model = req.body
        const token = req.headers.authorization
        const data = await createAttendance(token!, model)
        if(data) {
            return successResponse(res, {
                message: data.message,
                content: data.content
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Create attendance failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getListAttendanceC = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization
        const extraParam = req.query
        const data = await getListAttendance(token!, extraParam)
        if(data) {
            return successResponse(res, {
                message: 'List attendance success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'List attendance failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const getAttendanceC = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization
        const id = req.params.id
        const data = await getAttendance(token!, id)
        if(data) {
            return successResponse(res, {
                message: 'Get attendance success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Get attendance failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { createAttendanceC, getListAttendanceC, getAttendanceC }