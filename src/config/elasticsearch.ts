import { Client, DeleteDocumentParams, IndexDocumentParams, SearchParams } from 'elasticsearch';

export class ElasticSearchClient {
	private static connection: Client;

	private constructor() {}

	public static getInstance(): ElasticSearchClient {
		if (!this.connection) {
			this.connection = new Client({
				host: 'localhost:9200',
			});
		}

		return this.connection;
	}

	public static createIndex<T>(params: IndexDocumentParams<T>) {
		return this.connection.index<T>(params);
	}

	public static searchIndex<T>(params: SearchParams) {
		return this.connection.search<T>(params);
	}

	public static deleteIndex(params: DeleteDocumentParams) {
		return this.connection.delete(params);
	}
}

ElasticSearchClient.getInstance();
