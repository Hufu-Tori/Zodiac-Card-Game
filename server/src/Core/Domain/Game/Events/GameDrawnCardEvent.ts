import Event from "../../Primitives/Event";
import Card from "../ZodiacCardGame/Card";
import Player from "../ZodiacCardGame/Player";

export default class GameDrawnCardEvent extends Event {

    public readonly playPlayer: Player;
    public readonly drawCard: Card;

    constructor(playPlayer: Player, drawCard: Card) {
        super();
        this.playPlayer = playPlayer;
        this.drawCard = drawCard;
    }
}