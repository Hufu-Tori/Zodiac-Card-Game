import Event from "../Primitives/Event";
import RoomStartedEvent from "./Events/RoomStartedEvent";
import User from "./User";
import RoomCreatedEvent from "./Events/RoomCreatedEvent";
import RoomJoinedEvent from "./Events/RoomJoinedEvent";
import RoomLeavedEvent from "./Events/RoomLeavedEvent";
import RoomReadyUpdatedEvent from "./Events/RoomReadyUpdatedEvent";


export default class Room {

    private users: Array<User>;
    private max: number;
    private min: number;
    private id: string;

    private lock: boolean;

    constructor(id: string, owner: User, min: number, max: number) {
        this.id = id;
        this.users = [owner];
        this.min = min;
        this.max = max;
    }

    static Create(id: string, owner: User, min: number, max: number) {
        const room = new Room(id, owner, min, max);
        return new RoomCreatedEvent(room);
    }

    public get Id(): string { return this.id; }

    public get Owner(): User { return this.users[0]; }
    public get Users(): Array<User> { return this.users; }

    public Join(userId: string, name: string): Event {

        if (this.IsStart()) throw "game is start user don't have permission";

        let users = this.users;
        if (users.length >= this.max) throw "exceeded the maximum number of users";
        if (users.some((p) => p.Id == userId)) throw "user already exists";
        const user = new User(userId, name);
        users.push(user);

        return new RoomJoinedEvent(user, this);
    }

    public Leave(userId: string): Event {

        if (this.IsStart()) throw "game is start user don't have permission";

        let users = this.users;
        let index = users.findIndex((p) => p.Id == userId);
        if (index < 0) throw "can't find user of this id";
        let user = users.splice(index, 1)[0];
        return new RoomLeavedEvent(user, this, index === 0);
    }

    public Ready(userId: string): Event {

        if (this.IsStart()) throw "game is start user don't have permission";

        let user = this.users.find((u, index) => index > 0 && u.Id == userId);
        if (!user) throw "can't find user of this id";
        user.Ready();
        return new RoomReadyUpdatedEvent(this, user);
    }

    public Start(userId: string): Event {

        if (this.IsStart()) throw "game is start user don't have permission";

        if (userId != this.Owner.Id) throw "user has no permission";
        if (!this.users.every(u => u.IsReady)) throw "has user don't ready";
        if ((this.users.length + 1) < this.min) throw "not enough users";

        return new RoomStartedEvent(this);
    }

    public IsStart() {
        return this.lock;
    }

}