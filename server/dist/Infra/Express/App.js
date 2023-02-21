"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const UserController_1 = __importDefault(require("../Controller/UserController"));
const UserUseCase_1 = __importDefault(require("../../Core/UseCase/UserUseCase"));
const UserRepository_1 = __importDefault(require("../Repositories/UserRepository"));
const RoomController_1 = __importDefault(require("../Controller/RoomController"));
const RoomUseCase_1 = __importDefault(require("../../Core/UseCase/RoomUseCase"));
const RoomRepository_1 = __importDefault(require("../Repositories/RoomRepository"));
const GameRepository_1 = __importDefault(require("../Repositories/GameRepository"));
const SocketManager_1 = __importDefault(require("./SocketManager"));
const http_1 = require("http");
const Broadcast_1 = __importDefault(require("../../Core/Broadcast/Broadcast"));
const RoomBroadcastHandler_1 = require("../BroadcastHandlers/RoomBroadcastHandler");
class App {
    get App() { return this.app; }
    constructor() {
        const app = this.app = (0, express_1.default)();
        const userRepository = new UserRepository_1.default();
        const userUseCase = new UserUseCase_1.default(userRepository);
        this.userController = new UserController_1.default(userUseCase);
        const roomRepository = new RoomRepository_1.default();
        const gameRepository = new GameRepository_1.default();
        const broadcast = new Broadcast_1.default();
        broadcast.SetEventHandler(new RoomBroadcastHandler_1.RoomJoinedHandler());
        broadcast.SetEventHandler(new RoomBroadcastHandler_1.RoomLeavedHandler());
        broadcast.SetEventHandler(new RoomBroadcastHandler_1.RoomReadyUpdatedHandler());
        const roomUseCase = new RoomUseCase_1.default(userRepository, roomRepository, gameRepository, broadcast);
        this.roomController = new RoomController_1.default(roomUseCase);
        const sessionParser = (0, express_session_1.default)({
            saveUninitialized: true,
            secret: 'abc123',
            resave: true,
            cookie: { maxAge: 60 * 1000 * 100 }
        });
        app.use((0, cors_1.default)({
            origin: 'http://localhost:7456',
            credentials: true
        }));
        app.use(express_1.default.static('public'));
        app.use(sessionParser);
        app.use(express_1.default.json());
        app.use((req, res, next) => {
            console.log(`==== ${req.sessionID} ====`);
            next();
        });
        app.use("/", this.userController.Router);
        app.use("/rooms", this.roomController.Router);
        const server = (0, http_1.createServer)(app);
        this.wss = new SocketManager_1.default(server, sessionParser, broadcast);
        server.listen(8080, function () {
            console.log('Listening on http://localhost:8080');
        });
    }
}
exports.default = App;
;
