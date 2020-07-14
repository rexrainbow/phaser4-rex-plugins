import * as firebase from 'firebase/app';
import { IOnlineUserList } from './IOnlineUserList';
import { GetUserRef } from './UserMethods';

export function ChangeUserName(
    onlineUserList: IOnlineUserList,
    userName: string
): Promise<any> {

    return new Promise(function (resolve, reject) {
        let userRef = GetUserRef(onlineUserList);
        if (userRef) { // Find userRef
            return resolve(userRef)
        } else { // Query userRef
            let query = onlineUserList.rootRef.orderByChild('userID').equalTo(onlineUserList.userID);
            query.once('child_added')
                .then(function (snapshot) {
                    return resolve(snapshot.ref)
                })
        }
    })
        .then(function (userRef: firebase.database.Reference) { // Set userName
            return userRef.child('userName').set(userName)
        })
        .then(function () {
            onlineUserList.userName = userName;
            return Promise.resolve();
        })
}