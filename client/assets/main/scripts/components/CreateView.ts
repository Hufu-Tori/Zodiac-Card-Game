import { _decorator, Node, Button, find } from 'cc';

export class CreateView {

    private node: Node;
    private buttonCreate: Button;
    private buttonJoin: Button;


    public get CreateButton(): Button { return this.buttonCreate; }
    public get JoinButton(): Button { return this.buttonJoin; }


    constructor() {
        const node = this.node = find("Canvas/RoomLayer/CreateView");
        this.buttonCreate = node.getChildByPath("ButtonCreate").getComponent(Button);
        this.buttonJoin = node.getChildByPath("ButtonJoin").getComponent(Button);
    }

    public SetVisible(bool: boolean) {
        this.node.active = bool;
    }


}


