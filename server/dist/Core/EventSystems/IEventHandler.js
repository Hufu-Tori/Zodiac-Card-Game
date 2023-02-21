"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventHandler {
    constructor(next) {
        this.next = next;
    }
    Handle(event) {
        if (this.Compare(event)) {
            return this.HandleEvent(event);
        }
        else if (this.next) {
            this.next.Handle(event);
        }
    }
}
exports.default = EventHandler;
