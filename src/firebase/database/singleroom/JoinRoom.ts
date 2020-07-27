import { ISingleRoom } from './ISingleRoom';
import { JoinRoomEvent } from './events/JoinRoomEvent';

export function JoinRoom(
    room: ISingleRoom
): Promise<any> {

    return room.userList.join()
        .then(function () {
            room.emit(JoinRoomEvent);
            return Promise.resolve();
        })
}