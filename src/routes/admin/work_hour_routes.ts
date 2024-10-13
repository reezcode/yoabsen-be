import { getWorkHourC, listWorkHourC, updateWorkHourC } from "../../controllers/admin/work_hour_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";
import validateBody, { workHourSchema } from "../../core/validator";

const { Router } = require('express');

const workHourRoutes = Router();

workHourRoutes.use(adminMiddleware)

workHourRoutes.put('/update/:id', validateBody(workHourSchema) ,updateWorkHourC)
workHourRoutes.get('/list', listWorkHourC)
workHourRoutes.get('/get/:id', getWorkHourC)

export default workHourRoutes;