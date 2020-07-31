import {
    IRoom,
    BroadcastConfig, RoomInfoType
} from './IRoom';
import { Broadcast } from '../broadcast';
import { GetRoomDataPath } from './GetRefMethods';
import {
    JoinRoomEvent, LeaveRoomEvent, UserChangeNameEvent,
    ReceiveBroadcastMessageEvent
} from './events';

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
            receive: ReceiveBroadcastMessageEvent
        },

        receiverID: 'boradcast',
        senderID: room.userInfo,
        history: broadcast.history
    });

    room
        .on(JoinRoomEvent, function (roomInfo: RoomInfoType) {

            broadcastInstance
                .setRootPath(GetRoomDataPath(room, roomInfo.roomID))
                .startReceiving();
        })
        .on(LeaveRoomEvent, function () {

            broadcastInstance
                .stopReceiving()
        })
        .on(UserChangeNameEvent, function (userID: string, userName: string) {

            broadcastInstance
                .changeUserName(userID, userName);
        })

    return broadcastInstance;
}