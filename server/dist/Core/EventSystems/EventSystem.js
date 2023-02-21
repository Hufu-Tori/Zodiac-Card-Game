"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventSystem {
    constructor(handler) {
        this.map = new Map();
        this.handler = handler;
    }
    Subscribe(id, observer) {
        if (this.map.get(id))
            return;
        this.map.set(id, observer);
    }
    UnSubscribe(id) {
        this.map.delete(id);
    }
    Publish(events) {
        if (!Array.isArray(events))
            events = [events];
        events.forEach(e => {
            this.handler.Handle(this.map, e);
        });
    }
}
exports.default = EventSystem;
