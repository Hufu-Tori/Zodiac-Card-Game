"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    get Id() { return this.id; }
    get Name() { return this.name; }
    SetName(name) {
        this.name = name;
    }
}
exports.default = User;
