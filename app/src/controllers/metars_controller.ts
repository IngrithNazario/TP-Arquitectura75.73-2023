import httpStatus from 'http-status';
import { Response } from 'express';
import { GetMetarType } from './schemas';
import { responseUtils, Error, executionTime, statsdClient } from '../utils';
import { createErrorResponse, Issue } from '../utils/response_util';
import { metarsService } from '../services/metars_service';

const getMetars = async (request: GetMetarType, response: Response) => {
    const timeProcessor = (milliseconds: number) => statsdClient.gauge('service.metars', milliseconds);
    const controller = executionTime.measure(async () => {
        try {
            const metarConfig = {
                stationString: request.query.station,
                hoursBeforeNow: 1,
            }
        
            const result = await metarsService.getMetars(metarConfig);
            if (result.statusCode === httpStatus.OK) {
                const data = result.data;
                const successResponse = responseUtils.createSuccessResponse(data);
                response.status(result.statusCode).send(successResponse);
            } else {
                const data = result.error as Error;
                const errorResponse = responseUtils.createErrorResponse(data);
                response.status(result.statusCode).send(errorResponse);
            }
        } catch (exception: any) {
            const { name, message } = exception;
            const error = { code: name, error: name, message: message };
            console.log(error);
            const errorResponse = createErrorResponse(Issue.InternalServerError);
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
        }
    }, timeProcessor);
    controller();
}

const metarsController = {
    getMetars,
}

export { metarsController };
