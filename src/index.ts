import 'reflect-metadata';
import express from 'express';
import { router } from './controllers';

const app = express();

app.use(express.json());

app.use('/api/v1', router);

app.listen(8000, () => {
	console.log('App is running on port 8000');
});
