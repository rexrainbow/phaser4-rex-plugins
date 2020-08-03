export function GetEventEmitter(object: any): any {

    // BaseEventEmitter: '../eventemitter/BaseEmitter.ts'
    const eventEmitter = object.eventEmitter ?? object;
    return (eventEmitter.events) ? eventEmitter : null;
}