import Event from "../../Primitives/Event";
import Player from "../ZodiacCardGame/Player";

export default class GameTakeMeldEvent extends Event {

    public readonly players: Array<Player>

    constructor(players: Array<Player>) {
        super();
        this.players = players;
    }
}