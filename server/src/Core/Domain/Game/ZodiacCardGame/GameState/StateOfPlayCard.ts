import Event from "../../../Primitives/Event";
import GameTakeMeldEvent from "../../Events/GameTakeMeldEvent";
import GamePlayedCardEvent from "../../Events/GamePlayedCardEvent";
import Card from "../Card";
import Zodiac from "../Zodiac";
import GameState from "./GameState";
import StateOfTakeMeld from "./StateOfTakeMeld";
import Player from "../Player";
import GamePlayedCardGroupEvnet from "../../Events/GamePlayedCardGroupEvnet";

export default class StateOfPlayCard extends GameState {

    public PlayCard(playerId: string, type: Zodiac) {

        let playPlayer = this.game.GetPlayPlayer();

        if (!playPlayer || playPlayer.Id != playerId) throw "player can't play card";
        let card = playPlayer.PlayCard(type);
        this.game.SetPlayCard(card);

        let events: Array<Event> = [new GamePlayedCardEvent(card, playPlayer)];

        let list = this.CheckIfAnyPlayerCanMeldTheCard(this.game.GetPlayers(), playPlayer, card);
        if (list.length > 0) {
            this.game.UpdateState(new StateOfTakeMeld(list));
            events.push(new GameTakeMeldEvent(list));
        }
        else {
            events.push(this.game.DrawCard());
        }

        return events;
    }

    public MeldCard(playerId: string) {

        let playPlayer = this.game.GetPlayPlayer();

        if (!playPlayer || playPlayer.Id != playerId) throw "player can't meld card";

        let list = playPlayer.TakeOutCardGroup();

        if (list.length == 0) throw "can't find a card group";

        let events: Array<Event> = [new GamePlayedCardGroupEvnet(playPlayer, list[0])];

        if (playPlayer.Hand.GetSize() == 0) {
            events.push(this.game.GameOver());
        }

        return events;
    }


    private CheckIfAnyPlayerCanMeldTheCard(players: Array<Player>, playPlayer: Player, card: Card): Array<Player> {

        let canMeldCardPlayers: Array<Player> = [];

        let index = players.indexOf(playPlayer) + 1;
        for (let i = 0; i < players.length - 1; i++) {
            let p = players[(index + i) % players.length];
            if (p == playPlayer) continue;
            if (p.CheckMeldCard(card)) {
                canMeldCardPlayers.push(p);
            }
        }

        return canMeldCardPlayers;
    }

}