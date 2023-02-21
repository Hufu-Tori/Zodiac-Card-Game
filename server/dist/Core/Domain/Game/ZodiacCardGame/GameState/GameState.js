"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameState {
    SetGame(game) {
        this.game = game;
    }
    EntryState() { }
    Start() {
        throw "no permission";
    }
    ChooseCardGroupStrategy(playerId, index) {
        throw "no permission";
    }
    PlayCard(playerId, type) {
        throw "no permission";
    }
    MeldCard(playerId, isMeld) {
        throw "no permission";
    }
}
exports.default = GameState;
