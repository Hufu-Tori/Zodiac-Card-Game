import Event from "../../../Primitives/Event";
import GameStartedEvent from "../../Events/GameStartedEvent";
import GameState from "./GameState";
import StateOfPlayCard from "./StateOfPlayCard";

export default class StateOfStartGame extends GameState {

    public Start() {
        let game = this.game,
            players = game.GetPlayers(),
            deck = game.GetDeck();

        game.SetPlayPlayer(players[0]);
        deck.Shuffle();
        game.Deal();

        let cardGroupMap = new Map();

        players.forEach(p => {
            p.Hand.Sort();
            cardGroupMap.set(p, p.TakeOutCardGroup());
        });

        let events: Array<Event> = [new GameStartedEvent(players, game.GetPlayPlayer(), cardGroupMap)];

        if (game.GetPlayPlayer().Hand.GetSize() == 0) {
            events.push(this.game.GameOver(game.GetPlayPlayer()));
        }
        else {
            game.UpdateState(new StateOfPlayCard());
        }

        return events;
    }

}