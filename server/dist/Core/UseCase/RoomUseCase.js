"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class RoomUseCase {
    constructor(userRepo, roomRepo, gameRepo, broadcast) {
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
        this.gameRepo = gameRepo;
        this.broadcast = broadcast;
    }
    Create(userId, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.FindUserById(userId);
            if (!user) {
                throw "not find user";
            }
            const event = yield this.roomRepo.Create(user.Id, user.Name);
            presenter.Success(event);
            return;
        });
    }
    Join(input, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.FindUserById(input.userId);
            if (!user) {
                throw "not find user";
            }
            const room = yield this.roomRepo.FindById(input.roomId);
            if (!room) {
                throw "not find room";
            }
            let event = room.Join(user.Id, user.Name);
            this.broadcast.Publish(event);
            presenter.Success(event);
            yield this.roomRepo.Save(room);
            return;
        });
    }
    Leave(input, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.roomRepo.FindById(input.roomId);
            if (!room)
                throw "not find room";
            let event = room.Leave(input.userId);
            this.broadcast.Publish(event);
            presenter.Success(event);
            if (event.disposed) {
                yield this.roomRepo.Delete(room);
            }
            else {
                yield this.roomRepo.Save(room);
            }
            return;
        });
    }
    Ready(input, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.roomRepo.FindById(input.roomId);
            if (!room)
                throw "not find room";
            let event = room.Ready(input.userId);
            this.broadcast.Publish(event);
            presenter.Success(event);
            yield this.roomRepo.Save(room);
            return;
        });
    }
    Start(input, presenter) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.roomRepo.FindById(input.roomId);
            if (!room)
                throw "not find room";
            let events = [];
            let roomEvent = room.Start(input.userId);
            events.push(roomEvent);
            presenter.Success(roomEvent);
            let game = yield this.gameRepo.Create(room);
            let gameEvents = game.Start();
            events.push(...gameEvents);
            this.broadcast.Publish(events);
            yield this.roomRepo.Save(room);
            return;
        });
    }
}
exports.default = RoomUseCase;
