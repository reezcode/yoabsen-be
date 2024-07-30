import { createStaffC } from "../../controllers/admin/staff_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";
import validateBody, { staffSchema } from "../../core/validator";


const { Router } = require('express');

const staffRoute = Router();

staffRoute.use(adminMiddleware)

staffRoute.post('/staff/create', validateBody(staffSchema), createStaffC)

export default staffRoute;