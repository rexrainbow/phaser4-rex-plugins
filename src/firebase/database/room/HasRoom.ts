import { IRoom } from './IRoom';
import { GetRoomMetadataRef } from './GetRefMethods';

export function HasRoom(
    room: IRoom,
    roomID: string
): Promise<boolean> {

    if (roomID === room.roomID) {
        return Promise.resolve(true);
    }

    return GetRoomMetadataRef(room, roomID).once('value')
        .then(function (snapshot) {
            const hasRoom = (snapshot.val() !== null);
            return Promise.resolve(hasRoom);
        })
}