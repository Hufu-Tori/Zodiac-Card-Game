"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const Room_1 = __importDefault(require("../../Core/Domain/Room/Room"));
const User_1 = __importDefault(require("../../Core/Domain/Room/User"));
const nanoid = (0, nanoid_1.customAlphabet)("1234567890abcdefghijklmnopqrstuvwxyz", 6);
class RoomRepository {
    constructor() {
        this.roomMap = new Map();
    }
    FindById(roomId) {
        return this.roomMap.get(roomId);
    }
    Create(userId, name) {
        const event = Room_1.default.Create(nanoid(), new User_1.default(userId, name), 3, 4);
        const room = event.room;
        this.roomMap.set(room.Id, room);
        return event;
    }
    Save(room) {
    }
    Delete(room) {
        this.roomMap.delete(room.Id);
    }
}
exports.default = RoomRepository;
