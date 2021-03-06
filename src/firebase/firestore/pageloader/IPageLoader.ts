import * as firebase from 'firebase/app';
import { StartModeType } from '../utils/query/Query';

export type PageQueriesType = {
    next: firebase.firestore.Query,
    previous: firebase.firestore.Query
}

export interface IConfig {
    query?: PageQueriesType;
    itemCount?: number;
    baselineDoc?: firebase.firestore.DocumentData;
    baselineMode?: StartModeType;
}

export interface IPageLoader {
    nextQuery: firebase.firestore.Query;
    prevQuery: firebase.firestore.Query;
    itemCount: number;
    baselineDoc: firebase.firestore.DocumentData;
    baselineMode: StartModeType;

    pageIndex: number | null;
    baselineDocRef: firebase.firestore.DocumentReference;
    prevPageEndDocRef: firebase.firestore.DocumentReference;
    currPageStartDocRef: firebase.firestore.DocumentReference;
    currPageEndDocRef: firebase.firestore.DocumentReference;
    startItemIndex: number | null;
    endItemIndex: number | null;
    cacheItems: firebase.firestore.DocumentData[];
    isFullPage: boolean;

    setItemCount(
        count: number
    ): this;

    setQuery(
        nextQuery: PageQueriesType | firebase.firestore.Query,
        prevQuery?: firebase.firestore.Query
    ): this;

    setBaselineDoc(
        doc: firebase.firestore.DocumentData,
        mode: StartModeType
    ): this;

    loadFirstPage(): Promise<firebase.firestore.DocumentData[]>;

    loadNextPage(): Promise<firebase.firestore.DocumentData[]>;

    loadPreviousPage(): Promise<firebase.firestore.DocumentData[]>;

    loadCurrentPage(): Promise<firebase.firestore.DocumentData[]>;

    load(
        count: number,
        skip?: number
    ): Promise<firebase.firestore.DocumentData[]>;

    // Override
    _loadFirstPage(): Promise<firebase.firestore.DocumentData[]>;
    _loadNextPage(): Promise<firebase.firestore.DocumentData[]>;
    _loadPreviousPage(): Promise<firebase.firestore.DocumentData[]>;
    _loadCurrentPage(): Promise<firebase.firestore.DocumentData[]>;

}