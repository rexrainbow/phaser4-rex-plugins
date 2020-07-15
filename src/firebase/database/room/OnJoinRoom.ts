import { IRoom } from './IRoom';
import { GetRoomInfo } from './GetRoomInfo';

export function OnJoinRoom(
    room: IRoom,
    roomID: string,
    roomName: string,
    roomType: string
): void {

    room.roomID = roomID;
    room.roomName = roomName;
    room.roomType = roomType;

    room.emit('room.join', GetRoomInfo(room));
}