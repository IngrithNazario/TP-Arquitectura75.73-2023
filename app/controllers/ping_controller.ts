import { Request, Response } from 'express';
import { createSuccessResponse } from '../utils/response_util';
import httpStatus from 'http-status';

const getPing = async (_request: Request, response: Response) => {
    const successResponse = createSuccessResponse('pong');
    response.status(httpStatus.OK).send(successResponse);
}

const pingController = {
    getPing,
};

export { pingController };
