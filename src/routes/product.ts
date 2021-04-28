import { Router } from 'express';
import { Container } from 'typedi';
import { validateId } from '../middlewares/validate-id';
import { validateProduct } from '../middlewares/validate-product';
import ProductController from '../controllers/product';

const router = Router();

const productController = Container.get(ProductController);

router.post('/', validateProduct, productController.postProduct);
router.get('/', productController.getProducts);
router.delete('/:id', validateId, productController.deleteProduct);

export { router as productRouter };
