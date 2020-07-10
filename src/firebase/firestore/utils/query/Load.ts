import * as firebase from 'firebase/app';
import {
    Query,
    StartModeType
} from './Query';


export let Load = function (
    query: firebase.firestore.Query,
    count: number = Infinity,
    skip: number = 0,
    startDocRef?: firebase.firestore.DocumentData,
    startMode?: StartModeType
): Promise<firebase.firestore.DocumentData[]> {

    let out: firebase.firestore.DocumentData[] = [];
    let startIndex = 0;

    return Query({
        query: query,
        totalLines: (skip + count),
        startDocRef: startDocRef,
        startMode: startMode,
        forEachPageCallback: function (querySnapshot) {
            let validDocs: firebase.firestore.DocumentData[];
            let docCount = querySnapshot.size;
            let localStart = skip - startIndex;
            if (localStart <= 0) {
                validDocs = querySnapshot.docs;
            } else if (localStart < docCount) {
                validDocs = querySnapshot.docs.slice(localStart, docCount);
            }
            if (validDocs) {
                out.push(...validDocs);
            }
            startIndex += docCount;
        },
        resolveCallback: function () {
            return out;
        }
    });
}