"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestPresenter = void 0;
class GuestPresenter {
    Success(user) {
        this.output = { name: user.Name, id: user.Id };
        return;
    }
    GetOutput() {
        return this.output;
    }
    Fail(error) {
        this.error = error;
    }
    GetError() {
        return this.error;
    }
}
exports.GuestPresenter = GuestPresenter;
