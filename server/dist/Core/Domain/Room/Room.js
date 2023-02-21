"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoomStartedEvent_1 = __importDefault(require("./Events/RoomStartedEvent"));
const User_1 = __importDefault(require("./User"));
const RoomCreatedEvent_1 = __importDefault(require("./Events/RoomCreatedEvent"));
const RoomJoinedEvent_1 = __importDefault(require("./Events/RoomJoinedEvent"));
const RoomLeavedEvent_1 = __importDefault(require("./Events/RoomLeavedEvent"));
const RoomReadyUpdatedEvent_1 = __importDefault(require("./Events/RoomReadyUpdatedEvent"));
class Room {
    constructor(id, owner, min, max) {
        this.id = id;
        this.users = [owner];
        this.min = min;
        this.max = max;
    }
    static Create(id, owner, min, max) {
        const room = new Room(id, owner, min, max);
        return new RoomCreatedEvent_1.default(room);
    }
    get Id() { return this.id; }
    get Owner() { return this.users[0]; }
    get Users() { return this.users; }
    Join(userId, name) {
        if (this.IsStart())
            throw "game is start user don't have permission";
        let users = this.users;
        if (users.length >= this.max)
            throw "exceeded the maximum number of users";
        if (users.some((p) => p.Id == userId))
            throw "user already exists";
        const user = new User_1.default(userId, name);
        users.push(user);
        return new RoomJoinedEvent_1.default(user, this);
    }
    Leave(userId) {
        if (this.IsStart())
            throw "game is start user don't have permission";
        let users = this.users;
        let index = users.findIndex((p) => p.Id == userId);
        if (index < 0)
            throw "can't find user of this id";
        let user = users.splice(index, 1)[0];
        return new RoomLeavedEvent_1.default(user, this, index === 0);
    }
    Ready(userId) {
        if (this.IsStart())
            throw "game is start user don't have permission";
        let user = this.users.find((u, index) => index > 0 && u.Id == userId);
        if (!user)
            throw "can't find user of this id";
        user.Ready();
        return new RoomReadyUpdatedEvent_1.default(this, user);
    }
    Start(userId) {
        if (this.IsStart())
            throw "game is start user don't have permission";
        if (userId != this.Owner.Id)
            throw "user has no permission";
        if (!this.users.every(u => u.IsReady))
            throw "has user don't ready";
        if ((this.users.length + 1) < this.min)
            throw "not enough users";
        return new RoomStartedEvent_1.default(this);
    }
    IsStart() {
        return this.lock;
    }
}
exports.default = Room;
