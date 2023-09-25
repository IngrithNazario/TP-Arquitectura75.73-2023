import httpStatus from 'http-status';
import { articlesAPI, ArticlesConfig } from '../apis/spaceflight_news/articles_api';

const getArticles = async (articlesConfig: ArticlesConfig) => {
    const response = await articlesAPI.retrieveArticles(articlesConfig);
    if (response.statusCode === httpStatus.OK) {
        const data = (response as any).data;
        data.results = data.results.map((result: { title: any; }) => { return { title: result.title } });
        return { statusCode: httpStatus.OK, data: data.results };
    }
    return { statusCode: response.statusCode, error: (response as any).error };
}

const articlesService = {
    getArticles,
}

export { articlesService };
