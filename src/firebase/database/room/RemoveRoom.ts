import { IRoom, RoomInfoType } from './IRoom';
import { GetRootRef } from './GetRefMethods';
import { GetRoomInfo } from './GetRoomInfo';

export function RemoveRoom(
    room: IRoom,
    roomID: string = room.roomID
): Promise<RoomInfoType> {

    const d = {};
    d[`room-filter/${roomID}`] = null;
    d[`room-metadata/${roomID}`] = null;
    d[`rooms/${roomID}`] = null;

    const prevRoomInfo = GetRoomInfo(room);
    return GetRootRef(room).update(d)
        .then(function () {
            return Promise.resolve(prevRoomInfo);
        })
}