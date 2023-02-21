"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const Room_1 = __importDefault(require("../../../Core/Domain/Room/Room"));
const User_1 = __importDefault(require("../../../Core/Domain/Room/User"));
class RoomRepository {
    FindById(roomId) {
        return undefined;
    }
    Create(userId, name) {
        return new Room_1.default((0, nanoid_1.nanoid)(6), new User_1.default(userId));
    }
    Save(room) {
    }
}
exports.default = RoomRepository;
