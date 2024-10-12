import { getRefreshSession, loginAdminC } from "../../controllers/admin/auth_controller";
import validateBody, { adminLoginSchema } from "../../core/validator";
import { refreshTokenSchema } from "../../core/validator/auth_schema";

const { Router } = require('express');

const authAdminRoute = Router();

authAdminRoute.post('/login', validateBody(adminLoginSchema), loginAdminC)
authAdminRoute.post('/refresh', validateBody(refreshTokenSchema), getRefreshSession)

export default authAdminRoute;