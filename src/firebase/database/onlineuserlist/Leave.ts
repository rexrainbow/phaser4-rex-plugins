import { IOnlineUserList } from './IOnlineUserList';
import { Contains } from './UserMethods';

export function Leave(
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
): Promise<any> {

    if (!Contains(onlineUserList, userID)) {
        return Promise.resolve();  // Promise
    }

    let itemID = onlineUserList.userID2ItemID.get(userID);
    let userRef = onlineUserList.database.ref(onlineUserList.rootPath).child(itemID);
    return userRef.remove();  // Promise
}