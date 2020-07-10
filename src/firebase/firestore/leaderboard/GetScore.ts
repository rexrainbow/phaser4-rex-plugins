import {
    ILeaderBoard,
    IRecord
} from './ILeaderBoard';
import { GetMyRecordQuery } from './GetQueryMethods';

export let GetScore = function (
    leaderBoard: ILeaderBoard,
    userID: string = leaderBoard.userID
): Promise<IRecord> {

    return GetMyRecordQuery(leaderBoard, userID).get()
        .then(function (querySnapshot) {
            let item: IRecord;
            if (querySnapshot.size > 0) {
                item = querySnapshot.docs[0].data() as IRecord;
            }
            return Promise.resolve(item);
        });
}