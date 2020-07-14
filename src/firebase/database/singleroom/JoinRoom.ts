import { ISingleRoom } from './ISingleRoom';

export function JoinRoom(
    room: ISingleRoom
): Promise<any> {

    return room.userList.join()
        .then(function () {
            room.emit('room.join');
            return Promise.resolve();
        })
}