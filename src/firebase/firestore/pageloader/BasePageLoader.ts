import * as firebase from 'firebase/app';
import {
    IPageLoader,
    IConfig, PageQueriesType
} from './IPageLoader';
import { StartModeType } from '../utils/query/Query';
import { LoadInRange } from './LoadInRange';


export abstract class BasePageLoader implements IPageLoader {
    nextQuery: firebase.firestore.Query;
    prevQuery: firebase.firestore.Query;
    itemCount: number;
    baselineDoc: firebase.firestore.DocumentData;
    baselineMode: StartModeType;

    pageIndex: number | null;
    baselineDocRef: firebase.firestore.DocumentData;
    prevPageEndDocRef: firebase.firestore.DocumentData;
    currPageStartDocRef: firebase.firestore.DocumentData;
    currPageEndDocRef: firebase.firestore.DocumentData;
    startItemIndex: number | null;
    endItemIndex: number | null;
    cacheItems: firebase.firestore.DocumentData[];
    isFullPage: boolean;

    constructor({
        query = { next: undefined, previous: undefined },
        itemCount = 100,
        baselineDoc,
        baselineMode = 'startAt'
    }: IConfig = {}) {

        this.setQuery(query);
        this.setItemCount(itemCount);
        this.setBaselineDoc(baselineDoc, baselineMode);
        this.pageIndex = undefined;
        this.baselineDocRef = undefined;
        this.baselineMode = 'startAt';
        this.startItemIndex = undefined;
        this.endItemIndex = undefined;
        this.cacheItems = undefined;
        this.isFullPage = undefined;
    }


    setQuery(
        nextQuery: PageQueriesType | firebase.firestore.Query,
        prevQuery?: firebase.firestore.Query
    ): this {

        if (nextQuery instanceof firebase.firestore.Query) {
            this.nextQuery = nextQuery;
            this.prevQuery = prevQuery;
        } else {
            var config = nextQuery;
            this.nextQuery = config.next;
            this.prevQuery = config.previous;
        }

        this.pageIndex = null;
        this.isFullPage = true;
        return this;
    }

    setItemCount(
        count: number
    ): this {

        this.itemCount = count;
        return this;
    }

    setBaselineDoc(
        doc: firebase.firestore.DocumentData,
        mode: StartModeType
    ): this {

        if (doc) {
            this.baselineDocRef = doc.ref;
            this.baselineMode = mode;
        } else {
            this.baselineDocRef = undefined;
        }
        return this;
    }

    load(
        count: number,
        skip: number = 0
    ): Promise<firebase.firestore.DocumentData[]> {

        return LoadInRange(this, count, skip);
    }

    loadFirstPage(): Promise<firebase.firestore.DocumentData[]> {

        return this._loadFirstPage();
    }

    loadNextPage(): Promise<firebase.firestore.DocumentData[]> {

        if (this.pageIndex == null) {
            return this._loadFirstPage();
        }

        return this._loadNextPage();
    }

    loadPreviousPage(): Promise<firebase.firestore.DocumentData[]> {

        if ((this.pageIndex == null) || (this.pageIndex === 1)) {
            return this._loadFirstPage();
        }

        return this._loadPreviousPage();
    }

    loadCurrentPage(): Promise<firebase.firestore.DocumentData[]> {

        if ((this.pageIndex == null) || (this.pageIndex === 0)) {
            return this._loadFirstPage();
        }

        return this._loadCurrentPage();
    }

    abstract _loadFirstPage(): Promise<firebase.firestore.DocumentData[]>;
    abstract _loadNextPage(): Promise<firebase.firestore.DocumentData[]>;
    abstract _loadPreviousPage(): Promise<firebase.firestore.DocumentData[]>;
    abstract _loadCurrentPage(): Promise<firebase.firestore.DocumentData[]>;


}