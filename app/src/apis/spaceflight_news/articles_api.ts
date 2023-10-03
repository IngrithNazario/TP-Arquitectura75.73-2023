import axios from 'axios';
import httpStatus from 'http-status';
import { Error, executionTime, statsdClient } from '../../utils';

const baseURL = 'https://api.spaceflightnewsapi.net';
const pathURL = 'v4/articles';

interface ArticlesConfig {
    limit?: number,
    ordering?: string,
}

const retrieveArticles = async (articlesConfig: ArticlesConfig): Promise<{ statusCode: number, data: any } | { statusCode: number, error: Error }> => {
    const url = _makeURL(articlesConfig);
    const timeProcessor = (milliseconds: number) => statsdClient.gauge('external-service.spaceflight-news', milliseconds);
    const axiosGet = executionTime.measure(axios.get, timeProcessor);
    const response = await axiosGet(url, { validateStatus: () => true });

    const data = response.data;
    if (response.status === httpStatus.OK) {
        return { statusCode: httpStatus.OK, data };
    }
    const error = { code: '', error: response.statusText, message: '' };
    return { statusCode: response.status, error };
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