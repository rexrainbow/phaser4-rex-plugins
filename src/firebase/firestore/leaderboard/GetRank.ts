import {
    ILeaderBoard,
    IRecord, RankResultType
} from './ILeaderBoard';
import { GetPageQuery } from './GetQueryMethods';
import { FindFirst, TestCallbackType } from '../utils/query/FindFirst';


export let GetRank = function (
    leaderboard: ILeaderBoard,
    userID: string = leaderboard.userID
): Promise<RankResultType> {

    let query = GetPageQuery(leaderboard).next;
    let testCallback: TestCallbackType = function (doc: firebase.firestore.DocumentData) {
        let item = doc.data() as IRecord;
        return (item.userID === userID);
    }
    return FindFirst(query, testCallback)
        .then(function (result) {
            return Promise.resolve({ userID: userID, rank: result.index });
        })
};