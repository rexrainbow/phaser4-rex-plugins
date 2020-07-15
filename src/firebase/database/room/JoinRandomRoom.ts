import {
    IRoom,
    RoomInfoType,
    IJoinRandomRoomConfig, IJoinRoomConfig, RoomFilterDataType
} from './IRoom';
import { Shuffle } from '../../../utils/array/Shuffle';
import { GetRoomList } from './GetRoomList';
import { JoinRoom } from './JoinRoom';

export function JoinRandomRoom(
    room: IRoom,
    {
        roomType = '',
        leftThenJoin = true
    }: IJoinRandomRoomConfig = {}
): Promise<RoomInfoType> {

    return GetRoomList(room, roomType, 'open')
        .then(function (rooms: RoomFilterDataType[]) {
            Shuffle(rooms);
            const config = {
                leftThenJoin: leftThenJoin,
                roomID: ''
            };
            return JoinNextRoom(room, config, rooms);
        })
}

function JoinNextRoom(
    room: IRoom,
    config: IJoinRoomConfig,
    rooms: RoomFilterDataType[],
    index: number = 0
): Promise<RoomInfoType> {

    if (index === rooms.length) {
        return Promise.reject();
    }

    config.roomID = rooms[index].roomID;
    index++;
    return JoinRoom(room, config)
        .catch(function () {
            return JoinNextRoom(room, config, rooms, index);
        })
}
