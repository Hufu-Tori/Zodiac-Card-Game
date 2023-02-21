import Card from "../Card";
import CardGroup from "../CardGroup";

export default interface ICardGroupStrategy {
    Meld(play: Card, cards: Array<Card>): CardGroup;
    TakeOutCardGroup(cards: Array<Card>): Array<CardGroup>;
    Check(play: Card, cards: Array<Card>): boolean;
}