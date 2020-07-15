import { IRoom } from './IRoom';
import { HasRoom } from './HasRoom';
import { GetRoomFilterRef } from './GetRefMethods';

export function ChangeFilterData(
    room: IRoom,
    filterData: { [key: string]: any },
    roomID: string = room.roomID
): Promise<any> {

    return HasRoom(room, roomID)
        .then(function (hasRoom) {

            if (!hasRoom) {
                return Promise.resolve();
            }

            return GetRoomFilterRef(room, roomID).child('data').update(filterData);
        })
}