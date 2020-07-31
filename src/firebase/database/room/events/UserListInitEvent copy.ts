export const UserListInitEvent = 'userlist.init';

import { UserInfoType } from '../ISingleRoom';
export type UserListInitEventHandler = (users: UserInfoType[]) => void;