"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../Primitives/Event"));
class GamePlayedCardGroupEvnet extends Event_1.default {
    constructor(playPlayer, cardGroup) {
        super();
        this.playPlayer = playPlayer;
        this.cardGroup = cardGroup;
    }
}
exports.default = GamePlayedCardGroupEvnet;
