import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { INTERNAL_SERVER_ERROR } from 'http-status';

export const errorHandler = (
	error: Error,
	_: Request,
	response: Response,
	__: NextFunction,
) => {
	if (error instanceof HttpError) {
		return response
			.status(error.statusCode)
			.json({ message: error.message, success: false });
	}

	response.status(INTERNAL_SERVER_ERROR)
		.json({ message: 'Internal Server Error', success: false });
};
