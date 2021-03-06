import { RequestHandler } from '../controllers/index';

export default class Router {
	constructor(app, jwtsecret, mongo) {
		this.app = app;
		this.jwtsecret = jwtsecret;
		this.mongo = mongo;
	}

	init() {
		const { app, jwtsecret, mongo } = this;
		const handler = new RequestHandler(app, jwtsecret, mongo);

		app.use((req, res, next) => {
			console.log('Requested URL:', req.url, 'at:', new Date().toISOString());
			next();
		});

		app.get('/', (req, res) => {
			res.send('API!');
		});

		app.get('/*', handler.get);
		app.post('/*', handler.post);
		app.put('/*', handler.put);
		app.delete('/*', handler.delete);
	}
}
