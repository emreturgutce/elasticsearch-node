import { Client, DeleteDocumentParams, IndexDocumentParams, SearchParams } from 'elasticsearch';
import { Service } from 'typedi';

@Service()
export default class ElasticSearchClient {
	private readonly connection: Client;

	private constructor() {
		this.connection = new Client({
			host: 'localhost:9200',
		});
	}

	public createIndex<T>(params: IndexDocumentParams<T>) {
		return this.connection.index<T>(params);
	}

	public searchIndex<T>(params: SearchParams) {
		return this.connection.search<T>(params);
	}

	public deleteIndex(params: DeleteDocumentParams) {
		return this.connection.delete(params);
	}
}
