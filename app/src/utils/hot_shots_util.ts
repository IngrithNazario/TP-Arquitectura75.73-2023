import StatsD from "hot-shots";

const statsdClient = new StatsD({
    host: 'graphite',
    port: 8125,
    prefix: 'hot-shots-api.',
    suffix: '.response_time',
}); 

export { statsdClient };
