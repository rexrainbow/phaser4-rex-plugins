import { ISingleRoom, UserInfoType } from './ISingleRoom';

export function IsInRoom(
    room: ISingleRoom
): boolean {

    return room.userList.isInList;
}

export function IsFull(
    room: ISingleRoom
): boolean {

    return room.userList.isFull();
}

export function IsFirstUser(
    room: ISingleRoom,
    userID: string = room.userID
): boolean {

    return room.userList.isFirstUser(userID);
}

export function GetUsers(
    room: ISingleRoom
): UserInfoType[] {

    return room.userList.getUsers();
}