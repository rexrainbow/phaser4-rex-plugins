type EventEmitterType = {
    once: (
        eventName: string,
        callback: () => void
    ) => void
}

export let WaitEvent = function (
    eventEmitter: EventEmitterType,
    eventName: string
): Promise<undefined> {

    return new Promise(function (resolve, reject) {
        eventEmitter.once(eventName, function () {
            resolve();
        });
    });
}

export let WaitComplete = function (
    eventEmitter: EventEmitterType
): Promise<undefined> {

    return WaitEvent(eventEmitter, 'complete');
}