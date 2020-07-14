import { ISingleRoom } from './ISingleRoom';
import { IsInRoom } from './RoomMethods';

export function LeaveRoom(
    room: ISingleRoom
): Promise<any> {

    if (!IsInRoom(room)) {
        return Promise.resolve();
    }

    // 'userlist.leave' event -> 'room.leave' event -> then
    room.leftRoomFlag = true;
    return room.userList.leave();
}