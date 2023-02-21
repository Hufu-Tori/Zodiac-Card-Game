import Card from "./Card";
import Zodiac from "./Zodiac";

export default class Hand {
    private cards: Array<Card>;
    constructor() {
        this.cards = [];
    }

    public GetCards(): Array<Card> {
        return this.cards;
    }

    public AddCard(c: Card) {
        this.cards.push(c);
    }

    public Sort() {
        this.cards.sort((a, b) => a.Zodiac - b.Zodiac);
    }

    public GetCard(i: number) {
        return this.cards[i];
    }

    public PlayCardByType(type: Zodiac) {
        return this.cards.splice(this.cards.findIndex(c => c.CompareByZodiac(type)), 1)[0];
    }

    public PlayCard(i: number): Card {
        return this.cards.splice(i, 1)[0];
    }

    public GetSize(): number {
        return this.cards.length;
    }
}