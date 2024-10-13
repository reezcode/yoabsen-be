import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse, successResponse } from '../../core/commons/response';
import { deletePermit, getListPermitStaff, permitFollowUp } from '../../core/repository/admin/staff_permit/service';

const getListPermitStaffC = async (req: Request, res: Response) => {
    try {
        const data = await getListPermitStaff()
        if(data) {
            return successResponse(res, {
                message: 'List permit staff success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'List permit staff failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const permitFollowUpC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const model = req.body
        const data = await permitFollowUp(id, model)
        if(data) {
            return successResponse(res, {
                message: 'Permit follow up success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Permit follow up failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

const deletePermitC = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await deletePermit(id)
        if(data) {
            return successResponse(res, {
                message: 'Delete permit success',
                content: data
            })
        } else {
            return exceptionResponse(res, new CustomError(400, 'Delete permit failed'))
        }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { deletePermitC, getListPermitStaffC, permitFollowUpC };
