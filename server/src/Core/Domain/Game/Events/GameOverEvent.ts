import Event from "../../Primitives/Event";
import Player from "../ZodiacCardGame/Player";

export default class GameOverEvent extends Event {
    public readonly winner: Player | null;
    constructor(winner: Player | null) {
        super();
        this.winner = winner;
    }
}