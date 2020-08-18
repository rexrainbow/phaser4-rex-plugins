export interface IEventInstance {
    callback: Function;
    context: unknown;
    once: boolean;
}
