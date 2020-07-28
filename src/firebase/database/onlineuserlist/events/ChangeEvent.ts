export const ChangeEvent = 'change';

import { UserInfoType } from '../IOnlineUserList';
export type ChangeEventHandler = (currUserInfo: UserInfoType, prevUserInfo: UserInfoType) => void;