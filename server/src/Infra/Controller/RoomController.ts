import Express, { Router } from "express";
import RoomUseCase from "../../Core/UseCase/RoomUseCase";
import { CreatedPresenter, JoinedPresenter, RoomGameStartedPresenter, RoomLeavedPresenter, RoomReadyUpdatedPresenter } from "../Presenters/RoomPresenter";
import { body, param, validationResult } from "express-validator";

export default class RoomController {

    private roomUsecase: RoomUseCase;
    private router: Router;

    constructor(roomUsecase: RoomUseCase) {
        this.roomUsecase = roomUsecase;
        let router = this.router = Router();

        router.use("/", body("id").isString(), (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });

        router.use("/:roomId", param("roomId").isString(), (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });

        router.post("/", (req, res) => this.Create(req, res));
        router.post("/:roomId/join", (req, res) => this.Join(req, res));
        router.post("/:roomId/ready", (req, res) => this.Ready(req, res));
        router.post("/:roomId/leave", (req, res) => this.Leave(req, res));
        router.post("/:roomId/start", (req, res) => this.Start(req, res));

    }

    public get Router(): Router { return this.router; }

    private async Create(req: Express.Request | any, res: Express.Response) {

        try {
            let presenter = new CreatedPresenter();
            await this.roomUsecase.Create(req.body.id, presenter);
            res.status(200).json(presenter.GetOutput());
        }
        catch (error) {
            res.status(400).json(error);
        }

    }

    private async Join(req: Express.Request | any, res: Express.Response) {
        try {
            let presenter = new JoinedPresenter();
            await this.roomUsecase.Join({ userId: req.body.id, roomId: req.params.roomId }, presenter);
            res.status(200).json(presenter.GetOutput());
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    private async Ready(req: Express.Request | any, res: Express.Response) {
        try {
            let presenter = new RoomReadyUpdatedPresenter();
            await this.roomUsecase.Ready({ userId: req.body.id, roomId: req.params.roomId }, presenter);
            res.status(200).json(presenter.GetOutput());
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    private async Leave(req: Express.Request | any, res: Express.Response) {
        try {
            let presenter = new RoomLeavedPresenter();
            await this.roomUsecase.Leave({ userId: req.body.id, roomId: req.params.roomId }, presenter);
            res.status(200).json(presenter.GetOutput());
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    private async Start(req: Express.Request | any, res: Express.Response) {
        try {
            let presenter = new RoomGameStartedPresenter();
            await this.roomUsecase.Start({ userId: req.body.id, roomId: req.params.roomId }, presenter);
            res.status(200).json(presenter.GetOutput());
        }
        catch (error) {
            res.status(400).json(error);
        }
    }


}
