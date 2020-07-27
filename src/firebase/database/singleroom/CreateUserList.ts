import { ISingleRoom, IConfig } from './ISingleRoom';
import { OnlineUserList } from '../onlineuserlist';
import { GetUserListPath } from './GetRefMethods';
import {
    JoinRoomEvent, LeaveRoomEvent,
    UserJoinRoomEvent, UserLeaveRoomEvent, UserChangeNameEvent,
    UserListUpdateEvent, UserListInitEvent
} from './events';

export function CreateUserList(
    room: ISingleRoom,
    maxUsers: number = 0
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

        root: GetUserListPath(room),
        userID: room.userInfo,
        maxUsers: maxUsers
    });

    userListInstance
        .on(UserLeaveRoomEvent, function (user) {
            if (user.userID === room.userID) {
                OnLeftRoom(room);  // Current user is left or kicked
            }
        })

    room
        .on(JoinRoomEvent, function () {
            userListInstance
                .startUpdate();
        })
        .on(LeaveRoomEvent, function () {
            userListInstance
                .stopUpdate()
                .clear();
        })

    return userListInstance;
}

function OnLeftRoom(
    room: ISingleRoom
): void {

    room.emit(LeaveRoomEvent);

    // Clear room info later
    setTimeout(function () {
        room.leftRoomFlag = false;
    }, 0);
}