import { IRoom } from './IRoom';
import { HasRoom } from './HasRoom';
import { GetRootRef } from './GetRefMethods';

export function ChangeRoomName(
    room: IRoom,
    roomName: string,
    roomID: string = room.roomID
): Promise<any> {

    return HasRoom(room, roomID)
        .then(function (hasRoom) {

            if (!hasRoom) {
                return Promise.resolve();
            }

            const d = {};
            d[`room-filters/${roomID}/name`] = roomName;
            d[`room-metadata/${roomID}/name`] = roomName;
            return GetRootRef(room).update(d);
        })
}