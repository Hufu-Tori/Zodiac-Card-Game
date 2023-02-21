import Card from "../Card";
import CardGroup from "../CardGroup";
import ICardGroupStrategy from "./ICardGroupStrategy";

export default class StrategyOfPair implements ICardGroupStrategy {

    TakeOutCardGroup(cards: Array<Card>): CardGroup[] {

        let list: CardGroup[] = [];

        for (let i = cards.length - 2; i >= 0;) {

            if (cards[i].Compare(cards[i + 1])) {
                list.push(new CardGroup(cards.splice(i, 2)));
                i -= 2;
            } else {
                i--;
            }
        }

        return list;
    }

    Meld(play: Card, cards: Array<Card>): CardGroup {
        let index = cards.findIndex(c => c.Compare(play));
        if (index < 0) throw "can't meld";
        let list = cards.splice(index, 1);
        list.push(play);
        return new CardGroup(list);
    }

    Check(play: Card, cards: Array<Card>): boolean {
        let index = cards.findIndex(c => c.Compare(play));
        return index >= 0;
    }

}