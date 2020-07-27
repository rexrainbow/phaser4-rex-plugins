export const UserLeaveRoomEvent = 'userlist.leave';

import { UserInfoType } from '../ISingleRoom';
export type UserLeaveRoomEventandler = (user: UserInfoType) => void;