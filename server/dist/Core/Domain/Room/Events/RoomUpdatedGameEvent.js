"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvent_1 = __importDefault(require("../../Primitives/DomainEvent"));
class RoomUpdatedGameEvent extends DomainEvent_1.default {
    constructor(game) {
        super();
        this.game = game;
    }
}
exports.default = RoomUpdatedGameEvent;
