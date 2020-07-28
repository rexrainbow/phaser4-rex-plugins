import { ISingleRoom, BroadcastConfig } from './ISingleRoom';
import { Broadcast } from '../broadcast';
import {
    JoinRoomEvent, LeaveRoomEvent, UserChangeNameEvent,
    ReceiveBroadcastMessageEvent
} from './events';

export function CreateBroadcast(
    room: ISingleRoom,
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

        receiverID: 'broadcast',
        senderID: room.userInfo,
        history: broadcast.history
    });

    room
        .on(JoinRoomEvent, function () {
            broadcastInstance
                .setRootPath(room.rootPath)
                .startReceiving();
        })
        .on(LeaveRoomEvent, function () {
            broadcastInstance
                .stopReceiving();
        })
        .on(UserChangeNameEvent, function (userID: string, userName: string) {
            broadcastInstance
                .changeUserName(userID, userName);
        })

    return broadcastInstance;
}