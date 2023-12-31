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

const executionTime = {
    measure: mesureExecutionTime,
}

export { executionTime };
