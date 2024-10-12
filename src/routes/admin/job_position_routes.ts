import { createJobPositionC, deleteJobPositionC, getJobPositionC, listJobPositionC, updateJobPositionC } from "../../controllers/admin/job_position_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";
import validateBody, { jobPositionCreateSchema, jobPositionUpdateSchema } from "../../core/validator";

const { Router } = require('express');

const jobPositionRoutes = Router();

jobPositionRoutes.use(authMiddleware)

jobPositionRoutes.post('/create', validateBody(jobPositionCreateSchema),createJobPositionC)
jobPositionRoutes.get('/list', listJobPositionC)
jobPositionRoutes.get('/get/:id', getJobPositionC)
jobPositionRoutes.put('/update/:id', validateBody(jobPositionUpdateSchema), updateJobPositionC)
jobPositionRoutes.delete('/delete/:id', deleteJobPositionC)

export default jobPositionRoutes;