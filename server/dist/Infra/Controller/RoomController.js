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
const express_1 = require("express");
const RoomPresenter_1 = require("../Presenters/RoomPresenter");
const express_validator_1 = require("express-validator");
class RoomController {
    constructor(roomUsecase) {
        this.roomUsecase = roomUsecase;
        let router = this.router = (0, express_1.Router)();
        router.use("/", (0, express_validator_1.body)("id").isString(), (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
        router.use("/:roomId", (0, express_validator_1.param)("roomId").isString(), (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
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
    get Router() { return this.router; }
    Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let presenter = new RoomPresenter_1.CreatedPresenter();
                yield this.roomUsecase.Create(req.body.id, presenter);
                res.status(200).json(presenter.GetOutput());
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    Join(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let presenter = new RoomPresenter_1.JoinedPresenter();
                yield this.roomUsecase.Join({ userId: req.body.id, roomId: req.params.roomId }, presenter);
                res.status(200).json(presenter.GetOutput());
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    Ready(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let presenter = new RoomPresenter_1.RoomReadyUpdatedPresenter();
                yield this.roomUsecase.Ready({ userId: req.body.id, roomId: req.params.roomId }, presenter);
                res.status(200).json(presenter.GetOutput());
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    Leave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let presenter = new RoomPresenter_1.RoomLeavedPresenter();
                yield this.roomUsecase.Leave({ userId: req.body.id, roomId: req.params.roomId }, presenter);
                res.status(200).json(presenter.GetOutput());
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    Start(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let presenter = new RoomPresenter_1.RoomGameStartedPresenter();
                yield this.roomUsecase.Start({ userId: req.body.id, roomId: req.params.roomId }, presenter);
                res.status(200).json(presenter.GetOutput());
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
exports.default = RoomController;
