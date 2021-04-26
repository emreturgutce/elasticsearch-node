import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
	error: Error,
	_: Request,
	response: Response,
	__: NextFunction,
) => {
	if (error instanceof HttpError) {
		return response
			.status(error.statusCode)
			.json({ message: error.message, status: error.statusCode });
	}

	response.status(500).json({ error: 'Internal Server Error', status: 500 });
};
