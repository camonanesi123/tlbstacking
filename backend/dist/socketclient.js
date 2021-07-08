"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketClient = void 0;
const websocket_1 = require("websocket");
class SocketClient {
    constructor(url) {
        this.url = '';
        this.timeout = 5000;
        this.connected = false;
        this.socket = null;
        this._timeHandler = null;
        this.events = {};
        this.url = url;
        this.connect();
    }
    connect() {
        const client = new websocket_1.client();
        client.on('connectFailed', (err) => {
            if (this.connected && this.events.disconnect !== undefined)
                this.events.disconnect();
            this.connected = false;
            this.reconnect();
        });
        client.on('connect', (con) => {
            this.socket = con;
            this.connected = true;
            if (this._timeHandler !== null) {
                clearTimeout(this._timeHandler);
                this._timeHandler = null;
            }
            if (this.events.connect !== undefined)
                this.events.connect(con);
            con.on('close', () => {
                if (this.connected) {
                    if (this.events.disconnect !== undefined)
                        this.events.disconnect();
                    this.connected = false;
                    this.reconnect();
                }
                else {
                    console.log('Chain-API already disconnected.');
                }
            });
            con.on('message', (buf) => {
                if (buf.type === 'utf8') {
                    this.events.data && this.events.data(con, buf.utf8Data);
                }
            });
        });
        client.connect(this.url, "", this.url.replace('ws://', 'http://'));
    }
    on(event, cb) {
        if (event === 'connect')
            this.events.connect = cb;
        if (event === 'disconnect')
            this.events.disconnect = cb;
        if (event === 'data')
            this.events.data = cb;
    }
    ;
    reconnect() {
        if (this.connected)
            return;
        if (this._timeHandler !== null)
            clearTimeout(this._timeHandler);
        this._timeHandler = setTimeout(() => this.connect(), 1000);
    }
    send(raw) {
        if (this.socket && this.socket.connected) {
            this.socket.sendUTF(raw);
            return false;
        }
        return false;
    }
}
exports.SocketClient = SocketClient;
//# sourceMappingURL=socketclient.js.map