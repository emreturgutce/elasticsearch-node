import express from 'express';
import { Client } from 'elasticsearch';

const app = express();

const elasticClient = new Client({
  host: 'localhost:9200',
});

interface Product {
  name: string;
  description: string;
  price: number;
}

app.get('/api/v1', async (_, res) => {
  await elasticClient.index<Product>({
    index: 'products',
    type: 'test',
    body: {
      name: 'product 1',
      description: 'lorem ipsum dolor',
      price: 99,
    },
  });

  res.json({
    success: true,
    message: 'Elasticsearch working',
  });
});

app.get('/api/v1/products', async (_, res) => {
  const result = await elasticClient.search<Product>({
    index: 'products',
    type: 'test',
  });

  res.json({
    success: true,
    message: 'Elasticsearch working',
    result,
  });
});

app.listen(8000, () => {
  console.log('App is running on port 8000');
});
