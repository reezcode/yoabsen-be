import { exceptionResponse, successResponse } from "../../core/commons/response"
import { Request, Response } from 'express';
import { createAttendance } from "../../core/repository/staff/attendance/service";
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

export { createAttendanceC }