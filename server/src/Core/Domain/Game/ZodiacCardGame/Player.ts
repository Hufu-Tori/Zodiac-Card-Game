import Hand from "./Hand";
import ICardGroupStrategy from "./CardGroupStrategy/ICardGroupStrategy";
import Card from "./Card";
import Zodiac from "./Zodiac";
import CardGroup from "./CardGroup";

export default class Player {

    private id: string;
    private hand: Hand;
    private strategy: ICardGroupStrategy;

    constructor(id: string) {
        this.id = id;
        this.hand = new Hand();
    }

    public get Id(): string { return this.id; }
    public get CardGroupStrategy(): ICardGroupStrategy { return this.strategy; }
    public get Hand(): Hand { return this.hand; }

    public SetStrategy(strategy: ICardGroupStrategy) {
        this.strategy = strategy;
    }

    public PlayCard(type: Zodiac): Card {
        return this.hand.PlayCardByType(type);
    }

    public CheckMeldCard(card: Card): boolean {
        return this.strategy.Check(card, this.hand.GetCards());
    }

    public TakeOutCardGroup(): Array<CardGroup> {
        return this.strategy.TakeOutCardGroup(this.hand.GetCards());
    }

}