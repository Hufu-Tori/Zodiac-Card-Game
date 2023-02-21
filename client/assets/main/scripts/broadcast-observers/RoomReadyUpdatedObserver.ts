import { RoomController } from "../controllers/RoomController";
import IBroadcastObserver from "../http/IBroadcastObserver";

export default class RoomReadyUpdatedObserver implements IBroadcastObserver {

    private controller: RoomController;

    constructor(controller: RoomController) {
        this.controller = controller;
    }

    get Key(): string { return "RoomReadyUpdatedEvent" };

    Notify(event): void {
        this.controller.ReadyUpdatedBroadcast(event);
    }

}