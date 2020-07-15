import {
    IRoom,
    RoomInfoType
} from './IRoom';
import { IsInRoom } from './IsInRoom';
import { RemoveRoom } from './RemoveRoom';
import { GetRoomInfo } from './GetRoomInfo';

export function LeaveRoom(
    room: IRoom
): Promise<RoomInfoType> {

    if (!IsInRoom(room)) {
        return Promise.resolve(GetRoomInfo(room));
    }

    // 'userlist.leave' event -> 'room.leave' event -> then
    room.leftRoomFlag = true;
    if (room.isRemoveRoomWhenLeft) {
        // Remove room, include user list
        return RemoveRoom(room)
    } else {
        const prevRoomInfo = GetRoomInfo(room);
        // Leave user list only
        return room.userList.leave()
            .then(function () {
                return Promise.resolve(prevRoomInfo)
            })
    }
}