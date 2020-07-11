import {
    IBroadcast,
    IMessage
} from './IBroadcast';

export let Send = function (
    broadcast: IBroadcast,
    message?: unknown
): Promise<any> {

    if ((!broadcast.sendToRef) || (broadcast.sendToRef.key !== broadcast.receiverID)) {
        broadcast.sendToRef = broadcast.database.ref(broadcast.rootPath).child(broadcast.receiverID);
    }

    // Clear message
    if (message === undefined) {
        return broadcast.sendToRef.remove(); // Promise
    }

    let d: IMessage = {
        message: message,
        senderID: broadcast.userID,
        stamp: broadcast.stamp,
    };
    if (broadcast.userName !== undefined) {
        d.senderName = broadcast.userName;
    }

    broadcast.skipFirst = false;
    broadcast.stamp = !broadcast.stamp;

    return broadcast.sendToRef.set(d);
}