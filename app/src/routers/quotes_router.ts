import express from 'express';
import { quotesController } from '../controllers';
import { limiter } from '../utils';

const LIMIT = 180;
const MINUTES = 60 * 1000;
const quotesRouter = express.Router();

quotesRouter.get('/quote', limiter(LIMIT, MINUTES), quotesController.getQuotes);

export { quotesRouter };
