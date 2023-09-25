import express from 'express';
import { pingRouter } from './ping_router';
import { metarRouter } from './metars_router';
import { articlesRouter } from './articles_router';

const router = express.Router();
router.use([pingRouter, metarRouter, articlesRouter]);

export { router };
