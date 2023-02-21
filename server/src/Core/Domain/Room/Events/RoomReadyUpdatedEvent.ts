import Event from "../../Primitives/Event";
import Room from "../Room";
import User from "../User";

export default class RoomReadyUpdatedEvent extends Event {

    public readonly room: Room;
    public readonly user: User;

    constructor(room: Room, user: User) {
        super();
        this.room = room;
        this.user = user;
    }
}