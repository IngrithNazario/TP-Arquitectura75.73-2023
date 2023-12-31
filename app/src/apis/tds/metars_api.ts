import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import httpStatus from 'http-status';
import { Error, executionTime, statsdClient } from '../../utils';

const baseURL = 'https://www.aviationweather.gov';
const pathURL = 'adds/dataserver_current/httpparam';
const staticQueryParams = 'dataSource=metars&requestType=retrieve&format=xml';

interface MetarConfig {
    stationString?: string,
    hoursBeforeNow: number,
}

const retriveMetars = async (metarConfig: MetarConfig) : Promise<{ statusCode: number, data: any } | { statusCode: number, error: Error }> => {
    const url = _makeURL(metarConfig);
    const timeProcessor = (milliseconds: number) => statsdClient.gauge('external-service.metars', milliseconds);
    const axiosGet = executionTime.measure(axios.get, timeProcessor);
    const result = await axiosGet(url, { validateStatus: () => true });
    const xmlParser = new XMLParser();
    const response = (xmlParser.parse(result.data) as any).response;
    
    if (result.status === httpStatus.OK) {
        if (response.data) { // Respuesta exitosa
            return { statusCode: httpStatus.OK, data: response.data.METAR };
        }
        return { statusCode: httpStatus.OK, data: [] };
    }
    if (result.status === httpStatus.FORBIDDEN) {
        const error = { code: 'Forbidden', error: 'Forbidden', message: 'You don\'t have permission to access' };
        return { statusCode: httpStatus.FORBIDDEN, error };
    }
    const error = { code: '', error: '', message: '' };
    return { statusCode: result.status, error };
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
