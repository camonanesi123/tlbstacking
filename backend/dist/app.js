"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const isProduction = process.env.NODE_ENV !== 'development';
const http = require("http");
const https = require("https");
const fs = require("fs");
const tls = require("tls");
/* const tls = require('tls'); */
const path = require("path");
const express = require("express");
/* import * as session from 'express-session' */
const cors = require("cors");
const bodyParser = require("body-parser");
/* import * as redis from 'redis'
import * as connectRedisStore from 'connect-redis' */
const model_1 = require("./model");
const helper_1 = require("./helper");
const routes_1 = require("./routes");
/* if (isProduction) { */
process.on("uncaughtException", (err) => helper_1.setlog('exception', err));
process.on("unhandledRejection", (err) => helper_1.setlog('rejection', err));
/* } */
Date.now = () => Math.round((new Date().getTime()) / 1000);
class WebApp {
    constructor() {
    }
    start() {
        const app = express();
        const server = http.createServer(app);
        let appDomainKey = null, appDomainPem = null;
        if (!isProduction) {
            appDomainKey = __dirname + '/certs/' + process.env.DOMAIN + '.key';
            appDomainPem = __dirname + '/certs/' + process.env.DOMAIN + '.pem';
        }
        else {
            appDomainKey = '/etc/letsencrypt/live/bitotc.me/privkey.pem';
            appDomainPem = '/etc/letsencrypt/live/bitotc.me/fullchain.pem';
        }
        const appKey = fs.existsSync(appDomainKey) && fs.readFileSync(appDomainKey).toString();
        const appPem = fs.existsSync(appDomainPem) && fs.readFileSync(appDomainPem).toString();
        const contextApp = (appKey && appPem) && tls.createSecureContext({ key: appKey, cert: appPem });
        const httpsServer = https.createServer({
            SNICallback: function (domain, cb) {
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
        app.use(express.static(path.normalize(__dirname + '/../files')));
        const FRONTENDPATH = path.normalize(__dirname + '/../../frontend/build');
        app.use(express.static(FRONTENDPATH));
        app.use(bodyParser.json());
        app.use((req, res, next) => {
            let hostname = req.headers.host;
            if (req.protocol === 'http') {
                if (!req.url || req.url.indexOf('/.well-known/acme-challenge') === -1) {
                    //return res.redirect('https://' + hostname + (req.url||''));
                    return next();
                }
                else {
                    const acmeFile = __dirname + '/../certs/.dnskey';
                    if (fs.existsSync(acmeFile)) {
                        const acme = fs.readFileSync(acmeFile).toString();
                        res.send(acme);
                    }
                    else {
                        res.send('no found');
                    }
                    return;
                }
            }
            res.setHeader("Content-Security-Policy", "script-src-elem 'self' https://" + hostname + ' https://cdnjs.cloudflare.com');
        });
        app.use(routes_1.default);
        app.get('*', (req, res) => {
            res.sendFile(FRONTENDPATH + '/index.html');
        });
        let time = +new Date();
        helper_1.setlog();
        model_1.default.connect({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        }).then((res) => __awaiter(this, void 0, void 0, function* () {
            if (res === true) {
                helper_1.setlog(`Connected MySQL ${+new Date() - time}ms`);
                time = +new Date();
                let port = Number(process.env.HTTP_PORT);
                yield new Promise(resolve => {
                    server.listen(port, () => {
                        resolve(true);
                    });
                });
                helper_1.setlog(`Started HTTP service on port ${port}. ${+new Date() - time}ms`);
                time = +new Date();
                port = Number(process.env.HTTPS_PORT);
                yield new Promise(resolve => {
                    httpsServer.listen(port, () => {
                        resolve(true);
                    });
                });
                helper_1.setlog(`Started HTTPS service on port ${port}. ${+new Date() - time}ms`);
            }
            else {
                helper_1.setlog('MySQL', res);
                return process.exit(1);
            }
        }));
    }
}
const app = new WebApp();
app.start();
//# sourceMappingURL=app.js.map