import { DefinedError, ValidateFunction } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const validateBody = (func: ValidateFunction) => (
	req: Request,
	_: Response,
	next: NextFunction,
) => {
	if (func(req.body)) {
		next();
	} else {
		let errorMsg = '';

		for (const err of func.errors as DefinedError[]) {
			errorMsg += `${err.instancePath.replace('/', '')} ${err.message}.`;
		}

		next(new createHttpError.BadRequest(errorMsg));
	}
};

export const validateParams = (func: ValidateFunction) => (
	req: Request,
	_: Response,
	next: NextFunction,
) => {
	if (func(req.params)) {
		next();
	} else {
		console.log(func.errors, req.params);
		let errorMsg = '';

		for (const err of func.errors as DefinedError[]) {
			errorMsg += `${err.instancePath.replace('/', '')} ${err.message}.`;
		}

		next(new createHttpError.BadRequest(errorMsg));
	}
};
