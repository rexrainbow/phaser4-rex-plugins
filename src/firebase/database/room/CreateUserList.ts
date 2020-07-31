import {
    IRoom,
    IConfig
} from './IRoom';
import { OnlineUserList } from '../onlineuserlist';
import {
    JoinRoomEvent, LeaveRoomEvent,
    UserJoinRoomEvent, UserLeaveRoomEvent, UserChangeNameEvent,
    UserListUpdateEvent, UserListInitEvent
} from './events';

export function CreateUserList(
    room: IRoom
): OnlineUserList {

    const userListInstance = new OnlineUserList({
        eventEmitter: room.eventEmitter,
        eventNames: {
            join: UserJoinRoomEvent,
            leave: UserLeaveRoomEvent,
            update: UserListUpdateEvent,
            change: 'userlist.change',
            init: UserListInitEvent,
            changename: UserChangeNameEvent
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
        .on(JoinRoomEvent, function () {
            userListInstance.startUpdate()
        })
        .on(LeaveRoomEvent, function () {
            userListInstance.stopUpdate().clear()
        })

    return userListInstance;
}

function OnLeftRoom(
    room: IRoom
): void {

    room.emit(LeaveRoomEvent);

    // Clear room info later
    setTimeout(function () {
        room.roomID = undefined;
        room.roomName = undefined;
        room.doorState = undefined;
        room.leftRoomFlag = false;
    }, 0);
}