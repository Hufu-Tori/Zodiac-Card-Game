import { _decorator, Component, Node, Label, Button, find, Prefab, instantiate } from 'cc';
import { UserComponent } from './UserComponent';

export class RoomView {

    private node: Node;
    private group: Node;

    private info: Label;

    private buttonReady: Button;
    private buttonStart: Button;
    private buttonBack: Button;

    private users: UserComponent[];
    private userPool: UserComponent[];

    private userPrefab: Prefab;

    constructor(userPrefab: Prefab) {
        this.userPrefab = userPrefab;
        const node = this.node = find("Canvas/RoomLayer/RoomView");
        this.buttonReady = node.getChildByName("ButtonReady").getComponent(Button);
        this.buttonBack = node.getChildByName("ButtonBack").getComponent(Button);
        this.buttonStart = node.getChildByName("ButtonStart").getComponent(Button);
        this.info = node.getChildByName("RoomInfo").getComponent(Label);
        this.group = node.getChildByName("Group");
        this.users = [];
        this.userPool = [];
    }

    public get ReadyButton(): Button { return this.buttonReady; }
    public get StartButton(): Button { return this.buttonStart; }
    public get BackButton(): Button { return this.buttonBack; }

    public SetVisible(bool: boolean) {
        this.node.active = bool;
    }

    public AddUser(name: string, readied: boolean) {
        const user = this.GenerateUser();
        user.SetName(name);
        user.SetReady(readied);
        this.users.push(user);

        this.group.insertChild(user.node, this.users.length);
    }

    public SetId(id: string) {
        this.info.string = `ID : ${id}`;
    }

    public OwnerMode(b: boolean) {
        this.buttonReady.node.active = !b;
        this.buttonStart.node.active = b;
    }

    public SetReady(index: number, readied: boolean) {
        this.users[index].SetReady(readied);
    }

    public RemoveUser(index: number) {
        const user = this.users.splice(index)[0];
        if (user) {
            user.node.parent = null;
            this.userPool.push(user);
        }
    }

    public Clear() {
        this.users.forEach(u => {
            this.userPool.push(u);
            u.node.parent = null;
        });
        this.users = [];
    }

    private GenerateUser() {
        return this.userPool.length > 0 ? this.userPool.pop() : instantiate(this.userPrefab).getComponent(UserComponent);
    }

}


