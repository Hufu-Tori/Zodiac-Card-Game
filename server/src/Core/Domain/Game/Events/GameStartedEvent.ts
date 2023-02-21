import Event from "../../Primitives/Event";
import CardGroup from "../ZodiacCardGame/CardGroup";
import ICardGroupStrategy from "../ZodiacCardGame/CardGroupStrategy/ICardGroupStrategy";
import Player from "../ZodiacCardGame/Player";

export default class GameStartedEvent extends Event {
    public readonly players: Array<Player>;
    public readonly playPlayer: Player;
    public readonly cardGroupsMap: Map<Player, Array<CardGroup>>;
    constructor(players: Array<Player>, playPlayer: Player, cardGroupsMap: Map<Player, Array<CardGroup>>) {
        super();
        this.players = players;
        this.playPlayer = playPlayer;
        this.cardGroupsMap = cardGroupsMap;
    }
}