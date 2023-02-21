import { _decorator, Component, Node, EditBox, find, Button, EventHandler } from 'cc';
import { Main } from '../Main';
import { RoomController } from './RoomController';
const { ccclass, property } = _decorator;

@ccclass('LoginController')
export class LoginController extends Component {

    private loginLayer: Node;
    private editBox: EditBox;
    private button: Button;
    private main: Main;

    private roomController: RoomController;

    start() {

        let loginLayer = this.loginLayer = find("Canvas/LoginLayer");
        this.editBox = loginLayer.getChildByPath("EditBox").getComponent(EditBox);
        this.button = loginLayer.getChildByPath("Button").getComponent(Button);

        this.button.node.once(Button.EventType.CLICK, () => { this.Guest(); });

        this.main = find("Root").getComponent(Main);

        this.roomController = this.node.getComponent(RoomController);

    }

    private async Guest() {
        if (!this.editBox.string) return;

        try {
            await this.main.Guest(this.editBox.string);
            this.main.Client.ConnectWebSocket();
            this.loginLayer.active = false;
            this.roomController.TurnOn();
        }
        catch {
        }

        this.button.node.once(Button.EventType.CLICK, () => { this.Guest(); });
    }



}


