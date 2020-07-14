import { ISingleRoom } from './ISingleRoom';

export function ChangeUserName(
    room: ISingleRoom,
    userName: string
): Promise<any> {

    return room.userList.changeUserName(userName);
}