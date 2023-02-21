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
const UserPresenter_1 = require("../Presenters/UserPresenter");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
class UserController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
        this.router = (0, express_1.Router)();
        this.router.post("/guest", this.GuestValidation(), this.Guest());
        // this.router.delete("/logout", this.CreateValidation(), this.Create());
    }
    get Router() { return this.router; }
    GuestValidation() {
        return (0, express_validator_1.body)("name").isString().isLength({ min: 4, max: 12 });
    }
    Guest() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.session && req.session.user && req.session.user.name == req.body.name) {
                res.status(200).json(req.session.user);
                return;
            }
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let presenter = new UserPresenter_1.GuestPresenter();
            if (!req.session.user) {
                yield this.userUsecase.Guest(req.body.name, presenter);
            }
            else {
                yield this.userUsecase.UpdateName({ id: req.session.user.id, name: req.body.name }, presenter);
            }
            let error = presenter.GetError();
            if (error)
                res.status(400).json(error);
            let user = presenter.GetOutput();
            req.session.user = user;
            res.status(200).json(user);
        });
    }
}
exports.default = UserController;
