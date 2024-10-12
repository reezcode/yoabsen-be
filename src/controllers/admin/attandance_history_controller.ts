import { Request, Response } from 'express';
import { exceptionResponse } from '../../core/commons/response';

const downloadExcel = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}