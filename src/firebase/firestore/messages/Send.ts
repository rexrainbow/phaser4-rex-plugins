import * as firebase from 'firebase/app';
import {
    IMessager, MessageType
} from './IMessager';


export let Send = function (
    messager: IMessager,
    message: unknown
): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {

    let d: MessageType = {
        senderID: messager.userID,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (messager.userName !== undefined) {
        d.senderName = messager.userName;
    }
    if (messager.receiverID !== undefined) {
        d.receiverID = messager.receiverID;
    }

    return messager.rootRef.add(d);
}