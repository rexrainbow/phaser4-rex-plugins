import { IRoom } from './IRoom';

export function ChangeUserName(
    room: IRoom,
    userName: string
): Promise<any> {

    return room.userList.changeUserName(userName);
}