import { dev } from '$app/environment';
import { MONGODB_URI } from '$env/static/private';
import { MongoClient, ServerApiVersion } from 'mongodb';

declare var global: {
	_mongoClient: MongoClient;
	_mongoClientPromise: Promise<MongoClient>;
};

const uri = MONGODB_URI as string; // your mongodb connection string
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: dev,
	}
};

// declare global {
//   var _mongoClientPromise: Promise<MongoClient>;
// }

class Singleton {
	private static _instance: Singleton;
	private client: MongoClient;
	private clientPromise: Promise<MongoClient>;
	private constructor() {

		

		if (dev) {
			//@ts-ignore
			this.client = new MongoClient(uri, options);


			// In development mode, use a global variable so that the value
			// is preserved across module reloads caused by HMR (Hot Module Replacement).
			if(!global._mongoClientPromise ) {
				global._mongoClientPromise = this.client.connect();
			}

			this.clientPromise = global._mongoClientPromise
		}
		else {
			
			//@ts-ignore
			this.client = new MongoClient(uri, options);
			this.clientPromise = this.client.connect();
		} 
	}

	public static get instance() {
		if (!this._instance) {
			this._instance = new Singleton();
		}
		return this._instance.clientPromise;
	}
}
const clientPromise = Singleton.instance;

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;