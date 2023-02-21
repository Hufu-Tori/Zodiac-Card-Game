import Card from "./ZodiacCardGame/Card";
import StrategyOfPair from "./ZodiacCardGame/CardGroupStrategy/StrategyOfPair";
import Deck from "./ZodiacCardGame/Deck";
import Game from "./ZodiacCardGame/Game";
import StateOfStartGame from "./ZodiacCardGame/GameState/StateOfStartGame";
import Player from "./ZodiacCardGame/Player";
import Zodiac from "./ZodiacCardGame/Zodiac";

export default class ZodiacCardGame extends Game {

    protected handSize: number = 10;

    constructor(id: string, players: Array<Player>) {

        let cards = [];
        for (let i = Zodiac.Rat; i <= Zodiac.Pig; i++) {
            for (let j = 0; i < 10; j++) {
                cards.push(new Card(i));
            }
        }
        let strategy = new StrategyOfPair();
        players.forEach(p => p.SetStrategy(strategy));

        super(id, players, [], new Deck(cards), new StateOfStartGame());

    }

}