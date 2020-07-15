import { ISingleRoom, BroadcastConfig } from './ISingleRoom';
import { Broadcast } from '../broadcast';

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
            receive: 'broadcast.receive'
        },

        receiverID: 'broadcast',
        senderID: room.userInfo,
        history: broadcast.history
    });

    room
        .on('room.join', function () {
            broadcastInstance
                .setRootPath(room.rootPath)                
                .startReceiving();
        })
        .on('room.leave', function () {
            broadcastInstance
                .stopReceiving();
        })
        .on('userlist.changename', function (userID: string, userName: string) {
            broadcastInstance
                .changeUserName(userID, userName);
        })

    return broadcastInstance;
}