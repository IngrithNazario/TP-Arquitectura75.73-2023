import httpStatus from 'http-status';
import { articlesAPI, ArticlesConfig } from '../apis';

const getArticles = async (articlesConfig: ArticlesConfig) => {
    const response = await articlesAPI.retrieveArticles(articlesConfig);
    if (response.statusCode === httpStatus.OK) {
        const data = (response as any).data;
        const articles = data.results.map((result: { title: string; summary: string; url: string; }) => { 
            return { title: result.title, summary: result.summary, url: result.url } ;
        });
        return { statusCode: httpStatus.OK, data: articles };
    }
    return { statusCode: response.statusCode, error: (response as any).error };
}

const articlesService = {
    getArticles,
}

export { articlesService };
