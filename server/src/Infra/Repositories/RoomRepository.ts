import { customAlphabet } from "nanoid";
import Event from "../../Core/Domain/Primitives/Event";
import Room from "../../Core/Domain/Room/Room";
import User from "../../Core/Domain/Room/User";
import IRoomRepository from "../../Core/Repositories/IRoomRepository";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export default class RoomRepository implements IRoomRepository {

    private roomMap: Map<string, Room>;

    constructor() {
        this.roomMap = new Map();
    }

    FindById(roomId: string): Room | undefined {
        return this.roomMap.get(roomId);
    }

    Create(userId: string, name: string): Event {
        const event = Room.Create(nanoid(), new User(userId, name), 3, 4);
        const room = event.room;
        this.roomMap.set(room.Id, room);
        return event;
    }

    Save(room: Room): void {

    }

    Delete(room: Room): void {
        this.roomMap.delete(room.Id);
    }
}