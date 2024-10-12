import { Request, Response } from 'express';
import { CustomError } from '../../core/commons/exceptions';
import { exceptionResponse } from '../../core/commons/response';
import { downloadExcel } from '../../core/repository/admin/attandace_history/service';

const downloadExcelC = async (req: Request, res: Response) => {
    try {
         const data = await downloadExcel()
         if(data) {
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                res.setHeader('Content-Disposition', 'attachment; filename=attendance.xlsx')
                res.send(data)
         } else {
                return exceptionResponse(res, new CustomError(400, 'Download excel failed'))
         }
    } catch (error: any) {
        return exceptionResponse(res, error)
    }
}

export { downloadExcelC };
