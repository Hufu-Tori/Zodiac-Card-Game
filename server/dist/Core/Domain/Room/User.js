"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name) {
        this.ready = false;
        this.id = id;
        this.name = name;
    }
    get Id() { return this.id; }
    get Name() { return this.name; }
    get IsReady() { return this.ready; }
    Ready() {
        this.ready = !this.ready;
        return this.ready;
    }
}
exports.default = User;
