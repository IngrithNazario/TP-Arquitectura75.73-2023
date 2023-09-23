import express from 'express';
import { pingController } from '../controllers';

const pingRouter = express.Router();

pingRouter.get('/ping', pingController.getPing);

export { pingRouter };
