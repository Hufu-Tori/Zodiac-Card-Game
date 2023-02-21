import Event from "../Domain/Primitives/Event";
import IBroadcastObserver from "./IBroadcastObserver";

export default interface IBroadcastHandler {
    get Key(): string;
    Handle(event: Event, subscribers: Map<string, IBroadcastObserver>): void;
}
