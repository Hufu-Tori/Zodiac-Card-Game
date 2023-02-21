"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameStartedEvent_1 = __importDefault(require("../../Events/GameStartedEvent"));
const GameState_1 = __importDefault(require("./GameState"));
const StateOfPlayCard_1 = __importDefault(require("./StateOfPlayCard"));
class StateOfStartGame extends GameState_1.default {
    Start() {
        let game = this.game, players = game.GetPlayers(), deck = game.GetDeck();
        game.SetPlayPlayer(players[0]);
        deck.Shuffle();
        game.Deal();
        let cardGroupMap = new Map();
        players.forEach(p => {
            p.Hand.Sort();
            cardGroupMap.set(p, p.TakeOutCardGroup());
        });
        let events = [new GameStartedEvent_1.default(players, game.GetPlayPlayer(), cardGroupMap)];
        if (game.GetPlayPlayer().Hand.GetSize() == 0) {
            events.push(this.game.GameOver(game.GetPlayPlayer()));
        }
        else {
            game.UpdateState(new StateOfPlayCard_1.default());
        }
        return events;
    }
}
exports.default = StateOfStartGame;
