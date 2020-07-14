import { ISingleRoom } from './ISingleRoom';
import { UserInfoType } from '../onlineuserlist/IOnlineUserList';

export function GetUserList(
    room: ISingleRoom
): UserInfoType[] {

    return room.userList.getUsers();
}