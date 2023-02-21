"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("./ZodiacCardGame/Card"));
const StrategyOfPair_1 = __importDefault(require("./ZodiacCardGame/CardGroupStrategy/StrategyOfPair"));
const Deck_1 = __importDefault(require("./ZodiacCardGame/Deck"));
const Game_1 = __importDefault(require("./ZodiacCardGame/Game"));
const StateOfStartGame_1 = __importDefault(require("./ZodiacCardGame/GameState/StateOfStartGame"));
const Zodiac_1 = __importDefault(require("./ZodiacCardGame/Zodiac"));
class ZodiacCardGame extends Game_1.default {
    constructor(id, players) {
        let cards = [];
        for (let i = Zodiac_1.default.Rat; i <= Zodiac_1.default.Pig; i++) {
            for (let j = 0; i < 10; j++) {
                cards.push(new Card_1.default(i));
            }
        }
        let strategy = new StrategyOfPair_1.default();
        players.forEach(p => p.SetStrategy(strategy));
        super(id, players, [], new Deck_1.default(cards), new StateOfStartGame_1.default());
        this.handSize = 10;
    }
}
exports.default = ZodiacCardGame;
