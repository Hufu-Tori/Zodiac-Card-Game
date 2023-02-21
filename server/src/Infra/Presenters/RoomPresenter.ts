import RoomCreatedEvent from "../../Core/Domain/Room/Events/RoomCreatedEvent";
import RoomJoinedEvent from "../../Core/Domain/Room/Events/RoomJoinedEvent";
import RoomLeavedEvent from "../../Core/Domain/Room/Events/RoomLeavedEvent";
import RoomReadyUpdatedEvent from "../../Core/Domain/Room/Events/RoomReadyUpdatedEvent";
import RoomStartedEvent from "../../Core/Domain/Room/Events/RoomStartedEvent";
import Room from "../../Core/Domain/Room/Room";
import { IRoomPresenter } from "../../Core/UseCase/RoomUseCase";


type User = {
    id: string,
    name: string,
    readied: boolean
}

export class CreatedPresenter implements IRoomPresenter {

    private output: {
        id: string,
        users: Array<User>
    };

    private error: string;

    Success(event: RoomCreatedEvent) {
        let room: Room = event.room;
        this.output = {
            id: room.Id,
            users: room.Users.map(u => {
                return {
                    id: u.Id,
                    name: u.Name,
                    readied: u.IsReady
                };
            })
        };
    }

    Fail(error: string) {
        this.error = error;
    }

    GetError() {
        return this.error;
    }

    GetOutput() {
        return this.output;
    }
}

export class JoinedPresenter implements IRoomPresenter {

    private output: {
        id: string,
        users: Array<User>
    };

    private error: string;

    Success(event: RoomJoinedEvent) {
        let room: Room = event.room;

        this.output = {
            id: room.Id,
            users: room.Users.map(u => {
                return {
                    id: u.Id,
                    name: u.Name,
                    readied: u.IsReady
                };
            })
        };
    }

    Fail(error: string) {
        this.error = error;
    }

    GetError() {
        return this.error;
    }

    GetOutput() {
        return this.output;
    }
}


export class RoomReadyUpdatedPresenter implements IRoomPresenter {

    private output: {
        readied: boolean;
    };

    private error: string;

    Success(event: RoomReadyUpdatedEvent) {
        this.output = {
            readied: event.user.IsReady,
        };
    }

    Fail(error: string) {
        this.error = error;
    }

    GetError() {
        return this.error;
    }

    GetOutput() {
        return this.output;
    }
}

export class RoomLeavedPresenter implements IRoomPresenter {

    private output: {
        leaved: boolean;
    };

    private error: string;

    Success(event: RoomLeavedEvent) {
        this.output = {
            leaved: true,
        };
    }

    Fail(error: string) {
        this.error = error;
    }

    GetError() {
        return this.error;
    }

    GetOutput() {
        return this.output;
    }
}

export class RoomGameStartedPresenter implements IRoomPresenter {

    private output: {
        started: boolean;
    };

    private error: string;

    Success(event: RoomStartedEvent) {
        this.output = {
            started: true,
        };
    }

    Fail(error: string) {
        this.error = error;
    }

    GetError() {
        return this.error;
    }

    GetOutput() {
        return this.output;
    }
}