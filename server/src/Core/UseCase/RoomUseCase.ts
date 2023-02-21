import Broadcast from "../Broadcast/Broadcast";
import Event from "../Domain/Primitives/Event";
import RoomLeavedEvent from "../Domain/Room/Events/RoomLeavedEvent";
import IGameRepository from "../Repositories/IGameRepository";
import IRoomRepository from "../Repositories/IRoomRepository";
import IUserRepository from "../Repositories/IUserRepository";

export default class RoomUseCase {

    private userRepo: IUserRepository;
    private roomRepo: IRoomRepository;
    private gameRepo: IGameRepository;

    private broadcast: Broadcast;

    constructor(userRepo: IUserRepository, roomRepo: IRoomRepository, gameRepo: IGameRepository, broadcast: Broadcast) {
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
        this.gameRepo = gameRepo;
        this.broadcast = broadcast;
    }

    async Create(userId: string, presenter: IRoomPresenter): Promise<void> {

        const user = await this.userRepo.FindUserById(userId);
        if (!user) {
            throw "not find user";
        }

        const event = await this.roomRepo.Create(user.Id, user.Name);

        presenter.Success(event);
        return;
    }

    async Join(input: RoomInput, presenter: IRoomPresenter): Promise<void> {

        const user = await this.userRepo.FindUserById(input.userId);
        if (!user) {
            throw "not find user";
        }

        const room = await this.roomRepo.FindById(input.roomId);
        if (!room) {
            throw "not find room";
        }

        let event = room.Join(user.Id, user.Name);
        this.broadcast.Publish(event);
        presenter.Success(event);

        await this.roomRepo.Save(room);

        return;
    }

    async Leave(input: RoomInput, presenter: IRoomPresenter): Promise<void> {

        const room = await this.roomRepo.FindById(input.roomId);
        if (!room) throw "not find room";


        let event: RoomLeavedEvent = room.Leave(input.userId) as RoomLeavedEvent;
        this.broadcast.Publish(event);
        presenter.Success(event);

        if (event.disposed) {
            await this.roomRepo.Delete(room);
        }
        else {
            await this.roomRepo.Save(room);
        }

        return;
    }

    async Ready(input: RoomInput, presenter: IRoomPresenter): Promise<void> {

        const room = await this.roomRepo.FindById(input.roomId);
        if (!room) throw "not find room";

        let event = room.Ready(input.userId);
        this.broadcast.Publish(event);
        presenter.Success(event);

        await this.roomRepo.Save(room);

        return;
    }

    async Start(input: RoomInput, presenter: IRoomPresenter): Promise<void> {

        const room = await this.roomRepo.FindById(input.roomId);
        if (!room) throw "not find room";

        let events = [];
        let roomEvent = room.Start(input.userId);
        events.push(roomEvent);
        presenter.Success(roomEvent);

        let game = await this.gameRepo.Create(room);
        let gameEvents = game.Start();

        events.push(...gameEvents);
        this.broadcast.Publish(events);

        await this.roomRepo.Save(room);
        return;
    }

}

export type RoomInput = { userId: string, roomId: string };

export interface IRoomPresenter {
    Success(event: Event): void;
}
