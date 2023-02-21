"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AggregateRoot {
    constructor(id) {
        this.id = id;
    }
    get Id() { return this.id; }
}
exports.default = AggregateRoot;
