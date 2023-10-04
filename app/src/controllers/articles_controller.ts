import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { createErrorResponse, Issue } from '../utils/response_util';
import { articlesService } from '../services/articles_service';
import { executionTime, responseUtils, statsdClient } from '../utils';

const getArticles = (_request: Request, response: Response) => {
    const timeProcessor = (milliseconds: number) => statsdClient.gauge('service.spaceflight-news', milliseconds);
    const controller = executionTime.measure(async () => {
        try {
            const articlesConfig = {
                limit: 5,
                ordering: '-published_at',
            }

            const articles = await articlesService.getArticles(articlesConfig);
            if (articles.statusCode === httpStatus.OK) {
                const data = articles.data;
                const successResponse = responseUtils.createSuccessResponse(data);
                response.status(articles.statusCode).send(successResponse);
            } else {
                const data = articles.error;
                const errorResponse = responseUtils.createErrorResponse(data);
                response.status(articles.statusCode).send(errorResponse);
            }
        } catch (exception: any) {
            const { name, message } = exception;
            const error = { code: name, error: name, message: message };
            console.log(error);
            const errorResponse = createErrorResponse(Issue.InternalServerError);
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
        }
    }, timeProcessor);
    controller();
}

const articlesController = {
    getArticles,
}

export { articlesController };
