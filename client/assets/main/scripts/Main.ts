import { _decorator, Component, Node, director } from 'cc';
import Client from './http/Clinet';
import User from './models/User';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    private client: Client = new Client();
    private user: User;


    public get Client(): Client { return this.client; }
    public get User(): User { return this.user; }
    public get UserId(): string { return this.user?.Id; }


    start() {
        this.user = new User(this.client);
        director.addPersistRootNode(this.node);
    }

    update(deltaTime: number) {

    }

    async Guest(name: string) {
        await this.user.Guest(name);
    }

}


