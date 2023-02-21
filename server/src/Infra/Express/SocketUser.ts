import WebSocket from "ws";
import Broadcast from "../../Core/Broadcast/Broadcast";
import IBroadcastObserver from "../../Core/Broadcast/IBroadcastObserver";

export default class SocketUser implements IBroadcastObserver {

    private broadcast: Broadcast;
    private socket: WebSocket;
    private id: string

    public get Id(): string { return this.id; }

    constructor(broadcast: Broadcast, id: string, socket: WebSocket) {
        this.broadcast = broadcast;
        this.id = id;
        this.socket = socket;

        socket.on('error', console.error);

        socket.on('message', function (message) {
            //
            // Here we can now use session parameters.
            //
            console.log(`Received message ${message} from user ${id}`);
        });

        socket.on('close', function () {
            broadcast.UnSubscribe(id);
        });

        broadcast.Subscribe(id, this);
    }

    Notify(message: string): void {
        this.socket.send(message);
    }
}