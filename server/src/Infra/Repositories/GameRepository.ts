import Game from "../../Core/Domain/Game/ZodiacCardGame/Game";
import Room from "../../Core/Domain/Room/Room";
import IGameRepository from "../../Core/Repositories/IGameRepository";

export default class GameRepository implements IGameRepository {

    Create(room: Room): Game | any {
        return undefined;
    }
}