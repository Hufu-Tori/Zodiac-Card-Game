import { WebSocketServer } from "ws";
import express from "express";
import { Server } from "http";
import SocketUser from "./SocketUser";
import Broadcast from "../../Core/Broadcast/Broadcast";

export default class SocketManager {
    private wss: WebSocketServer;
    private broadcast: Broadcast;

    constructor(server: Server, sessionParser: express.RequestHandler, broadcast: Broadcast) {

        const wss = this.wss = new WebSocketServer({ noServer: true });
        this.broadcast = broadcast;

        server.on('upgrade', function (request: any, socket, head) {

            const errorFun = (err: any) => { console.error(err); };

            socket.on('error', errorFun);
            console.log('Parsing session from request...');
            sessionParser(request, {} as any, () => {
                if (!request.session.user) {
                    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                    socket.destroy();
                    return;
                }

                console.log('Session is parsed!');

                socket.removeListener('error', errorFun);

                wss.handleUpgrade(request, socket, head, function (ws) {
                    wss.emit('connection', ws, request);
                });
            });
        });

        const manager = this;

        wss.on('connection', function (ws, request: any) {
            sessionParser(request, {} as any, () => { })
            // const sessionID = request.session.id;
            console.log(`ws ${request.session.user.id}`)
            if (!request.session) return;
            const userId = request.session.user.id;
            new SocketUser(broadcast, userId, ws)
        });

        wss.on("close", () => {
            broadcast.RemoveAllSubscribe();
        });

    }

}
