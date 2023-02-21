"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = require("http");
const nanoid_1 = require("nanoid");
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
function App() {
    const wsMap = new Map();
    const PORT = 8080;
    const app = (0, express_1.default)();
    const sessionParser = (0, express_session_1.default)({
        saveUninitialized: false,
        secret: '$eCuRiTy',
        resave: false
    });
    app.use((0, cors_1.default)({
        origin: "http://localhost:*"
    }));
    app.use(express_1.default.static('public'));
    app.use(sessionParser);
    app.use("", (req, res, next) => {
        console.log(req.session);
        next();
    });
    app.post('/login', function (req, res) {
        //
        // "Log in" user and set userId to session.
        //
        if (!req.session.userId) {
            const id = (0, nanoid_1.nanoid)(10);
            console.log(`Updating session for user ${id}`);
            req.session.userId = id;
        }
        res.send({ result: 'OK', message: 'Session updated' });
    });
    app.delete('/logout', function (request, response) {
        const ws = wsMap.get(request.session.userId);
        console.log('Destroying session');
        request.session.destroy(function () {
            if (ws)
                ws.close();
            response.send({ result: 'OK', message: 'Session destroyed' });
        });
    });
    const server = (0, http_1.createServer)(app);
    const wss = new ws_1.WebSocketServer({ noServer: true });
    server.on('upgrade', function (request, socket, head) {
        socket.on('error', onSocketError);
        console.log('Parsing session from request...');
        sessionParser(request, {}, () => {
            console.log(request.session);
            if (!request.session.userId) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }
            console.log('Session is parsed!');
            socket.removeListener('error', onSocketError);
            wss.handleUpgrade(request, socket, head, function (ws) {
                wss.emit('connection', ws, request);
            });
        });
    });
    wss.on('connection', function (ws, request) {
        const userId = request.session.userId;
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
    //
    // Start the server.
    //
    server.listen(8080, function () {
        console.log('Listening on http://localhost:8080');
    });
}
exports.default = App;
function onSocketError(err) {
    console.error(err);
}
