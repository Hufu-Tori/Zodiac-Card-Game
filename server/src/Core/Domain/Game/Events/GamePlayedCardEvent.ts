import Event from "../../Primitives/Event";
import Card from "../ZodiacCardGame/Card";
import Player from "../ZodiacCardGame/Player";

export default class GamePlayedCardEvent extends Event {
    public readonly playPlayer: Player;
    public readonly playCard: Card;

    constructor(playCard: Card, playPlayer: Player) {
        super();
        this.playCard = playCard;
        this.playPlayer = playPlayer;
    }
}