import {
    ILeaderBoard,
    TimeTagKeys, ScoreKeys,
    IRecord
} from './ILeaderBoard';
import { GetTime } from './GetTime';
import { GetMyRecordQuery } from './GetQueryMethods';

export let Post = function (
    leaderBoard: ILeaderBoard,
    score: number,
    extraData?: object | undefined | null,
    timeStamp?: number
): Promise<void> {


    let newRecord: IRecord = {
        userID: leaderBoard.userID
    };
    if (leaderBoard.boardID !== undefined) {
        newRecord.boardID = leaderBoard.boardID;
    }
    if (leaderBoard.userName) {
        newRecord.userName = leaderBoard.userName;
    }

    if (leaderBoard.timeFilters !== false) {
        let curTimeData = GetTime(timeStamp);
        for (let t in leaderBoard.timeFilters) {
            if (!leaderBoard.timeFilters[t]) {
                continue;
            }
            newRecord[TimeTagKeys[t]] = curTimeData[t];
            newRecord[ScoreKeys[t]] = score;
        }
    } else { // No time filters
        newRecord.score = score;
    }

    if (leaderBoard.tag) {
        newRecord.tag = leaderBoard.tag;
    }
    if (extraData) {
        Object.assign(newRecord, extraData);
    }
    return GetMyRecordQuery(leaderBoard).get()
        .then(function (querySnapshot) {
            let prevRecord: firebase.firestore.DocumentData,
                docID: string;

            if (querySnapshot.size > 0) {
                let doc = querySnapshot.docs[0];
                prevRecord = doc.data();
                docID = doc.id;
            }

            if (prevRecord) {
                if (leaderBoard.timeFilters !== false) {
                    for (let t in leaderBoard.timeFilters) {
                        if (!leaderBoard.timeFilters[t]) {
                            continue;
                        }

                        let timeTagKey: string = TimeTagKeys[t];
                        if (prevRecord[timeTagKey] === newRecord[timeTagKey]) {
                            let scoreKey: string = ScoreKeys[t];
                            newRecord[scoreKey] = Math.max(prevRecord[scoreKey], newRecord[scoreKey]);
                        }
                    }
                } else { // No time filters
                    newRecord.score = Math.max(prevRecord.score, newRecord.score);
                }
            }
            if (docID === undefined) {
                docID = leaderBoard.rootRef.doc().id;
            }
            return leaderBoard.rootRef.doc(docID)
                .set(newRecord);
        });
}