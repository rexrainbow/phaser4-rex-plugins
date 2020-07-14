import * as firebase from 'firebase/app';
import {
    IOnlineUserList,
    UserInfoType
} from './IOnlineUserList';

export function Contains(
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
) {

    return onlineUserList.userID2ItemID.has(userID);
}

export function GetUserRef(
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
): firebase.database.Reference {

    if (!Contains(onlineUserList, userID)) {
        return null;
    }
    let itemID = onlineUserList.userID2ItemID.get(userID);
    return onlineUserList.rootRef.child(itemID);
}

export function GetUser(
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
): UserInfoType {

    if (!Contains(onlineUserList, userID)) {
        return null;
    }
    let itemID = onlineUserList.userID2ItemID.get(userID);
    return onlineUserList.userList.getItemFromItemID(itemID);
}

export function GetUsers(
    onlineUserList: IOnlineUserList
): UserInfoType[] {

    return onlineUserList.userList.getItems();
}

export function Clear(
    onlineUserList: IOnlineUserList
): void {

    onlineUserList.userList.clear();
}

export function ForEach(
    onlineUserList: IOnlineUserList,
    callback: ((value: UserInfoType, index: number, array: UserInfoType[]) => void),
    scope?: unknown
): void {

    onlineUserList.userList.forEach(callback, scope);
}

export function IsFirstUser(
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
): boolean {

    let user = onlineUserList.userList.getItems()[0];
    return (user && (user.userID === userID));
}

export function IsFull(
    onlineUserList: IOnlineUserList
): boolean {

    if (onlineUserList.maxUsers === 0) {
        return false;
    }
    return (onlineUserList.userList.getItems().length >= onlineUserList.maxUsers);
}