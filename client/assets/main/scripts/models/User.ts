import Client from "../http/Clinet";

const LoginURL = {
    guest: "http://localhost:8080/guest"
}

export default class User {

    private clinet: Client;
    private name: string;
    private id: string;

    public get Name(): string { return this.name; }
    public get Id(): string { return this.id; }


    constructor(clinet: Client) {
        this.clinet = clinet;
    }

    async Guest(name: string) {
        console.log("guest")
        let data = await this.clinet.Post<{ id: string, name: string }>(LoginURL.guest, { "name": name });
        if (data) {
            this.name = data.name;
            this.id = data.id;
        }
    }

}