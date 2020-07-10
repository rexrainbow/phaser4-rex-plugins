import * as firebase from 'firebase/app';
import {
    IMessager,
    MessageType
} from './IMessager';
import { GetReceiverQuery, GetPageQuery } from './GetQueryMethods';

export let StartReceiving = function (
    messager: IMessager
):void {

    let query = GetReceiverQuery(messager).orderBy('timestamp', 'desc').limit(1);
    messager.unsubscribe = query.onSnapshot(
        {
            includeMetadataChanges: true
        },
        function (querySnapshot) {
            if (querySnapshot.size > 0) {  // Load data
                let doc = querySnapshot.docs[0];
                if (doc.metadata.hasPendingWrites) {  // Load local message                        
                    if (messager.skipFirst) { // Local doc dose not have timestamp
                        messager.skipFirst = false;
                    }
                    return;
                }

                ResetPageQuery(messager, messager.receiverID, doc);

                if (messager.skipFirst) {  // Load previos data
                    messager.skipFirst = false;
                } else {
                    let d: MessageType = DocToMessage(doc);
                    messager.cacheMessages.push(d);
                    messager.emit('receive', d);
                }
            } else {
                if (messager.skipFirst) {  // Start from an empty collection
                    messager.skipFirst = false;
                }
            }
        },
        function (error) {
            debugger
        }
    )
};

export let StopReceiving = function (
    messager: IMessager
): void {

    if (messager.unsubscribe) {
        messager.unsubscribe();
    }

    // Reset to initial state
    messager.resetQueryFlag = true;
    messager.cacheMessages.length = 0;
};

export let LoadPreviousMessages = function (
    messager: IMessager
): Promise<MessageType[]> {

    ResetPageQuery(messager);
    return messager.page.loadNextPage()
        .then(function (docs) {
            let messages: MessageType[] = [];
            for (let i = 0, cnt = docs.length; i < cnt; i++) {
                messages.push(DocToMessage(docs[i]));
            }

            messager.cacheMessages.splice(0, 0, ...messages);
            return Promise.resolve(messages);
        })
}


let ResetPageQuery = function (
    messager: IMessager,
    receiverID: string = messager.receiverID,
    baselineDoc?: firebase.firestore.DocumentData
): void {

    if (!messager.resetQueryFlag) {
        return;
    }

    messager.resetQueryFlag = false;
    let baselineMode: 'startAt' | 'startAfter' = (messager.skipFirst) ? 'startAt' : 'startAfter';
    messager.page
        .setBaselineDoc(baselineDoc, baselineMode)
        .setQuery(GetPageQuery(messager, receiverID));
    return;
}

let DocToMessage = function (
    doc: firebase.firestore.DocumentData
): MessageType {

    let message = doc.data();
    message.timestamp = message.timestamp.toDate();
    return message;
}