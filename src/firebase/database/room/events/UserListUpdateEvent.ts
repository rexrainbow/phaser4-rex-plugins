export const UserListUpdateEvent = 'userlist.update';

import { UserInfoType } from '../IRoom';
export type UserListUpdateEventHandler = (users: UserInfoType[]) => void;