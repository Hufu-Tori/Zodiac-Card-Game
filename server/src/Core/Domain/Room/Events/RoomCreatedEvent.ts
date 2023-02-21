import Event from "../../Primitives/Event";
import Room from "../Room";

export default class RoomCreatedEvent extends Event {
    public readonly room: Room;

    constructor(room: Room) {
        super();
        this.room = room;
    }
}



