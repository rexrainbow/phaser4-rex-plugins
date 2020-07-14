import * as firebase from 'firebase/app';
import { Load } from './Load';


export function Delete(
    query: firebase.firestore.Query
): Promise<void> {

    return Load(query)
        .then(function (docs: firebase.firestore.DocumentData[]) {

            if (docs.length === 0) { // Last page, task done
                return Promise.resolve();
            }

            let tasks: Promise<void>[] = [];
            let batch: firebase.firestore.WriteBatch,
                actionCount: number;
            for (let i = 0, cnt = docs.length; i < cnt; i++) {
                if (batch === undefined) {
                    batch = firebase.firestore().batch();
                    actionCount = 0;
                }

                batch.delete(docs[i].ref);
                actionCount++;
                if (actionCount >= 500) {
                    tasks.push(batch.commit());
                    batch = undefined;
                }
            }

            if (batch) {
                tasks.push(batch.commit());
            }

            return Promise.all(tasks) as Promise<any>;
        })
}