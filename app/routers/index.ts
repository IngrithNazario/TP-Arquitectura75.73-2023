import express, { Request, Response } from 'express';
import { pingRouter } from './ping_router';
import { metarRouter } from './metars_router';
import { articlesRouter } from './articles_router';
import { quotesRouter } from './quotes_router';
import { createErrorResponse } from '../utils/response_util';
import httpStatus from 'http-status';

const router = express.Router();
router.use([pingRouter, metarRouter, articlesRouter, quotesRouter]);

// Default controller
router.get('*', (_request: Request, response: Response) => {
    const error = { 
        code: 'resource_not_found', 
        error: 'Resource Not Found', 
        message: 'The requested resource could not be found' 
    };
    const errorResponse = createErrorResponse(error);
    response.status(httpStatus.NOT_FOUND).send(errorResponse);
});

export { router };
