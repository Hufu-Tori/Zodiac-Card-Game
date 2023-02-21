export default class User {

    private id: string;
    private name: string;
    private ready: boolean;

    constructor(id: string, name: string) {
        this.ready = false;
        this.id = id;
        this.name = name;
    }

    public get Id(): string { return this.id; }

    public get Name(): string { return this.name; }

    public get IsReady(): boolean { return this.ready; }

    public Ready(): boolean {
        this.ready = !this.ready;
        return this.ready;
    }
}