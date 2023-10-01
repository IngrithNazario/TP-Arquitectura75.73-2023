import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { createErrorResponse, Issue } from '../utils/response_util';
import { responseUtils } from '../utils';
import { quotesService } from '../services';

const getQuotes = async (_request: Request, response: Response) => {
    try {
        const quotesConfig = {
            limit: 1,
        }
    
        const quotes = await quotesService.getQuotes(quotesConfig);
        if (quotes.statusCode === httpStatus.OK) {
            const data = quotes.data;
            const successResponse = responseUtils.createSuccessResponse(data);
            response.status(quotes.statusCode).send(successResponse);
        } else {
            const data = quotes.error;
            const errorResponse = responseUtils.createErrorResponse(data);
            response.status(quotes.statusCode).send(errorResponse);
        }
    } catch (exception: any) {
        const { name, message } = exception;
        const error = { code: name, error: name, message: message };
        console.log(error);
        const errorResponse = createErrorResponse(Issue.InternalServerError);
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
    }
}

const quotesController = {
    getQuotes,
}

export { quotesController };
