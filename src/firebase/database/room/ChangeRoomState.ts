import {
    IRoom,
    RoomStateType
} from './IRoom';
import { HasRoom } from './HasRoom';
import { GetFilterString } from './RoomFilterMethods';
import { GetRootRef } from './GetRefMethods';

export function ChangeRoomState(
    room: IRoom,
    roomState: RoomStateType,
    roomID: string = room.roomID
): Promise<any> {

    return HasRoom(room, roomID)
        .then(function (hasRoom) {

            if (!hasRoom) {
                return Promise.resolve();
            }

            const filter = GetFilterString(roomState, room.roomType);
            const d = {};
            d[`room-filters/${roomID}/filter`] = filter;
            d[`room-metadata/${roomID}/filter`] = filter;
            return GetRootRef(room).update(d);
        })
}

export function OpenRoom(
    room: IRoom,
    roomID: string = room.roomID
): Promise<any> {

    return ChangeRoomState(room, 'open', roomID);
}

export function CloseRoom(
    room: IRoom,
    roomID: string = room.roomID
): Promise<any> {

    return ChangeRoomState(room, 'closed', roomID);
}