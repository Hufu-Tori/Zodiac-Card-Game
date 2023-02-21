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
class Express {
    get App() { return this.app; }
    constructor() {
        const app = this.app = (0, express_1.default)();
        const userRepository = new UserRepository_1.default();
        const userUseCase = new UserUseCase_1.default(userRepository);
        this.userController = new UserController_1.default(userUseCase);
        const roomRepository = new RoomRepository_1.default();
        const gameRepository = new GameRepository_1.default();
        const roomUseCase = new RoomUseCase_1.default(userRepository, roomRepository, gameRepository);
        this.roomController = new RoomController_1.default(roomUseCase);
        const sessionParser = (0, express_session_1.default)({
            saveUninitialized: false,
            secret: '$eCuRiTy',
            resave: false
        });
        app.use((0, cors_1.default)({
            origin: 'http://localhost:7456',
        }));
        app.use(express_1.default.static('public'));
        app.use(sessionParser);
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({
            extended: true
        }));
        app.use("/users", this.userController.Router);
        app.use("/rooms", this.roomController.Router);
        app.listen(8080);
    }
}
exports.default = Express;
;
