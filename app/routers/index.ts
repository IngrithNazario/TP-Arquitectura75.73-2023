import express from 'express';
import { pingRouter } from './ping_router';
import { metarRouter } from './metars_router';
import { articlesRouter } from './articles_router';
import { quotesRouter } from './quotes_router';

const router = express.Router();
router.use([pingRouter, metarRouter, articlesRouter, quotesRouter]);

export { router };
