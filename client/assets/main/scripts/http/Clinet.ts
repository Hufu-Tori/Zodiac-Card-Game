import IBroadcastObserver, { BroadcastEvent } from "./IBroadcastObserver";

export default class Client {

    private websocket: WebSocket;
    private observers: Map<string, IBroadcastObserver>;

    constructor() {
        this.observers = new Map();
    }

    async ConnectWebSocket() {
        try {
            this.websocket = new WebSocket("ws://localhost:8080/");
            await new Promise((resolve, reject) => {
                this.websocket.onclose = () => {
                    this.websocket = null;
                    console.log("websocket close");
                };

                this.websocket.onopen = () => {
                    console.log("websocket connected");
                    resolve(true);

                };
                this.websocket.onmessage = (message) => {
                    this.Publish(message);
                };
            });
        }
        catch {
            console.log("websocket connect err");
        }
    }

    public Subscribe(observer: IBroadcastObserver) {
        if (!this.observers.has(observer.Key)) this.observers.set(observer.Key, observer);
    }

    public UnSubscribe(observer) {
        this.observers.delete(observer.Key);
    }

    private Publish(message: MessageEvent) {

        console.log(`====== event ======`);
        console.log(message);

        if (typeof message.data == "string") {
            const json: BroadcastEvent = JSON.parse(message.data);
            console.log(json);
            this.observers.get(json.event)?.Notify(json);
        }
    }

    public async Post<T>(url: string, body: Object): Promise<T> {

        try {
            const res = await fetch(
                url, {
                body: JSON.stringify(body),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                mode: "cors"
            });
            return await res.json();
        }
        catch {
            throw Error("resqust error");
        }

    }

}
