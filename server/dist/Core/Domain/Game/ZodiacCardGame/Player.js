"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hand_1 = __importDefault(require("./Hand"));
class Player {
    constructor(id) {
        this.id = id;
        this.hand = new Hand_1.default();
    }
    get Id() { return this.id; }
    get CardGroupStrategy() { return this.strategy; }
    get Hand() { return this.hand; }
    SetStrategy(strategy) {
        this.strategy = strategy;
    }
    PlayCard(type) {
        return this.hand.PlayCardByType(type);
    }
    CheckMeldCard(card) {
        return this.strategy.Check(card, this.hand.GetCards());
    }
    TakeOutCardGroup() {
        return this.strategy.TakeOutCardGroup(this.hand.GetCards());
    }
}
exports.default = Player;
