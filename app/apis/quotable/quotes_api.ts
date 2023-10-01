import axios from 'axios';
import httpStatus from 'http-status';
import { Error } from '../../utils/response_util';

const baseURL = 'https://api.quotable.io';
const pathURL = 'quotes/random';

interface QuotesConfig {
    limit?: number,
}

const retrieveQuotes = async (quotesConfig: QuotesConfig): Promise<{ statusCode: number, data: any } | { statusCode: number, error: Error }> => {
    const url = _makeURL(quotesConfig);
    const response = await axios.get(url, { validateStatus: () => true });
    const data = response.data;

    if (response.status === httpStatus.OK) {
        return { statusCode: httpStatus.OK, data };
    }
    if (response.status === httpStatus.TOO_MANY_REQUESTS) {
        const error = { code: 'too_many_requests', error: 'Too Many Requests', message: 'The server could not process the requests' };
        return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, error };            
    }
    console.log(data);
    const error = { code: 'internal_server_error', error: 'Internal Server Error', message: 'An internal error occurred during processing' };
    return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, error };
}

const _makeURL = (quotesConfig: QuotesConfig) => {
    const queryParamsList: string[] = [];
    Object.entries(quotesConfig)
          .forEach(([param, value]) => queryParamsList.push(`${param}=${value}`));
    const queryParams = queryParamsList.join('&');
    const url = `${baseURL}/${pathURL}?${queryParams}`;
    return url;
}

const quotesAPI = {
    retrieveQuotes,
};

export { quotesAPI, QuotesConfig };