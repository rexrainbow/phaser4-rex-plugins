export const UpdateEvent = 'update';

import { UserInfoType } from '../IOnlineUserList';
export type UpdateEventHandler = (users: UserInfoType[]) => void;