import Zodiac from "./Zodiac";
export default class Card {
    private zodiac: Zodiac;
    constructor(zodiac: Zodiac) {
        this.zodiac = zodiac;
    }

    public Compare(card: Card) {
        return this.zodiac == card.Zodiac;
    }

    public CompareByZodiac(zodiac: Zodiac) {
        return this.zodiac == zodiac;
    }

    public get Zodiac(): Zodiac { return this.zodiac; }

}