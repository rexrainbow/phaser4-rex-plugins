export const UserLeaveRoomEvent = 'userlist.leave';

import { UserInfoType } from '../ISingleRoom';
export type UserLeaveRoomEventHandler = (user: UserInfoType) => void;