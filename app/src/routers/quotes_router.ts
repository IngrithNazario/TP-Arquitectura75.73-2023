import express from 'express';
import { quotesController } from '../controllers';

const quotesRouter = express.Router();

quotesRouter.get('/quote', quotesController.getQuotes);

export { quotesRouter };
