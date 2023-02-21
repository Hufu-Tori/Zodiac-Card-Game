import Event from "../../Primitives/Event";
import Room from "../Room";

export default class RoomStartedEvent extends Event {
    public readonly room: Room;
    public readonly isStart: boolean;

    constructor(room: Room) {
        super();
        this.room = room;
    }
}