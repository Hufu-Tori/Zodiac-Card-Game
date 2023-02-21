
export default class User {
    private name: string;
    private id: string;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
    public get Id(): string { return this.id; }
    public get Name(): string { return this.name; }

    SetName(name: string) {
        this.name = name;
    }

}