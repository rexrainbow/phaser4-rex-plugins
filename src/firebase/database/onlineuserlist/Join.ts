import * as firebase from 'firebase/app';
import {
    IOnlineUserList,
    UserInfoType
} from './IOnlineUserList';
import { Contains } from './UserMethods';
import { Delay } from '../../../utils/promise/Delay';


export function Join(
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID,
    userName: string = onlineUserList.userName
): Promise<any> {

    if (Contains(onlineUserList, userID)) {
        return Promise.resolve();  // Promise
    }

    // Prepare data
    let d: UserInfoType = {
        userID: userID,
        userName: userName
    };
    let maxUsers = onlineUserList.maxUsers;
    let rootRef = onlineUserList.database.ref(onlineUserList.rootPath);
    let userRef = rootRef.push();

    return userRef.onDisconnect().remove()
        .then(function () {
            return userRef.set(d)
        })
        .then(function () {
            return Delay(0);
        })
        .then(function () {
            // No user count limitation
            if (maxUsers === 0) {
                onlineUserList.isInList = true;
                return Promise.resolve();
            }

            // Has user count limitation
            return rootRef.limitToFirst(maxUsers).once('value')
                .then(function (snapshot: firebase.database.DataSnapshot) {

                    if (IsInSnapshot(snapshot, userID)) {
                        onlineUserList.isInList = true;
                        return Promise.resolve();
                    }

                    onlineUserList.isInList = false;
                    // UserID is not in firstN list
                    return userRef.remove()
                        .then(function () {
                            return userRef.onDisconnect().cancel()
                        })
                        .then(function () {
                            return Promise.reject()
                        })
                });
        })
};

let IsInSnapshot = function (
    snapshot: firebase.database.DataSnapshot,
    userID: string
): boolean {

    let result = false;
    snapshot.forEach(function (childSnapshot) {
        let user = childSnapshot.val() as UserInfoType;
        if (user.userID === userID) {
            result = true;
            return true;
        }
    });
    return result;
}