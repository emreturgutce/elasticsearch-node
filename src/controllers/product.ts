import { Router, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Container } from 'typedi';
import { CREATED } from 'http-status';
import { validateId } from '../middlewares/validate-id';
import { validateProduct } from '../middlewares/validate-product';
import ProductService from '../services/product';

const router = Router();

const productService = Container.get(ProductService);

router.post('/', validateProduct, async (req: Request, res: Response) => {
	try {
		await productService.createProduct(req.body);

		res.status(CREATED).json({
			success: true,
			message: 'Product saved.',
		});
	} catch (error) {
		throw new createHttpError.InternalServerError('Something went wrong');
	}
});

router.get('/', async (_, res) => {
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
		throw new createHttpError.InternalServerError('Something went wrong');
	}
});

router.delete('/:id', validateId, async (req, res) => {
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
		throw new createHttpError.InternalServerError('Something went wrong');
	}
});

export { router as productRouter };
