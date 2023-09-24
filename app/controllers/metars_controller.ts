import httpStatus from 'http-status';
import { Response } from 'express';
import { GetMetarType } from './schemas';
import { responseUtils, Status } from '../utils';
import { createErrorResponse, Issue } from '../utils/response_util';
import { metarsService } from '../services/metars_service';

const getMetars = async (request: GetMetarType, response: Response) => {
    try {
        const metarConfig = {
            stationString: request.query.station,
            hoursBeforeNow: 1,
        }
    
        const result = await metarsService.getMetars(metarConfig);
        if (result.status === Status.Success) {
            const data = (result as any).data;
            const successResponse = responseUtils.createSuccessResponse(data);
            response.status(httpStatus.OK).send(successResponse);
        } else {
            const data = (result as any).data;
            const errorResponse = responseUtils.createErrorResponse(data);
            response.status(httpStatus.BAD_REQUEST).send(errorResponse);
        }
    } catch (exception: any) {
        const { name, message } = exception;
        const error = { code: name, error: name, message: message };
        console.log(error);
        const errorResponse = createErrorResponse(Issue.InternalServerError);
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
    }
}

const metarsController = {
    getMetars,
}

export { metarsController };
