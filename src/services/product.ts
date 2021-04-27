import {Service} from 'typedi';
import ElasticSearchClient from '../config/elasticsearch';
import { Product } from '../models/product';

@Service()
export default class ProductService {
	private readonly baseParams = {
		index: 'products',
		type: 'product',
	};

	constructor(
		private readonly elasticSearchClient: ElasticSearchClient,
	) {}

	public createProduct(product: Product) {
		return this.elasticSearchClient.createIndex<Product>({
			...this.baseParams,
			body: product,
		});
	}

	public searchProducts() {
		return this.elasticSearchClient.searchIndex<Product>({
			...this.baseParams,
		});
	}

	public deleteProduct(id: string) {
		return this.elasticSearchClient.deleteIndex({
			...this.baseParams,
			id,
		});
	}
}
