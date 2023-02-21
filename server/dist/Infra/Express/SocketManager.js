"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const SocketUser_1 = __importDefault(require("./SocketUser"));
class SocketManager {
    constructor(server, sessionParser, broadcast) {
        const wss = this.wss = new ws_1.WebSocketServer({ noServer: true });
        this.broadcast = broadcast;
        server.on('upgrade', function (request, socket, head) {
            const errorFun = (err) => { console.error(err); };
            socket.on('error', errorFun);
            console.log('Parsing session from request...');
            sessionParser(request, {}, () => {
                if (!request.session.user) {
                    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                    socket.destroy();
                    return;
                }
                console.log('Session is parsed!');
                socket.removeListener('error', errorFun);
                wss.handleUpgrade(request, socket, head, function (ws) {
                    wss.emit('connection', ws, request);
                });
            });
        });
        const manager = this;
        wss.on('connection', function (ws, request) {
            sessionParser(request, {}, () => { });
            // const sessionID = request.session.id;
            console.log(`ws ${request.session.user.id}`);
            if (!request.session)
                return;
            const userId = request.session.user.id;
            new SocketUser_1.default(broadcast, userId, ws);
        });
        wss.on("close", () => {
            broadcast.RemoveAllSubscribe();
        });
    }
}
exports.default = SocketManager;
