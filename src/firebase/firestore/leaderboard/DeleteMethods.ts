import { ILeaderBoard } from './ILeaderBoard';
import { GetRecordQuery } from './GetQueryMethods';
import { Delete } from '../utils/query/Delete';

export function DeleteUser(
    leaderBoard: ILeaderBoard,
    userID: string = leaderBoard.userID
): Promise<void> {

    let query = GetRecordQuery(leaderBoard, undefined, undefined, userID, undefined);
    return Delete(query);
};

export function DeleteBoard(
    leaderBoard: ILeaderBoard,
    boardID: string = leaderBoard.boardID,
    tag: string = leaderBoard.tag,
): Promise<void> {

    let query = GetRecordQuery(leaderBoard, boardID, tag, undefined, undefined);
    return Delete(query);
}