import { IMessages } from './IMessages';

export function GetReceiverQuery(
    messager: IMessages,
    receiverID: string = messager.receiverID
): firebase.firestore.Query {

    let query = messager.rootRef as firebase.firestore.Query;
    query = (receiverID !== undefined) ? query.where('receiverID', '==', receiverID) : query;
    return query;
};

import { PageQueriesType } from '../pageloader/IPageLoader';

export function GetPageQuery(
    messager: IMessages,
    receiverID: string = messager.receiverID
): PageQueriesType {

    let baseQuery = GetReceiverQuery(messager, receiverID);
    let nextPageQuery = baseQuery.orderBy('timestamp');
    let prevPageQuery = baseQuery.orderBy('timestamp', 'desc');
    return {
        next: nextPageQuery,
        previous: prevPageQuery
    }
};