import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import httpStatus from 'http-status';
import { Error } from '../../utils';

const baseURL = 'https://www.aviationweather.gov';
const pathURL = 'adds/dataserver_current/httpparam';
const staticQueryParams = 'dataSource=metars&requestType=retrieve&format=xml';
const timeout = 3000;

interface MetarConfig {
    stationString?: string,
    hoursBeforeNow: number,
}

const retriveMetars = async (metarConfig: MetarConfig) : Promise<{ statusCode: number, data: any } | { statusCode: number, error: Error }> => {
    try {
        const url = _makeURL(metarConfig);
        const result = await axios.get(url, { timeout, validateStatus: () => true });
        const xmlParser = new XMLParser();
        const response = (xmlParser.parse(result.data) as any).response;
        
        if (response.data) { // Respuesta exitosa
            return { statusCode: httpStatus.OK, data: response.data.METAR };
        } 
        
        if (response.errors) { // Respuesta fallida
            const error: Error = { code: '', error: '', message: response.errors.error };
            return { statusCode: httpStatus.BAD_REQUEST, error };
        }
        
        console.log(response);
        const error = { code: 'internal_server_error', error: 'Internal Server Error', message: '' };
        return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, error };
    } catch(error) {
        if (axios.isAxiosError(error)) {
            if (error.request) {
                const error = { 
                    code: 'request_timeout', 
                    error: 'Request Timeout', 
                    message: `Request took longer than ${timeout} ms`,
                };
                return { statusCode: httpStatus.REQUEST_TIMEOUT, error};
            }
            return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, error: { code: '', error: '', message: error.message } };
        }
        throw error;
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

const metarsAPI = {
    retriveMetars,
};

export { metarsAPI, MetarConfig };
