"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameDrawnCardEvent_1 = __importDefault(require("../Events/GameDrawnCardEvent"));
const GameOverEvent_1 = __importDefault(require("../Events/GameOverEvent"));
const GameState_1 = __importDefault(require("./GameState/GameState"));
const StateOfPlayCard_1 = __importDefault(require("./GameState/StateOfPlayCard"));
class Game {
    constructor(id, players, strategys, deck, state) {
        this.id = id;
        this.strategys = strategys;
        this.players = players;
        this.state = state;
        this.deck = deck;
    }
    get Id() { return this.id; }
    GetStrategys() { return this.strategys; }
    GetPlayers() { return this.players; }
    GetDeck() { return this.deck; }
    GetPlayerCount() { return this.players.length; }
    GetPlayPlayer() { return this.playPlayer; }
    GetPlayCard() { return this.playCard; }
    Start() {
        return this.state.Start();
    }
    PlayCard(playerId, cardId) {
        return this.state.PlayCard(playerId, cardId);
    }
    MeldCard(playerId, isMeld) {
        return this.state.MeldCard(playerId, isMeld);
    }
    DrawCard() {
        if (this.GetDeck().GetCount() > 0) {
            let nextPlayer = this.GetNextPlayer();
            let drawCard = this.GetDeck().DrawCard();
            nextPlayer.Hand.AddCard(drawCard);
            this.SetPlayPlayer(nextPlayer);
            this.UpdateState(new StateOfPlayCard_1.default());
            return new GameDrawnCardEvent_1.default(nextPlayer, drawCard);
        }
        else {
            return this.GameOver();
        }
    }
    GameOver(winner = null) {
        this.UpdateState(new GameState_1.default());
        return new GameOverEvent_1.default(winner);
    }
    UpdateState(state) {
        this.state = state;
        state.SetGame(this);
    }
    Deal() {
        for (let i = 0; i < this.handSize - 1; i++) {
            for (let j = 0; j < this.players.length; j++) {
                this.players[j].Hand.AddCard(this.deck.DrawCard());
            }
        }
        this.playPlayer.Hand.AddCard(this.deck.DrawCard());
    }
    SetPlayPlayer(player) {
        this.playPlayer = player;
        this.playCard = null;
    }
    SetPlayCard(card) {
        this.playCard = card;
    }
    GetPlayerIndex(player) {
        return this.players.indexOf(player);
    }
    GetPlayerByIndex(index) {
        return this.players[index];
    }
    GetPlayerById(playerId) {
        return this.players.find(p => p.Id == playerId);
    }
    GetNextPlayer() {
        return (this.GetPlayerByIndex((this.GetPlayerIndex(this.playPlayer) + 1) % this.players.length));
    }
}
exports.default = Game;
Game.min = 3;
Game.max = 4;
;
