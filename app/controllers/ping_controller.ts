import { Request, Response } from 'express';
import { createSuccessResponse, createErrorResponse, Issue } from '../utils/response_util';
import httpStatus from 'http-status';

const getPing = (_request: Request, response: Response) => {
    try {
        const successResponse = createSuccessResponse('pong');
        response.status(httpStatus.OK).send(successResponse);
    } catch (exception: any) {
        const { name, message } = exception;
        const error = { code: name, error: name, message: message };
        console.log(error);
        const errorResponse = createErrorResponse(Issue.InternalServerError);
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
    }
}

const pingController = {
    getPing,
};

export { pingController };
