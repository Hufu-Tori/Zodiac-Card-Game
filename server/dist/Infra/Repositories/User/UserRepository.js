"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const User_1 = __importDefault(require("../../../Core/Domain/User/User"));
class UserRepository {
    Create(name) {
        let user = new User_1.default((0, nanoid_1.nanoid)(6), name);
        return user;
    }
    FindUserById(id) {
        return null;
    }
}
exports.default = UserRepository;
