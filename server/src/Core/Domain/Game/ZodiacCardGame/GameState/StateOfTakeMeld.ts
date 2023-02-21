import Event from "../../../Primitives/Event";
import GamePlayedCardGroupEvnet from "../../Events/GamePlayedCardGroupEvnet";
import Card from "../Card";
import CardGroup from "../CardGroup";
import Player from "../Player";
import GameState from "./GameState";

export default class StateOfTakeMeld extends GameState {

    private players: Array<Player>;
    private selectedList: Array<boolean>;

    constructor(players: Array<Player>) {
        super();
        this.players = players;
        this.selectedList = [];
    }

    public MeldCard(playerId: string, isMeld: boolean) {

        let index = this.players.findIndex(p => p.Id == playerId);
        if (index < 0) throw "player can't meld card";
        if (typeof this.selectedList[index] == "boolean") throw "player selected";

        this.selectedList[index] = isMeld;

        let meldCardPlayer = null;

        let events: Array<Event> = [];

        for (let i = this.selectedList.length - 1; i >= 0; i--) {
            if (typeof this.selectedList[i] != "boolean") {
                meldCardPlayer = null;
                continue;
            }
            if (this.selectedList[i]) meldCardPlayer = this.players[i];
        }

        if (meldCardPlayer) {
            let cardGroup: CardGroup = meldCardPlayer.CardGroupStrategy.Meld(this.game.GetPlayCard() as Card, meldCardPlayer.Hand.GetCards());
            events.push(new GamePlayedCardGroupEvnet(meldCardPlayer, cardGroup));
            if (meldCardPlayer.Hand.GetSize() == 0) {
                events.push(this.game.GameOver(meldCardPlayer));
            }
        }
        else {
            events.push(this.game.DrawCard());
        }

        return events;
    }

}