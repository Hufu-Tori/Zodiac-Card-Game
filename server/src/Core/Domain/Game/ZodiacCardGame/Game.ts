import Event from "../../Primitives/Event";
import GameDrawnCardEvent from "../Events/GameDrawnCardEvent";
import GameOverEvent from "../Events/GameOverEvent";
import Card from "./Card";
import CardGroup from "./CardGroup";
import ICardGroupStrategy from "./CardGroupStrategy/ICardGroupStrategy";
import Deck from "./Deck";
import GameState from "./GameState/GameState";
import StateOfPlayCard from "./GameState/StateOfPlayCard";
import Player from "./Player";

export default abstract class Game {

    public static readonly min: number = 3;
    public static readonly max: number = 4;

    private id: string;

    private strategys: Array<ICardGroupStrategy>;

    private players: Array<Player>;
    private state: GameState;
    private deck: Deck;
    private playPlayer: Player;
    private playCard: Card | null;

    protected abstract handSize: number;

    constructor(id: string, players: Array<Player>, strategys: Array<ICardGroupStrategy>, deck: Deck, state: GameState) {
        this.id = id;
        this.strategys = strategys;
        this.players = players;
        this.state = state;
        this.deck = deck;
    }


    public get Id(): string { return this.id; }

    public GetStrategys(): Array<ICardGroupStrategy> { return this.strategys; }
    public GetPlayers(): Array<Player> { return this.players; }
    public GetDeck(): Deck { return this.deck; }
    public GetPlayerCount(): number { return this.players.length; }
    public GetPlayPlayer(): Player { return this.playPlayer; }
    public GetPlayCard(): Card | null { return this.playCard; }


    public Start(): Array<Event> {
        return this.state.Start();
    }

    public PlayCard(playerId: string, cardId: number): Array<Event> {
        return this.state.PlayCard(playerId, cardId);
    }

    public MeldCard(playerId: string, isMeld: boolean): Array<Event> {
        return this.state.MeldCard(playerId, isMeld);
    }

    public DrawCard(): Event {
        if (this.GetDeck().GetCount() > 0) {
            let nextPlayer = this.GetNextPlayer();
            let drawCard = this.GetDeck().DrawCard() as Card;
            nextPlayer.Hand.AddCard(drawCard);
            this.SetPlayPlayer(nextPlayer);
            this.UpdateState(new StateOfPlayCard());
            return new GameDrawnCardEvent(nextPlayer, drawCard);
        }
        else {
            return this.GameOver();
        }
    }

    public GameOver(winner: Player | null = null): Event {
        this.UpdateState(new GameState());
        return new GameOverEvent(winner);
    }

    public UpdateState(state: GameState) {
        this.state = state;
        state.SetGame(this);
    }

    public Deal() {
        for (let i = 0; i < this.handSize - 1; i++) {
            for (let j = 0; j < this.players.length; j++) {
                this.players[j].Hand.AddCard(this.deck.DrawCard() as Card);
            }
        }
        this.playPlayer.Hand.AddCard(this.deck.DrawCard() as Card);
    }

    public SetPlayPlayer(player: Player) {
        this.playPlayer = player;
        this.playCard = null;
    }

    public SetPlayCard(card: Card) {
        this.playCard = card;
    }

    public GetPlayerIndex(player: Player) {
        return this.players.indexOf(player);
    }

    public GetPlayerByIndex(index: number) {
        return this.players[index];
    }

    public GetPlayerById(playerId: string) {
        return this.players.find(p => p.Id == playerId);
    }

    public GetNextPlayer(): Player {
        return (this.GetPlayerByIndex((this.GetPlayerIndex(this.playPlayer) + 1) % this.players.length));
    }

};