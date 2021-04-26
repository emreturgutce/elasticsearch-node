import { Product } from '../models/product';
import { ajv } from '../config/ajv';
import { JSONSchemaType } from 'ajv';
import { validateBody } from './validate';

const productSchema: JSONSchemaType<Product> = {
	type: 'object',
	properties: {
		title: { type: 'string' },
		description: { type: 'string' },
		price: {
			type: 'number',
			minimum: 0,
		},
	},
	required: ['title', 'description', 'price'],
	additionalProperties: false,
};

const productValidatorFunction = ajv.compile(productSchema);

export const validateProduct = validateBody(productValidatorFunction);
