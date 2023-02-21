"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGameStartedPresenter = exports.RoomLeavedPresenter = exports.RoomReadyUpdatedPresenter = exports.JoinedPresenter = exports.CreatedPresenter = void 0;
class CreatedPresenter {
    Success(event) {
        let room = event.room;
        this.output = {
            id: room.Id,
            users: room.Users.map(u => {
                return {
                    id: u.Id,
                    name: u.Name,
                    readied: u.IsReady
                };
            })
        };
    }
    Fail(error) {
        this.error = error;
    }
    GetError() {
        return this.error;
    }
    GetOutput() {
        return this.output;
    }
}
exports.CreatedPresenter = CreatedPresenter;
class JoinedPresenter {
    Success(event) {
        let room = event.room;
        this.output = {
            id: room.Id,
            users: room.Users.map(u => {
                return {
                    id: u.Id,
                    name: u.Name,
                    readied: u.IsReady
                };
            })
        };
    }
    Fail(error) {
        this.error = error;
    }
    GetError() {
        return this.error;
    }
    GetOutput() {
        return this.output;
    }
}
exports.JoinedPresenter = JoinedPresenter;
class RoomReadyUpdatedPresenter {
    Success(event) {
        this.output = {
            readied: event.user.IsReady,
        };
    }
    Fail(error) {
        this.error = error;
    }
    GetError() {
        return this.error;
    }
    GetOutput() {
        return this.output;
    }
}
exports.RoomReadyUpdatedPresenter = RoomReadyUpdatedPresenter;
class RoomLeavedPresenter {
    Success(event) {
        this.output = {
            leaved: true,
        };
    }
    Fail(error) {
        this.error = error;
    }
    GetError() {
        return this.error;
    }
    GetOutput() {
        return this.output;
    }
}
exports.RoomLeavedPresenter = RoomLeavedPresenter;
class RoomGameStartedPresenter {
    Success(event) {
        this.output = {
            started: true,
        };
    }
    Fail(error) {
        this.error = error;
    }
    GetError() {
        return this.error;
    }
    GetOutput() {
        return this.output;
    }
}
exports.RoomGameStartedPresenter = RoomGameStartedPresenter;
