"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const User_1 = __importDefault(require("../../Core/Domain/User/User"));
const nanoid = (0, nanoid_1.customAlphabet)("1234567890abcdefghijklmnopqrstuvwxyz", 6);
class UserRepository {
    constructor() {
        this.userMap = new Map();
    }
    Create(name) {
        let user = new User_1.default(nanoid(), name);
        this.userMap.set(user.Id, user);
        return user;
    }
    FindUserById(id) {
        return this.userMap.get(id);
    }
    Save(user) {
        var _a;
        (_a = this.userMap.get(user.Id)) === null || _a === void 0 ? void 0 : _a.SetName(user.Name);
    }
}
exports.default = UserRepository;
