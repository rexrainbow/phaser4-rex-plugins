import {
    IRoom,
    IConfig
} from './IRoom';
import { OnlineUserList } from '../onlineuserlist';

export function CreateUserList(
    room: IRoom,
    { }: IConfig = {}
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

        userID: room.userInfo
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
    room: IRoom
): void {

    room.emit('room.leave');

    // Clear room info later
    setTimeout(function () {
        room.roomID = undefined;
        room.roomName = undefined;
        room.doorState = undefined;
        room.leftRoomFlag = false;
    }, 0);
}