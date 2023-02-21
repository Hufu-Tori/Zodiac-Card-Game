export default class Event {
    public readonly createTime: number;
    constructor() {
        this.createTime = Date.now();
    }
}