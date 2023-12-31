import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { responseUtils, zodUtils } from '../utils';
import { z, ZodError } from 'zod';

const validateRequest = <T extends z.ZodTypeAny>(schema: T) => (
    request: Request, response: Response, next: NextFunction) => {
    try {
        const parsedSchema = schema.parse({ 
            body: request.body, 
            query: request.query,
            params: request.params,
        });
        request.body = parsedSchema.body || request.body;
        request.query = parsedSchema.query || request.query;
        request.params = parsedSchema.params || request.params;
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const parsedError =  zodUtils.parseZodError(error);
            response.status(httpStatus.BAD_REQUEST).send(responseUtils.createFailResponse(parsedError));
        } else {
            throw error;
        }
    }
};

export { validateRequest };