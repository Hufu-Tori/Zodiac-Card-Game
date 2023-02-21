import Event from "../Domain/Primitives/Event";
import IBroadcastObserver from "./IBroadcastObserver";
import IBroadcastHandler from "./IBroadcastHandler";

export default class Broadcast {


    private subscribers: Map<string, IBroadcastObserver>;
    private handlerMap: Map<string, IBroadcastHandler>

    constructor() {
        this.subscribers = new Map();
        this.handlerMap = new Map();
    }

    public SetEventHandler(handler: IBroadcastHandler) {
        this.handlerMap.set(handler.Key, handler);
    }

    public Subscribe(id: string, observer: IBroadcastObserver) {
        this.subscribers.set(id, observer);
    }

    public RemoveAllSubscribe() {
        if (this.handlerMap.size != 0) this.handlerMap = new Map();
    }

    public UnSubscribe(id: string) {
        this.subscribers.delete(id);
    }

    public Publish(events: Event | Event[]) {
        if (!Array.isArray(events)) events = [events];

        events.forEach(e => {
            const handler = this.handlerMap.get(e.constructor.name);
            handler?.Handle(e, this.subscribers);
        })
    }


}