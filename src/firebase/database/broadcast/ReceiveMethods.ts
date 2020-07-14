import * as firebase from 'firebase/app';
import {
    IBroadcast,
    IMessage
} from './IBroadcast';

export function StartReceiving(
    broadcast: IBroadcast
): void {

    if (broadcast.isReceiving && (broadcast.receiverRef.key === broadcast.receiverID)) {
        return;
    }

    StopReceiving(broadcast);

    broadcast.isReceiving = true;
    broadcast.skipFirst = true;  // Skip previous message
    broadcast.receiverRef = broadcast.database.ref(broadcast.rootPath).child(broadcast.receiverID);
    broadcast.receiverRef.on('value', OnReceive, broadcast);
    broadcast.receiverRef.onDisconnect().remove();
};

export function StopReceiving(
    broadcast: IBroadcast
): void {

    if (!broadcast.isReceiving) {
        return;
    }

    broadcast.isReceiving = false;
    broadcast.receiverRef.off('value', OnReceive, broadcast);
    broadcast.receiverRef.remove();
    broadcast.receiverRef.onDisconnect().cancel();
}

function OnReceive(
    this: IBroadcast,
    snapshot: firebase.database.DataSnapshot
): void {

    if (this.skipFirst) {
        this.skipFirst = false;
        return;
    }
    let d = snapshot.val() as IMessage;
    if (d == null) {
        return;
    }

    delete d.stamp;
    this.history.add(d);
    this.emit(this.eventNames.receive, d);
}