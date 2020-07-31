export const UserJoinRoomEvent = 'userlist.join';

import { UserInfoType } from '../IRoom';
export type UserJoinRoomEventHandler = (user: UserInfoType) => void;