import Game from "../Domain/Game/ZodiacCardGame/Game";
import Room from "../Domain/Room/Room";


export default interface IGameRepository {

    Create(room: Room): Game;
}