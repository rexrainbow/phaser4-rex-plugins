import { IMessager } from './IMessager';

export let GetReceiverQuery = function (
    messager: IMessager,
    receiverID: string = messager.receiverID
): firebase.firestore.Query {

    let query = messager.rootRef as firebase.firestore.Query;
    query = (receiverID !== undefined) ? query.where('receiverID', '==', receiverID) : query;
    return query;
};

import { PageQueriesType } from '../pageloader/IPageLoader';

export let GetPageQuery = function (
    messager: IMessager,
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