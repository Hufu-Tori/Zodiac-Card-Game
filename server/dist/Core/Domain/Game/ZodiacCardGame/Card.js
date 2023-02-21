"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(zodiac) {
        this.zodiac = zodiac;
    }
    Compare(card) {
        return this.zodiac == card.Zodiac;
    }
    CompareByZodiac(zodiac) {
        return this.zodiac == zodiac;
    }
    get Zodiac() { return this.zodiac; }
}
exports.default = Card;
