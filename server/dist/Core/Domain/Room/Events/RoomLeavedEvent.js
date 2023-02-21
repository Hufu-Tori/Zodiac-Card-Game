"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../Primitives/Event"));
class RoomLeavedEvent extends Event_1.default {
    constructor(user, room, disposed = false) {
        super();
        this.user = user;
        this.room = room;
        this.disposed = disposed;
    }
}
exports.default = RoomLeavedEvent;
