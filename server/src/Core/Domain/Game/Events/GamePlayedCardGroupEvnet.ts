import Event from "../../Primitives/Event";
import CardGroup from "../ZodiacCardGame/CardGroup";
import Player from "../ZodiacCardGame/Player";

export default class GamePlayedCardGroupEvnet extends Event {

    public readonly cardGroup: CardGroup;
    public readonly playPlayer: Player;

    constructor(playPlayer: Player, cardGroup: CardGroup) {
        super();
        this.playPlayer = playPlayer;
        this.cardGroup = cardGroup;
    }
}