const mesureExecutionTime = <T>(fn: (...args: any[]) => T, timeProcessor: (milliseconds: number) => void) => {
    return async (...args: any) => {
        const start = performance.now();
        const result = await fn(...args);
        const stop = performance.now();
        const milliseconds = stop - start;
        timeProcessor(milliseconds);
        return result;
    }
}

const getExecutionTime = <T>(fn: (...args: any[]) => T) => {
    return async (...args: any) => {
        const start = performance.now();
        const result = await fn(...args);
        const stop = performance.now();
        const milliseconds = stop - start;
        return { result, milliseconds };
    }
}

const executionTime = {
    measure: mesureExecutionTime,
    get: getExecutionTime,
}

export { executionTime };
