import Event from "../Domain/Primitives/Event";
import Room from "../Domain/Room/Room";


export default interface IRoomRepository {
    FindById(roomId: string): Room | undefined;
    Create(userId: string, name: string): Event;
    Save(room: Room): void;
    Delete(room: Room): void;
}