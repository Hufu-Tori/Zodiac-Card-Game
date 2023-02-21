import IBroadcastObserver from "../http/IBroadcastObserver";
import { RoomController } from "../controllers/RoomController";

export default class RoomJoinedObserver implements IBroadcastObserver {

    private controller: RoomController;

    constructor(controller: RoomController) {
        this.controller = controller;
    }

    get Key(): string { return "RoomJoinedEvent" };

    Notify(event): void {
        this.controller.JoinBroadcast(event);
    }

}