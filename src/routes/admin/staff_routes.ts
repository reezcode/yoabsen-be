import { createStaffC, deleteStaffC, getStaffC, listStaffC, updateStaffC } from "../../controllers/admin/staff_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";
import validateBody, { staffSchema } from "../../core/validator";
import { staffUpdateSchema } from "../../core/validator/staff_schema";


const { Router } = require('express');

const staffRoute = Router();

staffRoute.use(adminMiddleware)

staffRoute.post('/staff/create', validateBody(staffSchema), createStaffC)
staffRoute.put('/staff/update/:id', validateBody(staffUpdateSchema), updateStaffC)
staffRoute.delete('/staff/delete/:id', deleteStaffC)
staffRoute.get('/staff/get/:id', getStaffC)
staffRoute.get('/staff/list', listStaffC)

export default staffRoute;