import { getRefreshSession, login } from "../../controllers/staff/auth_controller";
import validateBody, { loginSchema } from "../../core/validator";
import { refreshTokenSchema } from "../../core/validator/auth_schema";

const { Router } = require('express');

const authRoutes = Router();

authRoutes.post('/login', validateBody(loginSchema), login)
authRoutes.post('/refresh', validateBody(refreshTokenSchema) ,getRefreshSession)

export default authRoutes;