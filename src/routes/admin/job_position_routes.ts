import { createJobPositionC, deleteJobPositionC, getJobPositionC, listJobPositionC, updateJobPositionC } from "../../controllers/admin/job_position_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";
import validateBody, { jobPositionCreateSchema, jobPositionUpdateSchema } from "../../core/validator";

const { Router } = require('express');

const jobPositionRoutes = Router();

jobPositionRoutes.use(adminMiddleware)

jobPositionRoutes.post('/create', validateBody(jobPositionCreateSchema),createJobPositionC)
jobPositionRoutes.get('/list', listJobPositionC)
jobPositionRoutes.get('/get/:id', getJobPositionC)
jobPositionRoutes.put('/update/:id', validateBody(jobPositionUpdateSchema), updateJobPositionC)
jobPositionRoutes.delete('/delete/:id', deleteJobPositionC)

export default jobPositionRoutes;