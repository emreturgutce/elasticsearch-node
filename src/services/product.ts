import { ElasticSearchClient } from '../config/elasticsearch';
import { Product } from '../models/product';

export class ProductService {
	private static readonly baseParams = {
		index: 'products',
		type: 'product',
	};

	public static createProduct(product: Product) {
		return ElasticSearchClient.createIndex<Product>({
			...this.baseParams,
			body: product,
		});
	}

	public static searchProducts() {
		return ElasticSearchClient.searchIndex<Product>({
			...this.baseParams,
		});
	}

	public static deleteProduct(id: string) {
		return ElasticSearchClient.deleteIndex({
			...this.baseParams,
			id,
		});
	}
}
