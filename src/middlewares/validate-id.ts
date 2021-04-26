import { ajv } from '../config/ajv';
import { JSONSchemaType } from 'ajv';
import { validateParams } from './validate';

type Id = {
	id: string;
};

const idSchema: JSONSchemaType<Id> = {
	type: 'object',
	properties: {
		id: { type: 'string' },
	},
	required: ['id'],
	additionalProperties: false,
};

const productValidatorFunction = ajv.compile(idSchema);

export const validateId = validateParams(productValidatorFunction);
