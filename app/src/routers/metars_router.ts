import express from 'express';
import { metarsController } from '../controllers';
import { validateRequest } from '../middlewares/validate_request_middleware';
import { GetMetarSchema } from '../controllers/schemas';
import { limiter } from '../utils';

const LIMIT = 8000;
const MINUTES = 60 * 1000;
const metarRouter = express.Router();

metarRouter.get('/metar', limiter(LIMIT, MINUTES), validateRequest(GetMetarSchema), metarsController.getMetars);

export { metarRouter };
