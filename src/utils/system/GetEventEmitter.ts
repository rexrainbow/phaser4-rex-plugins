export function GetEventEmitter(object: any): any {

    if (object?.eventEmitter) { // BaseEventEmitter: '../eventemitter/BaseEmitter.ts'
        object = object.eventEmitter;
    }

    if (object?.events) {
        return object;
    }
}