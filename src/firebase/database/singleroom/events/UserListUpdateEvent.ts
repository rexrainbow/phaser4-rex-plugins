export const UserListUpdateEvent = 'userlist.update';

import { UserInfoType } from '../ISingleRoom';
export type UserListUpdateEventHandler = (users: UserInfoType[]) => void;