"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameTakeMeldEvent_1 = __importDefault(require("../../Events/GameTakeMeldEvent"));
const GamePlayedCardEvent_1 = __importDefault(require("../../Events/GamePlayedCardEvent"));
const GameState_1 = __importDefault(require("./GameState"));
const StateOfTakeMeld_1 = __importDefault(require("./StateOfTakeMeld"));
const GamePlayedCardGroupEvnet_1 = __importDefault(require("../../Events/GamePlayedCardGroupEvnet"));
class StateOfPlayCard extends GameState_1.default {
    PlayCard(playerId, type) {
        let playPlayer = this.game.GetPlayPlayer();
        if (!playPlayer || playPlayer.Id != playerId)
            throw "player can't play card";
        let card = playPlayer.PlayCard(type);
        this.game.SetPlayCard(card);
        let events = [new GamePlayedCardEvent_1.default(card, playPlayer)];
        let list = this.CheckIfAnyPlayerCanMeldTheCard(this.game.GetPlayers(), playPlayer, card);
        if (list.length > 0) {
            this.game.UpdateState(new StateOfTakeMeld_1.default(list));
            events.push(new GameTakeMeldEvent_1.default(list));
        }
        else {
            events.push(this.game.DrawCard());
        }
        return events;
    }
    MeldCard(playerId) {
        let playPlayer = this.game.GetPlayPlayer();
        if (!playPlayer || playPlayer.Id != playerId)
            throw "player can't meld card";
        let list = playPlayer.TakeOutCardGroup();
        if (list.length == 0)
            throw "can't find a card group";
        let events = [new GamePlayedCardGroupEvnet_1.default(playPlayer, list[0])];
        if (playPlayer.Hand.GetSize() == 0) {
            events.push(this.game.GameOver());
        }
        return events;
    }
    CheckIfAnyPlayerCanMeldTheCard(players, playPlayer, card) {
        let canMeldCardPlayers = [];
        let index = players.indexOf(playPlayer) + 1;
        for (let i = 0; i < players.length - 1; i++) {
            let p = players[(index + i) % players.length];
            if (p == playPlayer)
                continue;
            if (p.CheckMeldCard(card)) {
                canMeldCardPlayers.push(p);
            }
        }
        return canMeldCardPlayers;
    }
}
exports.default = StateOfPlayCard;
