import express from 'express';
import { articlesController } from '../controllers';

const articlesRouter = express.Router();

articlesRouter.get('/spaceflight_news', articlesController.getArticles);

export { articlesRouter };
