import { getProfileC, updateProfileC } from "../../controllers/staff/profile_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";
import validateBody, { profileSchema } from "../../core/validator";

const { Router } = require('express');

const profileRoutes = Router();

profileRoutes.use(authMiddleware)

profileRoutes.get('/view', getProfileC)
profileRoutes.put('/update', validateBody(profileSchema) ,updateProfileC)

export default profileRoutes;