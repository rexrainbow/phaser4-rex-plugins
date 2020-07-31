export const UserListInitEvent = 'userlist.init';

import { UserInfoType } from '../IRoom';
export type UserListInitEventHandler = (users: UserInfoType[]) => void;