"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
class Socket {
    constructor(server, sessionParser) {
        const wss = this.wss = new ws_1.WebSocketServer({ noServer: true });
        const wsMap = this.wsMap = new Map();
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
        wss.on('connection', function (ws, request) {
            sessionParser(request, {}, () => { });
            // const sessionID = request.session.id;
            console.log(`ws ${request.session.user.id}`);
            if (!request.session)
                return;
            const userId = request.session.user.id;
            wsMap.set(userId, ws);
            ws.on('error', console.error);
            ws.on('message', function (message) {
                //
                // Here we can now use session parameters.
                //
                console.log(`Received message ${message} from user ${userId}`);
            });
            ws.on('close', function () {
                wsMap.delete(userId);
            });
        });
    }
    Push(id, obj) {
        const ws = this.wsMap.get(id);
        ws === null || ws === void 0 ? void 0 : ws.send(JSON.stringify(obj));
    }
}
exports.default = Socket;
