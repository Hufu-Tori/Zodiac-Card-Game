"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GamePlayedCardGroupEvnet_1 = __importDefault(require("../../Events/GamePlayedCardGroupEvnet"));
const GameState_1 = __importDefault(require("./GameState"));
class StateOfTakeMeld extends GameState_1.default {
    constructor(players) {
        super();
        this.players = players;
        this.selectedList = [];
    }
    MeldCard(playerId, isMeld) {
        let index = this.players.findIndex(p => p.Id == playerId);
        if (index < 0)
            throw "player can't meld card";
        if (typeof this.selectedList[index] == "boolean")
            throw "player selected";
        this.selectedList[index] = isMeld;
        let meldCardPlayer = null;
        let events = [];
        for (let i = this.selectedList.length - 1; i >= 0; i--) {
            if (typeof this.selectedList[i] != "boolean") {
                meldCardPlayer = null;
                continue;
            }
            if (this.selectedList[i])
                meldCardPlayer = this.players[i];
        }
        if (meldCardPlayer) {
            let cardGroup = meldCardPlayer.CardGroupStrategy.Meld(this.game.GetPlayCard(), meldCardPlayer.Hand.GetCards());
            events.push(new GamePlayedCardGroupEvnet_1.default(meldCardPlayer, cardGroup));
            if (meldCardPlayer.Hand.GetSize() == 0) {
                events.push(this.game.GameOver(meldCardPlayer));
            }
        }
        else {
            events.push(this.game.DrawCard());
        }
        return events;
    }
}
exports.default = StateOfTakeMeld;
