import * as firebase from 'firebase/app';
import { Query } from './Query';

export type TestCallbackType = (doc: firebase.firestore.DocumentData) => boolean;

export type FindFirstResultType = {
    doc: firebase.firestore.DocumentData | undefined,
    index: number | undefined
}

export function FindFirst(
    query: firebase.firestore.Query,
    testCallback: TestCallbackType
): Promise<FindFirstResultType> {

    let out = {
        doc: undefined,
        index: undefined
    }
    let startIndex = 0;
    return Query({
        query: query,
        forEachPageCallback: function (querySnapshot) {
            let docs = querySnapshot.docs,
                doc: firebase.firestore.DocumentData;
            for (let i = 0, cnt = docs.length; i < cnt; i++) {
                doc = docs[i];
                if (testCallback(doc)) {
                    out.doc = doc;
                    out.index = startIndex + i;
                    return true;
                }
            }
            startIndex += querySnapshot.size;
        },
        resolveCallback: function () {
            return out;
        }
    });
}