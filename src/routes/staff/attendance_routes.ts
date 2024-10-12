import { createAttendanceC, createPermitC, getAttendanceC, getListAttendanceC } from "../../controllers/staff/attendance_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";
import validateBody, { attSchema, permitSchema } from "../../core/validator";


const { Router } = require('express');

const attRoutes = Router();

attRoutes.use(authMiddleware)

attRoutes.post('/create', validateBody(attSchema) ,createAttendanceC)
attRoutes.get('/list', getListAttendanceC)
attRoutes.get('/:id', getAttendanceC)
attRoutes.post('/permit', validateBody(permitSchema) ,createPermitC)

export default attRoutes;