import IBroadcastObserver from "../http/IBroadcastObserver";
import { RoomController } from "../controllers/RoomController";

export default class RoomLeavedObserver implements IBroadcastObserver {

    private controller: RoomController;

    constructor(controller: RoomController) {
        this.controller = controller;
    }

    get Key(): string { return "RoomLeavedEvent" };

    Notify(event): void {
        this.controller.LeavedBroadcast(event);
    }

}