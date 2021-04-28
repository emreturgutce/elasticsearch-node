import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Service } from 'typedi';
import { CREATED } from 'http-status';
import ProductService from '../services/product';

@Service()
export default class ProductController {
	constructor(
		private readonly productService: ProductService,
	) { }

	async postProduct(req: Request, res: Response) {
		try {
			await this.productService.createProduct(req.body);

			res.status(CREATED).json({
				success: true,
				message: 'Product saved.',
			});
		} catch (error) {
			throw new createHttpError.InternalServerError('Something went wrong');
		}
	}

	async getProducts(_: Request, res: Response) {
		try {
			const result = await this.productService.searchProducts();

			res.json({
				success: true,
				message: 'Products fetched.',
				data: {
					hits: result.hits.hits,
				},
			});
		} catch (error) {
			throw new createHttpError.InternalServerError('Something went wrong');
		}
	}

	async deleteProduct(req: Request, res: Response) {
		try {
			const result = await this.productService.deleteProduct(req.params.id);

			res.json({
				success: true,
				message: 'Product deleted.',
				data: {
					result,
				},
			});
		} catch (error) {
			throw new createHttpError.InternalServerError('Something went wrong');
		}
	}
}
