import UserUseCase from "../../Core/UseCase/UserUseCase";
import { GuestPresenter } from "../Presenters/UserPresenter";
import express, { Router } from "express";
import { body, validationResult } from "express-validator";

export default class UserController {

    private userUsecase: UserUseCase;
    private router: Router;

    constructor(userUsecase: UserUseCase) {
        this.userUsecase = userUsecase;
        this.router = Router();
        this.router.post("/guest", this.GuestValidation(), this.Guest());
        // this.router.delete("/logout", this.CreateValidation(), this.Create());
    }

    public get Router(): Router { return this.router; }


    private GuestValidation() {
        return body("name").isString().isLength({ min: 4, max: 12 });
    }

    private Guest() {
        return async (req: express.Request | any, res: express.Response) => {
            if (req.session && req.session.user && req.session.user.name == req.body.name) {
                res.status(200).json(req.session.user);
                return;
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let presenter = new GuestPresenter();
            if (!req.session.user) {
                await this.userUsecase.Guest(req.body.name, presenter);
            }
            else {
                await this.userUsecase.UpdateName({ id: req.session.user.id, name: req.body.name }, presenter);
            }

            let error = presenter.GetError();
            if (error) res.status(400).json(error);

            let user = presenter.GetOutput();
            req.session.user = user;
            res.status(200).json(user);
        }
    }

}