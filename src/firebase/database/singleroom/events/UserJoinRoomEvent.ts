export const UserJoinRoomEvent = 'userlist.join';

import { UserInfoType } from '../ISingleRoom';
export type UserJoinRoomEventHandler = (user: UserInfoType) => void;