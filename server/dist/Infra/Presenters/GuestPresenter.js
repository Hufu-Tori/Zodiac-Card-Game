"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestPresenter = void 0;
class GuestPresenter {
    Success(user) {
        return { name: user.Name, id: user.Id };
    }
}
exports.GuestPresenter = GuestPresenter;
