import * as firebase from 'firebase/app';
import {
    ILeaderBoard,
    TimeTagKeys, ScoreKeys
} from './ILeaderBoard';
import { GetTime } from './GetTime';

export let GetRecordQuery = function (
    leaderboard: ILeaderBoard,
    boardID?: string | undefined,
    customTag?: string | undefined,
    userID?: string | undefined,
    timeTagKey?: [string, string] | undefined
): firebase.firestore.Query {

    let query: firebase.firestore.Query = leaderboard.rootRef;
    query = (boardID != null) ? query.where('boardID', '==', boardID) : query;
    query = (customTag != null) ? query.where('tag', '==', customTag) : query;
    query = (userID != null) ? query.where('userID', '==', userID) : query;

    if (timeTagKey != null) {
        query = query.where(timeTagKey[0], '==', timeTagKey[1]);
    }
    return query;
};

export let GetMyRecordQuery = function (
    leaderboard: ILeaderBoard,
    userID: string = leaderboard.userID
): firebase.firestore.Query {

    return GetRecordQuery(leaderboard, leaderboard.boardID, leaderboard.tag, userID, undefined).limit(1);
}

import { PageQueriesType } from '../pageloader/IPageLoader';

export let GetPageQuery = function (
    leaderboard: ILeaderBoard
): PageQueriesType {

    let timeTagKey: [string, string] | undefined,
        scoreKey: string;
    if (leaderboard.timeFilters !== false) {
        let t = leaderboard.timeFilterType[0];
        timeTagKey = [TimeTagKeys[t], GetTime()[t]];
        scoreKey = ScoreKeys[t];
    } else { // No time filters
        timeTagKey = undefined;
        scoreKey = 'score';
    }

    let baseQuery = GetRecordQuery(leaderboard, leaderboard.boardID, leaderboard.tag, undefined, timeTagKey);
    let nextPageQuery = baseQuery.orderBy(scoreKey, 'desc');
    let prevPageQuery = baseQuery.orderBy(scoreKey);
    return {
        next: nextPageQuery,
        previous: prevPageQuery
    }
}