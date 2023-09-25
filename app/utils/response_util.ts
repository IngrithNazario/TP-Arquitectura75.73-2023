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
    InternalServerError: {
        code: 'internal_server_error',
        error: 'Internal Server Error',
        message: 'An internal error occurred during processing',
    },
}

const _createResponse = (status: Status, data: any) => {
    return {
        status,
        data,
    }
}

const createSuccessResponse = (data: any) => _createResponse(Status.Success, data)
const createFailResponse = (data: Fail[]) => _createResponse(Status.Fail, data)
const createErrorResponse = (data: Error) => _createResponse(Status.Error, data)

export { 
    createSuccessResponse, createFailResponse, createErrorResponse,
    Status, Fail, Error, Issue
};
