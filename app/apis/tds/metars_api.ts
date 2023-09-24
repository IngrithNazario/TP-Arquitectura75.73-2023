import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { createSuccessResponse, createErrorResponse, Issue } from '../../utils/response_util';

const baseURL = 'https://www.aviationweather.gov';
const pathURL = 'adds/dataserver_current/httpparam';
const staticQueryParams = 'dataSource=metars&requestType=retrieve&format=xml';

interface MetarConfig {
    stationString?: string,
    hoursBeforeNow: number,
}

const retriveMetars = async (metarConfig: MetarConfig) => {
    const url = _makeURL(metarConfig);
    const result = await axios.get(url);
    const xmlParser = new XMLParser();
    const response = (xmlParser.parse(result.data) as any).response;
    
    if (response.data) { // Respuesta exitosa
        const successResponse = createSuccessResponse(response.data.METAR);
        return successResponse;
    } 
    
    if (response.errors) { // Respuesta fallida
        const error = { code: '', error: '', message: response.errors.error };
        const errorResponse = createErrorResponse(error);
        return errorResponse;   
    }
    
    // Respuesta desconocida
    console.log(response);
    const errorResponse = createErrorResponse(Issue.UnknownError);
    return errorResponse;
}

const _makeURL = (metarConfig: MetarConfig) => {
    const queryParamsList: string[] = [];
    Object.entries(metarConfig)
          .forEach(([param, value]) => queryParamsList.push(`${param}=${value}`));
    const dynamicQueryParams = queryParamsList.join('&');
    const url = `${baseURL}/${pathURL}?${staticQueryParams}&${dynamicQueryParams}`;
    return url;
}

const metarsAPI = {
    retriveMetars,
};

export { metarsAPI, MetarConfig };
