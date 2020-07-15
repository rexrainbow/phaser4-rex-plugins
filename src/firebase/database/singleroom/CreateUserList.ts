import { ISingleRoom, IConfig } from './ISingleRoom';
import { OnlineUserList } from '../onlineuserlist';
import { GetUserListPath } from './GetRefMethods';

export function CreateUserList(
    room: ISingleRoom,
    maxUsers: number = 0
): OnlineUserList {

    const userListInstance = new OnlineUserList({
        eventEmitter: room.eventEmitter,
        eventNames: {
            join: 'userlist.join',
            leave: 'userlist.leave',
            update: 'userlist.update',
            change: 'userlist.change',
            init: 'userlist.init',
            changename: 'userlist.changename'
        },

        root: GetUserListPath(room),
        userID: room.userInfo,
        maxUsers: maxUsers
    });

    userListInstance
        .on('userlist.leave', function (user) {
            if (user.userID === room.userID) {
                OnLeftRoom(room);  // Current user is left or kicked
            }
        })

    room
        .on('room.join', function () {
            userListInstance.startUpdate()
        })
        .on('room.leave', function () {
            userListInstance.stopUpdate().clear()
        })

    return userListInstance;
}

function OnLeftRoom(
    room: ISingleRoom
): void {

    room.emit('room.leave');

    // Clear room info later
    setTimeout(function () {
        room.leftRoomFlag = false;
    }, 0);
}