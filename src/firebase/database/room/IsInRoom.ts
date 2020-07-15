import { IRoom } from './IRoom';

export function IsInRoom(
    room: IRoom,
    roomID?: string
): boolean {

    return (roomID === undefined) ? (room.roomID !== undefined) : (room.roomID === roomID);
}