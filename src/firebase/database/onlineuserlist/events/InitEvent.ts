export const InitEvent = 'init';

import { UserInfoType } from '../IOnlineUserList';
export type InitEventHandler = (users: UserInfoType[]) => void;