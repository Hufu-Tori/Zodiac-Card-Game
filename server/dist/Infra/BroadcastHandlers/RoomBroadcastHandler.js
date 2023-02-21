"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomReadyUpdatedHandler = exports.RoomLeavedHandler = exports.RoomJoinedHandler = void 0;
const RoomJoinedEvent_1 = __importDefault(require("../../Core/Domain/Room/Events/RoomJoinedEvent"));
const RoomLeavedEvent_1 = __importDefault(require("../../Core/Domain/Room/Events/RoomLeavedEvent"));
const RoomReadyUpdatedEvent_1 = __importDefault(require("../../Core/Domain/Room/Events/RoomReadyUpdatedEvent"));
class RoomJoinedHandler {
    get Key() {
        return RoomJoinedEvent_1.default.name;
    }
    Handle(event, subscribers) {
        const room = event.room;
        const user = event.user;
        const output = {
            event: this.Key,
            user: {
                id: user.Id,
                name: user.Name,
                readied: user.IsReady
            }
        };
        const json = JSON.stringify(output);
        room.Users.forEach(u => { var _a; if (u.Id != user.Id)
            (_a = subscribers.get(u.Id)) === null || _a === void 0 ? void 0 : _a.Notify(json); });
    }
}
exports.RoomJoinedHandler = RoomJoinedHandler;
class RoomLeavedHandler {
    get Key() {
        return RoomLeavedEvent_1.default.name;
    }
    Handle(event, subscribers) {
        const room = event.room;
        const user = event.user;
        const output = {
            event: this.Key,
            user: {
                id: user.Id
            },
            disposed: event.disposed
        };
        const json = JSON.stringify(output);
        room.Users.forEach(u => { var _a; if (u.Id != user.Id)
            (_a = subscribers.get(u.Id)) === null || _a === void 0 ? void 0 : _a.Notify(json); });
    }
}
exports.RoomLeavedHandler = RoomLeavedHandler;
class RoomReadyUpdatedHandler {
    get Key() {
        return RoomReadyUpdatedEvent_1.default.name;
    }
    Handle(event, subscribers) {
        const room = event.room;
        const user = event.user;
        const output = {
            event: this.Key,
            user: {
                id: user.Id,
                readied: user.IsReady
            }
        };
        const json = JSON.stringify(output);
        room.Users.forEach(u => { var _a; return (_a = subscribers.get(u.Id)) === null || _a === void 0 ? void 0 : _a.Notify(json); });
    }
}
exports.RoomReadyUpdatedHandler = RoomReadyUpdatedHandler;
