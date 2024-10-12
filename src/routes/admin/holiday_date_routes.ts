import { createHolidayDateC, deleteHolidayDateC, getHolidayDateC, getListHolidayDateC, updateHolidayDateC } from "../../controllers/admin/holiday_date_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";
import validateBody, { holidayDateCreateSchema, holidayDateUpdateSchema } from "../../core/validator";

const { Router } = require('express');

const holidayDateRoutes = Router();

holidayDateRoutes.use(authMiddleware)

holidayDateRoutes.post('/create', validateBody(holidayDateCreateSchema), createHolidayDateC)
holidayDateRoutes.get('/list', getListHolidayDateC)
holidayDateRoutes.get('/get/:id', getHolidayDateC)
holidayDateRoutes.put('/update/:id', validateBody(holidayDateUpdateSchema), updateHolidayDateC)
holidayDateRoutes.delete('/delete/:id', deleteHolidayDateC)

export default holidayDateRoutes;

