import { metarsAPI, MetarConfig } from '../apis';
import { Status } from '../utils';
import { decode } from 'metar-decoder';

const getMetars = async (metarConfig: MetarConfig) => {
    const result = await metarsAPI.retriveMetars(metarConfig);

    if (result.status === Status.Success) {
        const data = (result as any).data;
        const dataList = [];
        if (Array.isArray(data)) {
            data.forEach(element => {dataList.push(decode(element.raw_text));});
        } else {
            dataList.push(decode(data.raw_text));
        }
        return { status: result.status, data: dataList };
    }
    return result;
}

const metarsService = {
    getMetars,
}

export { metarsService };
