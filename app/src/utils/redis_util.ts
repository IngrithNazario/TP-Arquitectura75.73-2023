import { SetOptions, createClient } from "redis";

const config = { url: 'redis://redis:6379' };

let client = createClient(config);
export type RedisClientType = typeof client;

const connect = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.log(error);
    }
}

const get = (key: string) => {
    return client.get(key);
}

const set = (key: string, value: string, options: SetOptions | undefined = undefined) => {
    return client.set(key, value, options);
}

const redisClient = {
    connect,
    get,
    set
}

export { redisClient };
