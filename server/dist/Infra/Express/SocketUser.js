"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketUser {
    get Id() { return this.id; }
    constructor(broadcast, id, socket) {
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
    Notify(message) {
        this.socket.send(message);
    }
}
exports.default = SocketUser;
