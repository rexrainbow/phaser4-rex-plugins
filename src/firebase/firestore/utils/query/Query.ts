import * as firebase from 'firebase/app';

export type StartModeType = 'startAt' | 'startAfter';
export type ForEachPageCallbackType = (querySnapshot: firebase.firestore.QuerySnapshot) => boolean | void;
export type ResolveCallbackType = () => any;

export type QueryConfig = {
    query: firebase.firestore.Query
    totalLines?: number,
    linesPerPage?: number,
    startDocRef?: firebase.firestore.DocumentData,
    startMode?: StartModeType,
    forEachPageCallback?: ForEachPageCallbackType,
    resolveCallback?: ResolveCallbackType
}

type QueryNextPageConfig = QueryConfig & {
    remainderLines: number
}

export function Query({
    query,
    totalLines = Infinity,
    linesPerPage = 1000,
    startDocRef,
    startMode,
    forEachPageCallback,
    resolveCallback
}: QueryConfig): Promise<any> {

    return QueryNextPage({
        query: query,
        remainderLines: totalLines,
        linesPerPage: linesPerPage,
        startDocRef: startDocRef,
        startMode: startMode,
        forEachPageCallback: forEachPageCallback,
        resolveCallback: resolveCallback
    });
}

function QueryNextPage(
    config: QueryNextPageConfig
): Promise<unknown> {

    let query = config.query;
    if (config.startDocRef) {
        query = query[config.startMode](config.startDocRef);
    }

    let lineCount = Math.min(config.remainderLines, config.linesPerPage);
    config.remainderLines -= lineCount;
    return query.limit(lineCount).get()
        .then(function (querySnapshot: firebase.firestore.QuerySnapshot) {

            let done = (config.remainderLines === 0) || (querySnapshot.size < lineCount);  // Is last page
            let result = false;
            if (config.forEachPageCallback) {
                result = config.forEachPageCallback(querySnapshot) || false;
            }
            done = done || result;

            if (done) {
                let out: unknown;
                if (config.resolveCallback) {
                    out = config.resolveCallback();
                }
                return Promise.resolve(out);
            } else {
                config.startDocRef = querySnapshot.docs[querySnapshot.size - 1];
                config.startMode = 'startAfter';
                return QueryNextPage(config);
            }
        })
}