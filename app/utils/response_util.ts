enum Status {
    Success = 'success',
    Fail = 'fail',
    Error = 'error',
    Exception = 'exception',
}

interface Fail {
    code: string,
    message: string,
    path?: string,
}

interface Error {
    code: string,
    error: string,
    message: string,
}

const Issue: { [key: string]: Error } = {
    UnknownError: {
        code: 'unknown_error',
        error: 'Unknown Error',
        message: 'An unknown error has occurred',
    },
    InternalServerError: {
        code: 'internal_server_error',
        error: 'Internal Server Error',
        message: '',
    }
}

const _createResponse = (status: Status, data: any | Fail | Error) => {
    return {
        status,
        data,
    }
}

const createSuccessResponse = (data: any) => _createResponse(Status.Success, data)
const createFailResponse = (data: Fail[]) => _createResponse(Status.Fail, data)
const createErrorResponse = (data: Error) => _createResponse(Status.Error, data)
const createExceptionResponse = (error: Error) => {
    return {
        status: Status.Exception,
        error,
    }
};

export { 
    createSuccessResponse, createFailResponse, createErrorResponse, createExceptionResponse,
    Status, Fail, Error, Issue
};
