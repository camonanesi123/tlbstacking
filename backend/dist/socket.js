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
const websocket_1 = require("websocket");
class Socket {
    constructor(httpServer, opt) {
        this.timeout = 5000;
        this.config = {
            path: '/',
            origin: 'file://',
            allowIps: null,
        };
        this.events = {
            beforeConnect: null,
            connect: null,
            disconnect: null,
            data: null,
        };
        if (opt !== null) {
            if (opt.path !== undefined)
                this.config.path = opt.path;
            if (opt.origin !== undefined)
                this.config.origin = opt.origin;
            if (opt.allowIps !== undefined)
                this.config.allowIps = opt.allowIps;
        }
        const max = 12582912; // 12MB
        const wsServer = new websocket_1.server({ httpServer, maxReceivedFrameSize: max, maxReceivedMessageSize: max, autoAcceptConnections: false });
        wsServer.on('request', (req) => __awaiter(this, void 0, void 0, function* () {
            let ip = req.remoteAddress;
            let p = ip.lastIndexOf(':');
            if (p !== -1)
                ip = ip.slice(p + 1);
            if (req.resource && req.origin === this.config.origin && (this.config.allowIps === null || this.config.allowIps && this.config.allowIps.indexOf(ip) !== -1)) {
                if (this.events.connect !== null) {
                    const cookie = req.resource.slice(1);
                    const connectable = this.events.beforeConnect !== null ? yield this.events.beforeConnect(ip, cookie) : true;
                    if (connectable) {
                        const con = req.accept();
                        this.events.connect(con, ip, cookie);
                        con.on('message', buf => {
                            if (buf.type === 'utf8') {
                                if (this.events.data !== null)
                                    this.events.data(con, buf.utf8Data);
                            }
                        });
                        con.on('close', () => (this.events.disconnect && this.events.disconnect(con)));
                    }
                }
            }
        }));
    }
    on(event, cb) {
        if (event === 'beforeConnect')
            this.events.beforeConnect = cb;
        if (event === 'connect')
            this.events.connect = cb;
        if (event === 'disconnect')
            this.events.disconnect = cb;
        if (event === 'data')
            this.events.data = cb;
    }
    ;
}
exports.default = Socket;
//# sourceMappingURL=socket.js.map