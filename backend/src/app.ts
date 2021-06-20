require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const isProduction = process.env.NODE_ENV !== 'development';

import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';

/* import * as session from 'express-session' */
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
/* import * as redis from 'redis'
import * as connectRedisStore from 'connect-redis' */

import Model from './model';
import {setlog,NF} from './helper';
import routes from './routes';

/* if (isProduction) { */
	process.on("uncaughtException", (err:Error) => setlog('exception',err));
	process.on("unhandledRejection", (err:Error) => setlog('rejection',err));
/* } */

Date.now = () => Math.round((new Date().getTime()) / 1000);

class WebApp {
	constructor() {
	}
	start() { 
		const app = express()
		const server = http.createServer(app);
		const cert = fs.readFileSync(__dirname+'/../certs/cert.crt');
		const caBundle:any = fs.readFileSync(__dirname+'/../certs/cert.ca-bundle',{encoding:'utf8'});
		const ca = caBundle.split('-----END CERTIFICATE-----\r\n') .map((cert:any) => cert +'-----END CERTIFICATE-----\r\n');
		ca.pop();
		const key = fs.readFileSync(__dirname+'/../certs/cert.key');
		let options = {
			cert: cert,
			ca: ca,
			key: key 
		};
		const httpsServer = https.createServer(options,app);

		app.use(cors());
		
		const FRONTENDPATH = path.normalize(__dirname + '/../../frontend/build');
		app.use(express.static(FRONTENDPATH));
		app.use(bodyParser.json());
		app.use(routes);
		
		app.get('*', (req,res) =>{
			res.sendFile(FRONTENDPATH+'/index.html');
		});
		
		let time = +new Date();
		setlog();
		Model.connect({
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME
		}).then(async (res:any)=>{
			if (res===true) {
				setlog(`Connected MySQL ${+new Date()-time}ms`);
				time = +new Date();
				let port = Number(process.env.HTTP_PORT);
				await new Promise(resolve=>{
					server.listen(port, ()=>{
						resolve(true)
					});
				});
				setlog(`Started HTTP service on port ${port}. ${+new Date()-time}ms`);
				time = +new Date();
				port = Number(process.env.HTTPS_PORT);
				await new Promise(resolve=>{
					httpsServer.listen(port, ()=>{
						resolve(true)
					});
				});
				setlog(`Started HTTPS service on port ${port}. ${+new Date()-time}ms`);
			} else {
				setlog('MySQL',res);
				return process.exit(1)
			}
		})
	}
}

const app = new WebApp();
app.start();