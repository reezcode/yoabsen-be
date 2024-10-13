import { getLocationC, updateLocationC } from "../../controllers/admin/location_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";
import validateBody, { locationSchema } from "../../core/validator";

const { Router } = require('express');

const locationRoutes = Router();

locationRoutes.use(adminMiddleware)

locationRoutes.put('/update', validateBody(locationSchema) ,updateLocationC)
locationRoutes.get('/view', getLocationC)

export default locationRoutes;