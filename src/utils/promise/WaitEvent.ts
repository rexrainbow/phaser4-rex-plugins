type EventEmitterType = {
    once: (
        eventName: string,
        callback: () => void
    ) => void
}

export function WaitEvent(
    eventEmitter: EventEmitterType,
    eventName: string
): Promise<void> {

    return new Promise(function (resolve, reject) {
        eventEmitter.once(eventName, function () {
            resolve();
        });
    });
}

export function WaitComplete(
    eventEmitter: EventEmitterType
): Promise<void> {

    return WaitEvent(eventEmitter, 'complete');
}