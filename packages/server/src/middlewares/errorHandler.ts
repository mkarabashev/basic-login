import { ErrorRequestHandler, RequestHandler } from "express"

export class UnauthorizedError extends Error {
    public code = 401
    constructor(message = 'Unauthorized') {
        super()
        this.message = message
    }
}

export class ValidationError extends Error {
    public code = 400
    constructor(message = 'Validation Error') {
        super()
        this.message = message
    }
}

export class NotFoundError extends Error {
    public code = 404
    constructor(message = 'Not found') {
        super()
        this.message = message
    }
}

export type APIError =
    | UnauthorizedError
    | ValidationError
    | NotFoundError

const isAPIError = (error: unknown): error is APIError =>
    error instanceof UnauthorizedError
    || error instanceof ValidationError
    || error instanceof NotFoundError

export const createErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.message)
    if (isAPIError(err)){
        res.status(err.code).json({ error: err.message }).end()
    } else if ('code' in err && err.code === 'EBADCSRFTOKEN') {
        res.status(403).json({ error: 'CSRF error'})
    } else {
        res.status(500).end()
    }
}