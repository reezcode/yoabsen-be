import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { UnprocessableEntityError } from '../commons/exceptions';
import { exceptionResponse } from '../commons/response';

const validateBody = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) return next();
      let extractedErrors: any = [];
      result.error.issues.map((issue) => {
        issue.message = issue.message.replace(/_/g, ' ');
        extractedErrors.push({
          [issue.path[0]]: issue.message,
        });
      });

      if (extractedErrors.length > 0)
        throw new UnprocessableEntityError(
          'Validation Failed',
          extractedErrors
        );

      return next();
    } catch (error: any) {
      exceptionResponse(res, error);
    }
  };
};

export default validateBody;
export { attSchema, permitSchema } from './attendance_schema';
export { adminLoginSchema, loginSchema } from './auth_schema';
export { holidayDateCreateSchema, holidayDateUpdateSchema } from './holiday_date_schema';
export { jobPositionCreateSchema, jobPositionUpdateSchema } from './job_position_schema';
export { locationSchema } from './location_schema';
export { profileSchema } from './profile_schema';
export { staffSchema } from './staff_schema';
export { workHourSchema } from './work_hour_schema';

