import {
    IRoom,
    RoomInfoType
} from './IRoom';

export function GetRoomInfo(
    room: IRoom,
    roomID: string = room.roomID,
    roomName: string = room.roomName
): RoomInfoType {

    return {
        roomID: roomID,
        roomName: roomName
    };
}