import express from 'express';
import { articlesController } from '../controllers';
import { limiter } from '../utils';

const LIMIT = 500;
const MINUTES = 60 * 1000;
const articlesRouter = express.Router();

articlesRouter.get('/spaceflight_news', limiter(LIMIT, MINUTES), articlesController.getArticles);

export { articlesRouter };
