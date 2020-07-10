import * as firebase from 'firebase/app';
import {
    ILeaderBoard,
    TimeTagKeys, ScoreKeys,
    IRecord
} from './ILeaderBoard';
import { GetPageQuery } from './GetQueryMethods';


export let LoadFirstPage = function (
    leaderBoard: ILeaderBoard
): Promise<IRecord[]> {

    ResetPageQuery(leaderBoard);
    return leaderBoard.page.loadFirstPage()
        .then(function (docs) {
            return Promise.resolve(DocsToDataArray(leaderBoard, docs));
        })
};


export let LoadNextPage = function (
    leaderBoard: ILeaderBoard
): Promise<IRecord[]> {

    ResetPageQuery(leaderBoard);
    return leaderBoard.page.loadNextPage()
        .then(function (docs) {
            return Promise.resolve(DocsToDataArray(leaderBoard, docs));
        })
};

export let LoadPreviousPage = function (
    leaderBoard: ILeaderBoard,
): Promise<IRecord[]> {

    ResetPageQuery(leaderBoard);
    return leaderBoard.page.loadPreviousPage()
        .then(function (docs) {
            return Promise.resolve(DocsToDataArray(leaderBoard, docs));
        })
};


export let LoadCurrentPage = function (
    leaderBoard: ILeaderBoard
): Promise<IRecord[]> {

    ResetPageQuery(leaderBoard);
    return leaderBoard.page.loadCurrentPage()
        .then(function (docs) {
            return Promise.resolve(DocsToDataArray(leaderBoard, docs));
        })
};


export let Load = function (
    leaderBoard: ILeaderBoard,
    count: number,
    skip: number = 0
): Promise<IRecord[]> {

    ResetPageQuery(leaderBoard);
    return leaderBoard.page.load(count, skip)
        .then(function (docs) {
            return Promise.resolve(DocsToDataArray(leaderBoard, docs));
        })
};

let ResetPageQuery = function (
    leaderBoard: ILeaderBoard
): void {

    if (!leaderBoard.resetQueryFlag) {
        return;
    }

    leaderBoard.resetQueryFlag = false;
    leaderBoard.page.setQuery(GetPageQuery(leaderBoard));
}

let DocsToDataArray = function (
    leaderBoard: ILeaderBoard,
    docs: firebase.firestore.DocumentData[]
): IRecord[] {

    let items: IRecord[] = [];
    let scoreKey = ScoreKeys[leaderBoard.timeFilterType[0]];
    for (let i = 0, cnt = docs.length; i < cnt; i++) {
        let item = docs[i].data() as IRecord;

        if (leaderBoard.timeFilters !== false) {
            item.score = item[scoreKey];
            // Remove timeFilterKeys, and scoreKeys
            for (let t in leaderBoard.timeFilters) {
                delete item[TimeTagKeys[t]];
                delete item[ScoreKeys[t]];
            }
        }
        items.push(item);
    }
    return items;
}