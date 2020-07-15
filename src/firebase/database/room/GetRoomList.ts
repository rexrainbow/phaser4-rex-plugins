import {
    IRoom,
    RoomStateType, RoomFilterDataType
} from './IRoom';
import { GetRoomListQuery } from './GetRefMethods';

export function GetRoomList(
    room: IRoom,
    roomType: string,
    roomState: RoomStateType
): Promise<RoomFilterDataType[]> {

    return new Promise(function (resolve, reject) {
        room.roomList
            .once('roomlist.update', function (rooms: RoomFilterDataType[]) {
                resolve(rooms)
            })
            .startUpdate(GetRoomListQuery(room, roomType, roomState));
    })
}