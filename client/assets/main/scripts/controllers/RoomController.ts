import { _decorator, Component, Node, Button, find, EventHandler, Prefab, instantiate } from 'cc';
import RoomJoinedObserver from '../broadcast-observers/RoomJoinedObserver';
import RoomLeavedObserver from '../broadcast-observers/RoomLeavedObserver';
import RoomReadyUpdatedObserver from '../broadcast-observers/RoomReadyUpdatedObserver';
import { CreateView } from '../components/CreateView';
import { JoinView } from '../components/JoinView';
import { RoomView } from '../components/RoomView';
import { UserComponent } from '../components/UserComponent';
import { Main } from '../Main';
import Room from '../models/Room';


type RoomJoinedEvent = {
    event: string,
    user: {
        id: string,
        name: string,
        readied: boolean
    }
}

type RoomReadyUpdatedEvent = {
    event: string,
    user: {
        id: string,
        readied: boolean
    }
}

type RoomLeavedEvent = {
    event: string,
    user: {
        id: string
    }
    disposed: boolean
}


const { ccclass, property } = _decorator;

@ccclass('RoomController')
export class RoomController extends Component {

    @property(Prefab)
    private userPrefab: Prefab;

    private roomLayer: Node;
    private createView: CreateView;
    private joinView: JoinView;
    private roomView: RoomView;


    private main: Main;
    private room: Room;


    private joinedEvent: RoomJoinedObserver;
    private readyUpdatedEvent: RoomReadyUpdatedObserver;
    private roomLeavedEvent: RoomLeavedObserver;

    start() {

        this.roomLayer = find("Canvas/RoomLayer");

        this.createView = new CreateView();
        this.joinView = new JoinView();
        this.roomView = new RoomView(this.userPrefab);
        this.main = find("Root").getComponent(Main);

        this.joinedEvent = new RoomJoinedObserver(this);
        this.readyUpdatedEvent = new RoomReadyUpdatedObserver(this);
        this.roomLeavedEvent = new RoomLeavedObserver(this);

        this.createView.CreateButton.node.once(Button.EventType.CLICK, () => { this.Create(); });
        this.createView.JoinButton.node.once(Button.EventType.CLICK, () => { this.TurnOnJoinView(); });

        this.joinView.JoinButton.node.once(Button.EventType.CLICK, () => { this.Join(); });
        this.joinView.BackButton.node.on(Button.EventType.CLICK, () => { this.TurnOn(); });

        this.roomView.BackButton.node.once(Button.EventType.CLICK, () => { this.Leave(); });
        this.roomView.ReadyButton.node.once(Button.EventType.CLICK, () => { this.Ready(); });

    }


    private SubscribeEvent(main: Main) {
        const client = main.Client;
        client.Subscribe(this.joinedEvent);
        client.Subscribe(this.readyUpdatedEvent);
        client.Subscribe(this.roomLeavedEvent);
    }

    private UnSubscribeEvent(main: Main) {
        const client = main.Client;
        client.UnSubscribe(this.joinedEvent);
        client.UnSubscribe(this.readyUpdatedEvent);
        client.UnSubscribe(this.roomLeavedEvent);
    }

    public TurnOn() {
        this.roomLayer.active = true;
        this.createView.SetVisible(true);
        this.joinView.SetVisible(false);
        this.roomView.SetVisible(false);
    }

    public TurnOff() {
        this.roomLayer.active = false;
    }

    private async Create() {

        try {
            const room = this.room = new Room(this.main.Client);
            await room.Create(this.main.UserId);
            this.SubscribeEvent(this.main);

            this.createView.SetVisible(false);
            this.roomView.SetVisible(true);
            this.roomView.SetId(room.Id);
            this.roomView.OwnerMode(true);

            room.Users.forEach((u, i) => {
                this.roomView.AddUser(u.name, i == 0 ? false : u.readied);
            });


        } catch (error) {
            this.room = null;
            console.log(error);
        }

        this.createView.CreateButton.node.once(Button.EventType.CLICK, () => { this.Create(); });
    }

    private TurnOnJoinView() {
        this.createView.SetVisible(false);
        this.joinView.SetVisible(true);
        this.createView.JoinButton.node.once(Button.EventType.CLICK, () => { this.TurnOnJoinView(); });
    }


    public JoinBroadcast(event: RoomJoinedEvent) {
        const user = event.user;
        this.room.Users.push(user);
        this.roomView.AddUser(user.name, user.readied);
    }

    public ReadyUpdatedBroadcast(event: RoomReadyUpdatedEvent) {
        const user = event.user;
        this.room.Users.findIndex((u, i) => {
            if (u.id == user.id) {
                u.readied = user.readied;
                this.roomView.SetReady(i, user.readied);
                return;
            }
        });
    }
    public LeavedBroadcast(event: RoomLeavedEvent) {

        if (event.disposed) {
            this.room = null;
            this.roomView.Clear();
            this.TurnOn();
            return;
        }

        const user = event.user;
        this.room.Users.findIndex((u, i) => {
            if (u.id == user.id) {
                this.roomView.RemoveUser(i);
                return;
            }
        });
    }

    private async Join() {

        try {
            const roomId: string = this.joinView.EditBox.string;
            if (this.room || !roomId || roomId.length !== 6) return;
            const room = this.room = new Room(this.main.Client);
            await room.Join(this.main.UserId, roomId);
            this.SubscribeEvent(this.main);

            this.joinView.SetVisible(false);
            this.roomView.SetVisible(true);
            this.roomView.SetId(room.Id);
            this.roomView.OwnerMode(false);

            room.Users.forEach((u, i) => {
                this.roomView.AddUser(u.name, i == 0 ? false : u.readied);
            });
        }
        catch (error) {
            this.room = null;
            console.log(error);
        }

        this.joinView.JoinButton.node.once(Button.EventType.CLICK, () => { this.Join(); });
    }

    private async Ready() {
        if (!this.room) return;
        try {
            await this.room.Ready(this.main.UserId, this.room.Id);
            this.roomView.ReadyButton.node.once(Button.EventType.CLICK, () => { this.Ready(); });
        } catch (error) {
            console.log(error);
        }
    }

    private async Leave() {
        if (!this.room) return;
        try {
            await this.room.Leave(this.main.UserId, this.room.Id);
            this.UnSubscribeEvent(this.main);
            this.roomView.BackButton.node.once(Button.EventType.CLICK, () => { this.Leave(); });
            this.room = null;
            this.roomView.Clear();
            this.TurnOn();
        } catch (error) {
            console.log(error);
        }
    }

}


