import { Response } from 'express';
import { metarAPI, MetarConfig } from '../apis';
import { GetMetarType } from './schemas';
import { responseUtils, Status } from '../utils';
import { Issue } from '../utils/response_util';
import { decode } from 'metar-decoder';
import httpStatus from 'http-status';

const getMetars = async (request: GetMetarType, response: Response) => {
    const stationString = request.query.station;
    const metarConfig: MetarConfig = {
        stationString,
        hoursBeforeNow: 1,
    }
    const result = await metarAPI.retriveMetars(metarConfig);

    if (result.status === Status.Success) {
        // Esto se puede hacer en una capa adicional de services.
        const data = (result as any).data;
        const dataList = [];
        if (Array.isArray(data)) {
            data.forEach(element => {dataList.push(decode(element.raw_text));});
        } else {
            dataList.push(decode((result as any).data.raw_text));
        }
        // Esto se puede hacer en una capa adicional de services.
        const successResponse = responseUtils.createSuccessResponse(dataList);
        response.status(httpStatus.OK).send(successResponse);
    } else if (result.status === Status.Exception) {
        const errorResponse = responseUtils.createErrorResponse(Issue.InternalServerError);
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
    } else {
        const data = (result as any).data;
        const errorResponse = responseUtils.createErrorResponse(data);
        console.log(errorResponse);
        response.status(httpStatus.BAD_REQUEST).send(errorResponse);
    }
}

const metarsController = {
    getMetars,
}

export { metarsController };
