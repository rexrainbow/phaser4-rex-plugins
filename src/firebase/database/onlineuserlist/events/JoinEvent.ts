export const JoinEvent = 'join';

import { UserInfoType } from '../IOnlineUserList';
export type JoinEventHandler = (user: UserInfoType) => void;