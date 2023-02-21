"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventHandler {
    constructor(next) {
        this.next = next;
    }
    Handle(map, event) {
        if (this.Compare(event)) {
            return this.Publish(map, event);
        }
        else if (this.next) {
            this.next.Handle(map, event);
        }
    }
}
exports.default = EventHandler;
