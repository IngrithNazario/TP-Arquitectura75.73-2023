import axios from 'axios';
import httpStatus from 'http-status';
import { Error } from '../../utils/response_util';

const baseURL = 'https://api.spaceflightnewsapi.net';
const pathURL = 'v4/articles';
const timeout = 3000;

interface ArticlesConfig {
    limit?: number,
    ordering?: string,
}

const retrieveArticles = async (articlesConfig: ArticlesConfig): Promise<{ statusCode: number, data: any } | { statusCode: number, error: Error }> => {
    try {
        const url = _makeURL(articlesConfig);
        const response = await axios.get(url, { timeout, validateStatus: () => true });
        const data = response.data;

        if (response.status === httpStatus.OK) {
            return { statusCode: httpStatus.OK, data };
        }
        console.log(data);
        const error = { code: 'internal_server_error', error: 'Internal Server Error', message: '' };
        return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, error };
    } catch (error) {
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

const _makeURL = (articlesConfig: ArticlesConfig) => {
    const queryParamsList: string[] = [];
    Object.entries(articlesConfig)
          .forEach(([param, value]) => queryParamsList.push(`${param}=${value}`));
    const queryParams = queryParamsList.join('&');
    const url = `${baseURL}/${pathURL}?${queryParams}`;
    return url;
}

const articlesAPI = {
    retrieveArticles,
};

export { articlesAPI, ArticlesConfig };