import { _decorator, Component, Node, Label, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UserComponent')
export class UserComponent extends Component {

    @property(Label)
    private label: Label;
    @property(Node)
    private icon: Node;

    public SetReady(bool: boolean) {
        this.icon.active = bool;
    }

    public SetName(name: string) {
        this.label.string = name;
    }

}


