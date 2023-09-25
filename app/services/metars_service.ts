import httpStatus from 'http-status';
import { metarsAPI, MetarConfig } from '../apis';
import { decode } from 'metar-decoder';

const getMetars = async (metarConfig: MetarConfig) => {
    const result = await metarsAPI.retriveMetars(metarConfig);

    if (result.statusCode === httpStatus.OK) {
        const data = (result as any).data;
        const dataList = [];
        if (Array.isArray(data)) {
            data.forEach(element => {dataList.push(decode(element.raw_text));});
        } else {
            dataList.push(decode(data.raw_text));
        }
        return { statusCode: result.statusCode, data: dataList };
    }
    return { statusCode: result.statusCode, error: (result as any).error };
}

const metarsService = {
    getMetars,
}

export { metarsService };
