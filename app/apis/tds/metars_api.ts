import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { createSuccessResponse, createErrorResponse, createExceptionResponse, Issue } from '../../utils/response_util';

const baseURL = 'https://www.aviationweather.gov';
const pathURL = 'adds/dataserver_current/httpparam';
const staticQueryParams = 'dataSource=metars&requestType=retrieve&format=xml';

interface MetarConfig {
    stationString?: string,
    hoursBeforeNow: number,
}

const retriveMetars = async (metarConfig: MetarConfig) => {
    try {
        const url = _makeURL(metarConfig);
        const result = await axios.get(url);
        const xmlParser = new XMLParser();
        const response = (xmlParser.parse(result.data) as any).response;
        
        if (response.data) { // Respuesta exitosa
            const successResponse = createSuccessResponse(response.data.METAR);
            return successResponse;
        } else if (response.errors) { // Respuesta fallida
            const error = {
                code: '',
                error: '',
                message: response.errors.error,
            };
            const errorResponse = createErrorResponse(error);
            return errorResponse;   
        } else { // Respuesta desconocida
            const errorResponse = createErrorResponse(Issue.UnknownError);
            console.log(response);
            return errorResponse;
        }
    } catch (exception: any) { // Error interno en nuestro servidor
        const error = {
            code: exception.name,
            error: exception.name,
            message: exception.message
        };
        const errorResponse = createExceptionResponse(error);
        console.log(errorResponse);
        return errorResponse;
    }
}

const _makeURL = (metarConfig: MetarConfig) => {
    const queryParamsList: string[] = [];
    Object.entries(metarConfig)
          .forEach(([param, value]) => queryParamsList.push(`${param}=${value}`));
    const dynamicQueryParams = queryParamsList.join('&');
    const url = `${baseURL}/${pathURL}?${staticQueryParams}&${dynamicQueryParams}`;
    return url;
}

const metarAPI = {
    retriveMetars,
};

export { metarAPI, MetarConfig };
