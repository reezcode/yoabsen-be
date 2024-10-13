import { deletePermitC, getListPermitStaffC, permitFollowUpC } from "../../controllers/admin/staff_permit_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";
import validateBody from "../../core/validator";
import { staffPermitSchema } from "../../core/validator/staff_permit_schema";

const { Router } = require('express');

const permitRoutes = Router();

permitRoutes.use(adminMiddleware)

permitRoutes.get('/list', getListPermitStaffC)
permitRoutes.put('/follow-up/:id', validateBody(staffPermitSchema), permitFollowUpC)
permitRoutes.delete('/delete/:id', deletePermitC)

export default permitRoutes;