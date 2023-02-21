import IBroadcastHandler from "../../Core/Broadcast/IBroadcastHandler";
import IBroadcastObserver from "../../Core/Broadcast/IBroadcastObserver";
import RoomJoinedEvent from "../../Core/Domain/Room/Events/RoomJoinedEvent";
import RoomLeavedEvent from "../../Core/Domain/Room/Events/RoomLeavedEvent";
import RoomReadyUpdatedEvent from "../../Core/Domain/Room/Events/RoomReadyUpdatedEvent";

export class RoomJoinedHandler implements IBroadcastHandler {
    get Key(): string {
        return RoomJoinedEvent.name;
    }

    Handle(event: RoomJoinedEvent, subscribers: Map<string, IBroadcastObserver>): void {

        const room = event.room;
        const user = event.user;

        const output = {
            event: this.Key,
            user: {
                id: user.Id,
                name: user.Name,
                readied: user.IsReady
            }
        }

        const json = JSON.stringify(output);

        room.Users.forEach(u => { if (u.Id != user.Id) subscribers.get(u.Id)?.Notify(json); });

    }
}

export class RoomLeavedHandler implements IBroadcastHandler {
    get Key(): string {
        return RoomLeavedEvent.name;
    }
    Handle(event: RoomLeavedEvent, subscribers: Map<string, IBroadcastObserver>): void {

        const room = event.room;
        const user = event.user;

        const output = {
            event: this.Key,
            user: {
                id: user.Id
            },
            disposed: event.disposed
        }

        const json = JSON.stringify(output);
        room.Users.forEach(u => { if (u.Id != user.Id) subscribers.get(u.Id)?.Notify(json); });

    }
}

export class RoomReadyUpdatedHandler implements IBroadcastHandler {
    get Key(): string {
        return RoomReadyUpdatedEvent.name;
    }
    Handle(event: RoomReadyUpdatedEvent, subscribers: Map<string, IBroadcastObserver>): void {

        const room = event.room;
        const user = event.user;

        const output = {
            event: this.Key,
            user: {
                id: user.Id,
                readied: user.IsReady
            }
        }

        const json = JSON.stringify(output);
        room.Users.forEach(u => subscribers.get(u.Id)?.Notify(json));

    }
}