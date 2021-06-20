require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const isProduction = process.env.NODE_ENV !== 'development';

import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import express from 'express';

/* import * as session from 'express-session' */
import cors from 'cors'
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
		/* const redisClient = redis.createClient(); */
		/* const redisStore = connectRedisStore(session);
		redisClient.on('error', (err:Error) => setlog('redisClient',err));
		const store = new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }); */

		const app = express()
		const server = http.createServer(app);
		const cert = fs.readFileSync(__dirname+'/../certs/swanswap_io.crt');
		const caBundle:any = fs.readFileSync(__dirname+'/../certs/swanswap_io.ca-bundle',{encoding:'utf8'});
		const ca = caBundle.split('-----END CERTIFICATE-----\r\n') .map((cert:any) => cert +'-----END CERTIFICATE-----\r\n');
		ca.pop();
		// const cert = fs.readFileSync(__dirname+'/../certs/swanswap.key');
		const key = fs.readFileSync(__dirname+'/../certs/swanswap.key');
		let options = {
			cert: cert, // fs.readFileSync('./ssl/example.crt');
			ca: ca, // fs.readFileSync('./ssl/example.ca-bundle');
			key: key // fs.readFileSync('./ssl/example.key');
		};
		const httpsServer = https.createServer(options,app);

		/* app.use((req, res, next) => {
			let hostname = req.headers.host;
			if(req.protocol==='http') {
				if(typeof hostname==='string' && hostname.indexOf('ngrok.io')===-1) {
					if(!req.url || req.url.indexOf('/.well-known/acme-challenge')===-1) {
						return res.redirect('https://' + hostname + (req.url||''));
					} else {
						return;
					}
				}
			}
			// res.setHeader("Content-Security-Policy","script-src-elem 'self' https://"+hostname+' https://cdnjs.cloudflare.com');
			next();
		}); */
		app.use(cors());
		app.use(express.static(__dirname + '/../../frontend/build'));
		app.use(bodyParser.json());
		app.use(routes);
		app.get('*', (req,res) =>{
			res.sendFile(__dirname+'/../../frontend/build/index.html');
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
				/* time = +new Date();
				G.onConnection(new Socket(httpsServer,{origin: 'https://'+process.env.DOMAIN+(process.env.HTTPS_PORT==='443'?'':':'+process.env.HTTPS_PORT)}));
				setlog(`Started client socket with https service. ${+new Date()-time}ms`);
				time = +new Date();
				require('./controllers/adam');
				G.onAdamConnection(new Socket(server));
				setlog(`Started admin socket with http service. ${+new Date()-time}ms`); */
			} else {
				setlog('MySQL',res);
				return process.exit(1)
			}
		})
	}
}

const app = new WebApp();
app.start();