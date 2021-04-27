import { Router, Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { Container } from 'typedi';
import { CREATED } from 'http-status';
import { validateId } from '../middlewares/validate-id';
import { validateProduct } from '../middlewares/validate-product';
import ProductService from '../services/product';

const router = Router();

const productService = Container.get(ProductService);

router.post(
	'/',
	validateProduct,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await productService.createProduct(req.body);

			res.status(CREATED).json({
				success: true,
				message: 'Product saved.',
			});
		} catch (error) {
			next(
				new createHttpError.InternalServerError('Something went wrong'),
			);
		}
	},
);

router.get('/', async (_, res, next) => {
	try {
		const result = await productService.searchProducts();

		res.json({
			success: true,
			message: 'Products fetched.',
			data: {
				hits: result.hits.hits,
			},
		});
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
});

router.delete('/:id', validateId, async (req, res, next) => {
	try {
		const result = await productService.deleteProduct(req.params.id);

		res.json({
			success: true,
			message: 'Product deleted.',
			data: {
				result,
			},
		});
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
});

export { router as productRouter };
