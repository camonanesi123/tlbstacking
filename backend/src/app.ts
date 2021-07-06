require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const isProduction = process.env.NODE_ENV !== 'development';

import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as tls from 'tls';

/* const tls = require('tls'); */
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
		
		let appDomainKey = null, appDomainPem = null;
		if (!isProduction) {
			appDomainKey = __dirname+'/certs/'+process.env.DOMAIN+'.key';
			appDomainPem = __dirname+'/certs/'+process.env.DOMAIN+'.pem';
		} else {
			appDomainKey = '/etc/letsencrypt/live/bitotc.me/privkey.pem';
			appDomainPem = '/etc/letsencrypt/live/bitotc.me/fullchain.pem';
		}
		const appKey = fs.existsSync(appDomainKey) && fs.readFileSync(appDomainKey).toString();
		const appPem = fs.existsSync(appDomainPem) && fs.readFileSync(appDomainPem).toString();
		const contextApp = (appKey && appPem) && tls.createSecureContext({key: appKey,cert: appPem});
		const httpsServer = https.createServer({
			SNICallback: function(domain, cb) {
				cb(null, contextApp);
			},
			key: appKey,
			cert: appPem
		}, app);
		/* 
		if (fs.existsSync(__dirname+'/../certs/cert.crt')) {
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
			httpsServer = https.createServer(options,app);
		} */

		app.use(cors());
		
		const FRONTENDPATH = path.normalize(__dirname + '/../../frontend/build');
		app.use(express.static(FRONTENDPATH));
		app.use(bodyParser.json());
		app.use((req, res) => {
			let hostname = req.headers.host;
			if(req.protocol==='http') {
				if(!req.url || req.url.indexOf('/.well-known/acme-challenge')===-1) {
					return res.redirect('https://' + hostname + (req.url||''));
				} else {
					const acmeFile = __dirname + '/../certs/.dnskey';
					if (fs.existsSync(acmeFile)) {
						const acme = fs.readFileSync(acmeFile).toString();
						res.send(acme);
					} else {
						res.send('no found');
					}
					return;
				}
			}
			res.setHeader("Content-Security-Policy","script-src-elem 'self' https://"+hostname+' https://cdnjs.cloudflare.com');
		});
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