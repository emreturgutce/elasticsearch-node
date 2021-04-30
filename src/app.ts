import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { resolve } from 'path';
import { router } from './routes';

const app = express();

const swaggerDoc = YAML.load(resolve(__dirname, '..', 'swagger.yaml'));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1', router);

export { app }
