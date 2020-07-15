import {
    IRoom,
    UserInfoType
} from './IRoom';
import { GetUserListRef } from './GetRefMethods';
import { ItemList } from '../utils/itemlist';

export function GetUserList(
    room: IRoom,
    roomID: string = room.roomID
): UserInfoType[] | Promise<UserInfoType[]> {

    if (roomID === room.roomID) {
        return room.userList.getUsers();
    }

    return new Promise(function (resolve, reject) {
        const userList = new ItemList<UserInfoType>({
            itemIDKey: 'joinAt',
            mode: 'once'
        })

        userList
            .once('update', function (users: UserInfoType[]) {
                resolve(users)
            })
            .startUpdate(GetUserListRef(room, roomID));
    })
}