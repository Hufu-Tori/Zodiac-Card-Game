
export type BroadcastEvent = {
    event: string
}



export default interface IBroadcastObserver {
    get Key(): string;
    Notify(event: BroadcastEvent): void;
}