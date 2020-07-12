import * as firebase from 'firebase/app';
import {
    IOnlineUserList,
    UserInfoType
} from './IOnlineUserList';

export let Contains = function (
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
) {

    return onlineUserList.userID2ItemID.has(userID);
}

export let GetUserRef = function (
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
): firebase.database.Reference {

    if (!Contains(onlineUserList, userID)) {
        return null;
    }
    let itemID = onlineUserList.userID2ItemID.get(userID);
    return onlineUserList.rootRef.child(itemID);
}

export let GetUser = function (
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
): UserInfoType {

    if (!Contains(onlineUserList, userID)) {
        return null;
    }
    let itemID = onlineUserList.userID2ItemID.get(userID);
    return onlineUserList.userList.getItemFromItemID(itemID);
}

export let GetUsers = function (
    onlineUserList: IOnlineUserList
): UserInfoType[] {

    return onlineUserList.userList.getItems();
}

export let Clear = function (
    onlineUserList: IOnlineUserList
): void {

    onlineUserList.userList.clear();
}

export let ForEach = function (
    onlineUserList: IOnlineUserList,
    callback: ((value: UserInfoType, index: number, array: UserInfoType[]) => void),
    scope?: unknown
): void {

    onlineUserList.userList.forEach(callback, scope);
}

export let IsFirstUser = function (
    onlineUserList: IOnlineUserList,
    userID: string = onlineUserList.userID
): boolean {

    let user = onlineUserList.userList.getItems()[0];
    return (user && (user.userID === userID));
}

export let IsFull = function (
    onlineUserList: IOnlineUserList
): boolean {

    if (onlineUserList.maxUsers === 0) {
        return false;
    }
    return (onlineUserList.userList.getItems().length >= onlineUserList.maxUsers);
}