import Event from "../../Primitives/Event";
import Room from "../Room";
import User from "../User";

export default class RoomLeavedEvent extends Event {
    public readonly room: Room;
    public readonly user: User;
    public readonly disposed: boolean;


    constructor(user: User, room: Room, disposed: boolean = false) {
        super();
        this.user = user;
        this.room = room;
        this.disposed = disposed;
    }
}