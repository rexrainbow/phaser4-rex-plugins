import * as firebase from 'firebase/app';
import {
    IMessages,
    IMessage
} from './IMessages';
import { GetReceiverQuery, GetPageQuery } from './GetQueryMethods';
import { ReceiveMessageEvent } from './events'

export function StartReceiving(
    messager: IMessages
): void {

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
                    let d: IMessage = DocToMessage(doc);
                    messager.cacheMessages.push(d);
                    messager.emit(ReceiveMessageEvent, d);
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

export function StopReceiving(
    messager: IMessages
): void {

    if (messager.unsubscribe) {
        messager.unsubscribe();
    }

    // Reset to initial state
    messager.resetQueryFlag = true;
    messager.cacheMessages.length = 0;
};

export function LoadPreviousMessages(
    messager: IMessages
): Promise<IMessage[]> {

    ResetPageQuery(messager);
    return messager.page.loadNextPage()
        .then(function (docs) {
            let messages: IMessage[] = [];
            for (let i = 0, cnt = docs.length; i < cnt; i++) {
                messages.push(DocToMessage(docs[i]));
            }

            messager.cacheMessages.splice(0, 0, ...messages);
            return Promise.resolve(messages);
        })
}


function ResetPageQuery(
    messager: IMessages,
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

function DocToMessage(
    doc: firebase.firestore.DocumentData
): IMessage {

    let message = doc.data() as IMessage;
    message.timestamp = (message.timestamp as firebase.firestore.Timestamp).toDate();
    return message;
}