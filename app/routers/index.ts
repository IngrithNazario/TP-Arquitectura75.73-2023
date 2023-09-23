import express from 'express';
import { pingRouter } from './ping_router';
import { metarRouter } from './metars_router';

const router = express.Router();
router.use([pingRouter, metarRouter]);

export {router};
