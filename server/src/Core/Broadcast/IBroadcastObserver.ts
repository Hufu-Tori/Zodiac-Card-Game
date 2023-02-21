export default interface IBroadcastObserver {
    get Id(): string;
    Notify(message: string): void;
}