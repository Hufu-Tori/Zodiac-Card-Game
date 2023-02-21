"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventSystem {
    constructor() {
        this.observerMap = new Map();
        this.handlerMap = new Map();
    }
    SetEventHandler(event, handler) {
        if (this.handlerMap.get(event.name))
            return;
        this.handlerMap.set(event.name, handler);
    }
    Subscribe(id, observer) {
        if (this.observerMap.get(id))
            return;
        this.observerMap.set(id, observer);
    }
    UnSubscribe(id) {
        this.observerMap.delete(id);
    }
    Publish(events) {
        if (!Array.isArray(events))
            events = [events];
        events.forEach(e => {
            const handler = this.handlerMap.get(e.constructor.name);
            if (handler)
                handler.Handle(this.observerMap, e);
        });
    }
}
exports.default = EventSystem;
