import httpStatus from 'http-status';
import { quotesAPI, QuotesConfig } from '../apis';

const getQuotes = async (quotesConfig: QuotesConfig) => {
    const response = await quotesAPI.retrieveQuotes(quotesConfig);
    if (response.statusCode === httpStatus.OK) {
        const data = (response as any).data;
        const quotes = data.map((quote: { author: string; content: string; }) => {
            return { author: quote.author, quote: quote.content };
        });
        return { statusCode: httpStatus.OK, data: quotes };
    }
    return { statusCode: response.statusCode, error: (response as any).error };
}

const quotesService = {
    getQuotes,
}

export { quotesService };
