export class EventInstance {
    callback: Function;
    context: unknown;
    once: boolean;

    constructor(callback: Function, context: unknown, once: boolean = false) {
        this.callback = callback;
        this.context = context;
        this.once = once;
    }
}
