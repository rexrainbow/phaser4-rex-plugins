import {
    IRoom,
    BroadcastConfig, RoomInfoType
} from './IRoom';
import { Broadcast } from '../broadcast';
import { GetRoomDataPath } from './GetRefMethods';

export function CreateBroadcast(
    room: IRoom,
    broadcast: boolean | BroadcastConfig
): Broadcast {

    if (!broadcast) {
        return null;
    } else if (broadcast === true) {
        broadcast = {
            history: false
        }
    }

    const broadcastInstance = new Broadcast({
        eventEmitter: room.eventEmitter,
        eventNames: {
            receive: 'broadcast.receive'
        },

        receiverID: 'boradcast',
        senderID: room.userInfo,
        history: broadcast.history
    });

    room
        .on('room.join', function (roomInfo: RoomInfoType) {

            broadcastInstance
                .setRootPath(GetRoomDataPath(room, roomInfo.roomID))
                .startReceiving();
        })
        .on('room.leave', function () {

            broadcastInstance
                .stopReceiving()
        })
        .on('userlist.changename', function (userID: string, userName: string) {

            broadcastInstance
                .changeUserName(userID, userName);
        })

    return broadcastInstance;
}