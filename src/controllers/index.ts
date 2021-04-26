import { Router } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { productRouter } from './product';

const router = Router();

router.use('/products', productRouter);

router.use(errorHandler);

export { router };
