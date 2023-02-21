import { _decorator, Node, Button, find, EditBox } from 'cc';

export class JoinView {

    private node: Node;
    private editBox: EditBox;
    private buttonJoin: Button;
    private buttonBack: Button;

    constructor() {
        const node = this.node = find("Canvas/RoomLayer/JoinView");
        this.editBox = node.getChildByName("EditBox").getComponent(EditBox);
        this.buttonJoin = node.getChildByName("ButtonJoin").getComponent(Button);
        this.buttonBack = node.getChildByName("ButtonBack").getComponent(Button);
    }

    public get JoinButton(): Button { return this.buttonJoin; }
    public get BackButton(): Button { return this.buttonBack; }
    public get EditBox(): EditBox { return this.editBox; }

    public SetVisible(bool: boolean) {
        this.node.active = bool;
    }

}


