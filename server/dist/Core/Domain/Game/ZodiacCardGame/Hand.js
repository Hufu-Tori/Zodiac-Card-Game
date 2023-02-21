"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hand {
    constructor() {
        this.cards = [];
    }
    GetCards() {
        return this.cards;
    }
    AddCard(c) {
        this.cards.push(c);
    }
    Sort() {
        this.cards.sort((a, b) => a.Zodiac - b.Zodiac);
    }
    GetCard(i) {
        return this.cards[i];
    }
    PlayCardByType(type) {
        return this.cards.splice(this.cards.findIndex(c => c.CompareByZodiac(type)), 1)[0];
    }
    PlayCard(i) {
        return this.cards.splice(i, 1)[0];
    }
    GetSize() {
        return this.cards.length;
    }
}
exports.default = Hand;
