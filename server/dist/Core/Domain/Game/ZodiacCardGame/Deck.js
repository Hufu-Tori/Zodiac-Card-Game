"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Deck {
    constructor(cards) {
        this.cards = cards;
    }
    GetCount() {
        return this.cards.length;
    }
    Shuffle() {
        this.cards.forEach((v, i, list) => {
            let index = (0, crypto_1.randomInt)(list.length);
            list[i] = list[index];
            list[index] = v;
        });
    }
    DrawCard() {
        return this.cards.pop();
    }
}
exports.default = Deck;
