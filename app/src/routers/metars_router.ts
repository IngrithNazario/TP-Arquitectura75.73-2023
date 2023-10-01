import express from 'express';
import { metarsController } from '../controllers';
import { validateRequest } from '../middlewares/validate_request_middleware';
import { GetMetarSchema } from '../controllers/schemas';

const metarRouter = express.Router();

metarRouter.get('/metar', validateRequest(GetMetarSchema), metarsController.getMetars);

export { metarRouter };
