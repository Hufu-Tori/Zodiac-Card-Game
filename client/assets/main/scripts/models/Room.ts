import Client from "../http/Clinet";

const RoomURL = {
    create: "http://localhost:8080/rooms"
}

type User = {
    name: string;
    id: string;
    readied: boolean;
}

export default class Room {

    private clinet: Client;
    private id: string;

    private users: Array<User>;

    public get Id(): string { return this.id; }
    public get Owner(): User { return this.users[0]; }
    public get Users(): Array<User> { return this.users; }

    constructor(clinet: Client) {
        this.clinet = clinet;
    }

    async Create(id: string) {
        let data = await this.clinet.Post<Room>(RoomURL.create, { id: id });
        if (data) {
            this.id = data.id;
            this.users = data.users;
        }
        return this;
    }

    async Join(id: string, roomId: string) {
        let data = await this.clinet.Post<Room>(`${RoomURL.create}/${roomId}/join`, { id: id });
        if (data) {
            this.id = data.id;
            this.users = data.users;
        }
        return this;
    }

    async Ready(id: string, roomId: string) {
        await this.clinet.Post<{ readied: boolean }>(`${RoomURL.create}/${roomId}/ready`, { id: id });
    }

    async Leave(id: string, roomId: string) {
        await this.clinet.Post<{ leaved: boolean }>(`${RoomURL.create}/${roomId}/leave`, { id: id });
    }

}