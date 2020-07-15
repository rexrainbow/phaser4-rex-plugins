import { IRoom } from './IRoom';
import { LeaveRoom } from './LeaveRoom';

export function KickUser(
    room: IRoom,
    userID: string
): Promise<any> {

    if (!room.userList.contains(userID)) {
        return Promise.resolve();
    } else if (userID === room.userID) {
        return LeaveRoom(room);
    } else {
        // TODO: Who can kick user?
        return room.userList.leave(userID);
    }
}