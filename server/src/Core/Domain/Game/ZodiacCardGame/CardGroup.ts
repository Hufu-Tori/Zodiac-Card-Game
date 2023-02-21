import Card from "./Card";

export default class CardGroup {

    private cards: Array<Card>;
    constructor(cards: Array<Card>) {
        this.cards = cards;
    }

}