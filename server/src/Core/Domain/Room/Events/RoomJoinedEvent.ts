import Event from "../../Primitives/Event";
import Room from "../Room";
import User from "../User";

export default class RoomJoinedEvent extends Event {
    public readonly room: Room;
    public readonly user: User;


    constructor(user: User, room: Room) {
        super();
        this.user = user;
        this.room = room;
    }
}