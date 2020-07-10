import { ILeaderBoard } from './ILeaderBoard';
import { GetRecordQuery } from './GetQueryMethods';
import { Delete } from '../utils/query/Delete';

export let DeleteUser = function (
    leaderBoard: ILeaderBoard,
    userID: string = leaderBoard.userID
): Promise<void> {

    let query = GetRecordQuery(leaderBoard, undefined, undefined, userID, undefined);
    return Delete(query);
};

export let DeleteBoard = function (
    leaderBoard: ILeaderBoard,
    boardID: string = leaderBoard.boardID,
    tag: string = leaderBoard.tag,
): Promise<void> {

    let query = GetRecordQuery(leaderBoard, boardID, tag, undefined, undefined);
    return Delete(query);
}