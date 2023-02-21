import Card from "./Card";
import { randomInt } from "crypto";

export default class Deck {

    private cards: Array<Card>;

    constructor(cards: Array<Card>) {
        this.cards = cards;
    }

    public GetCount(): number {
        return this.cards.length;
    }

    public Shuffle() {
        this.cards.forEach((v, i, list) => {
            let index = randomInt(list.length);
            list[i] = list[index];
            list[index] = v;
        });
    }

    public DrawCard(): Card | undefined {
        return this.cards.pop();
    }

}