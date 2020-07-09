type EventEmitterType = {
    once: (
        eventName: string,
        callback: () => void
    ) => void
}

export let WaitEvent = function (
    eventEmitter: EventEmitterType,
    eventName: string
): Promise<void> {

    return new Promise(function (resolve, reject) {
        eventEmitter.once(eventName, function () {
            resolve();
        });
    });
}

export let WaitComplete = function (
    eventEmitter: EventEmitterType
): Promise<void> {

    return WaitEvent(eventEmitter, 'complete');
}