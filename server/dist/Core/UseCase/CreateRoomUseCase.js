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
class CreateRoomUseCase {
    constructor(roomRepo) {
        this.roomRepo = roomRepo;
    }
    Execute(input, output) {
        return __awaiter(this, void 0, void 0, function* () {
            // let user = new User(input.userId);
            // let event = Room.Create(nanoid(6), user, { name: "", min: Game.min, max: Game.max });
            // await this.roomRepo.AddRoom(event.room);
            // output.Success(event);
        });
    }
}
exports.default = CreateRoomUseCase;
