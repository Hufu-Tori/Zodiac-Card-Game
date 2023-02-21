import express from "express";
import cors from "cors";
import session from "express-session";
import UserController from "../Controller/UserController";
import UserUseCase from "../../Core/UseCase/UserUseCase";
import UserRepository from "../Repositories/UserRepository";
import RoomController from "../Controller/RoomController";
import RoomUseCase from "../../Core/UseCase/RoomUseCase";
import RoomRepository from "../Repositories/RoomRepository";
import GameRepository from "../Repositories/GameRepository";
import SocketManager from "./SocketManager";
import { createServer } from "http";
import Broadcast from "../../Core/Broadcast/Broadcast";
import { RoomJoinedHandler, RoomLeavedHandler, RoomReadyUpdatedHandler } from "../BroadcastHandlers/RoomBroadcastHandler";


export default class App {
    private app: express.Express;
    private userController: UserController;
    private roomController: RoomController;

    private wss: SocketManager;


    public get App(): express.Express { return this.app; }

    constructor() {
        const app = this.app = express();

        const userRepository = new UserRepository();
        const userUseCase = new UserUseCase(userRepository);
        this.userController = new UserController(userUseCase);

        const roomRepository = new RoomRepository();
        const gameRepository = new GameRepository();

        const broadcast = new Broadcast();
        broadcast.SetEventHandler(new RoomJoinedHandler());
        broadcast.SetEventHandler(new RoomLeavedHandler());
        broadcast.SetEventHandler(new RoomReadyUpdatedHandler());
        const roomUseCase = new RoomUseCase(userRepository, roomRepository, gameRepository, broadcast);
        this.roomController = new RoomController(roomUseCase);

        const sessionParser = session({
            saveUninitialized: true,
            secret: 'abc123',
            resave: true,
            cookie: { maxAge: 60 * 1000 * 100 }
        });

        app.use(cors({
            origin: 'http://localhost:7456',
            credentials: true
        }));

        app.use(express.static('public'));
        app.use(sessionParser);
        app.use(express.json());

        app.use((req: any, res, next) => {

            console.log(`==== ${req.sessionID} ====`);
            next();
        })

        app.use("/", this.userController.Router);
        app.use("/rooms", this.roomController.Router);


        const server = createServer(app);

        this.wss = new SocketManager(server, sessionParser, broadcast);

        server.listen(8080, function () {
            console.log('Listening on http://localhost:8080');
        });
    }

};
