import { createAttendanceC } from "../../controllers/staff/attendance_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";
import validateBody, { attSchema } from "../../core/validator";


const { Router } = require('express');

const attRoutes = Router();

attRoutes.use(authMiddleware)

attRoutes.post('/create', validateBody(attSchema) ,createAttendanceC)

export default attRoutes;