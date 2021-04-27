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

	public createDocument<T>(params: IndexDocumentParams<T>) {
		return this.connection.index<T>(params);
	}

	public searchDocument<T>(params: SearchParams) {
		return this.connection.search<T>(params);
	}

	public deleteDocument(params: DeleteDocumentParams) {
		return this.connection.delete(params);
	}
}
