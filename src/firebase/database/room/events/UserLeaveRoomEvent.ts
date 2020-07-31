export const UserLeaveRoomEvent = 'userlist.leave';

import { UserInfoType } from '../IRoom';
export type UserLeaveRoomEventHandler = (user: UserInfoType) => void;