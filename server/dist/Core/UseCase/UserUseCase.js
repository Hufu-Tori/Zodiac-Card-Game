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
class UserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    Create(name, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.repo.Create(name);
            presenter.Success(user);
            return;
        });
    }
    Guest(name, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.repo.Create(name);
            presenter.Success(user);
            return;
        });
    }
    UpdateName(input, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.repo.FindUserById(input.id);
            if (!user) {
                presenter.Fail("can't find user of this id");
                return;
            }
            user.SetName(input.name);
            yield this.repo.Save(user);
            presenter.Success(user);
            return;
        });
    }
}
exports.default = UserUseCase;
