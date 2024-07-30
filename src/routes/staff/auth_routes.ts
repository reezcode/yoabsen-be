import { getRefreshSession, login } from "../../controllers/staff/auth_controller";
import validateBody, { loginSchema } from "../../core/validator";

const { Router } = require('express');

const authRoutes = Router();

authRoutes.post('/login', validateBody(loginSchema), login)
authRoutes.post('/refresh', getRefreshSession)

export default authRoutes;