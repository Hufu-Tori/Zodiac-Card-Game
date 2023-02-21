import Event from "../../../Primitives/Event";
import Game from "../Game";
import Zodiac from "../Zodiac";

export default class GameState {

    protected game: Game;

    public SetGame(game: Game) {
        this.game = game;
    }

    public EntryState() { }


    public Start(): Array<Event> {
        throw "no permission";
    }

    public ChooseCardGroupStrategy(playerId: string, index: number): Array<Event> {
        throw "no permission";
    }

    public PlayCard(playerId: string, type: Zodiac): Array<Event> {
        throw "no permission";
    }

    public MeldCard(playerId: string, isMeld: boolean): Array<Event> {
        throw "no permission";
    }

}