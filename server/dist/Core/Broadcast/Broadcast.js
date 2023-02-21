"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Broadcast {
    constructor() {
        this.subscribers = new Map();
        this.handlerMap = new Map();
    }
    SetEventHandler(handler) {
        this.handlerMap.set(handler.Key, handler);
    }
    Subscribe(id, observer) {
        this.subscribers.set(id, observer);
    }
    RemoveAllSubscribe() {
        if (this.handlerMap.size != 0)
            this.handlerMap = new Map();
    }
    UnSubscribe(id) {
        this.subscribers.delete(id);
    }
    Publish(events) {
        if (!Array.isArray(events))
            events = [events];
        events.forEach(e => {
            const handler = this.handlerMap.get(e.constructor.name);
            handler === null || handler === void 0 ? void 0 : handler.Handle(e, this.subscribers);
        });
    }
}
exports.default = Broadcast;
