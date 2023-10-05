import { rateLimit } from 'express-rate-limit'
import { createErrorResponse } from './response_util';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const limiter = (limit: number, minutes: number) => {
    return rateLimit({
    max: limit,
	windowMs: minutes,
	standardHeaders: true,
	legacyHeaders: false,
    handler: (_request: Request, response: Response) => {
        const error = createErrorResponse({code: 'Too Many Requests', error: 'too_many_requests', message: ''});
        response.status(httpStatus.TOO_MANY_REQUESTS).send(error);
      },
    })
};

export { limiter };
