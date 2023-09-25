import httpStatus from 'http-status';
import { quotesAPI, QuotesConfig } from '../apis';

const getQuotes = async (quotesConfig: QuotesConfig) => {
    const response = await quotesAPI.retrieveQuotes(quotesConfig);
    if (response.statusCode === httpStatus.OK) {
        const data = (response as any).data;
        return { statusCode: httpStatus.OK, data };
    }
    return { statusCode: response.statusCode, error: (response as any).error };
}

const quotesService = {
    getQuotes,
}

export { quotesService };
