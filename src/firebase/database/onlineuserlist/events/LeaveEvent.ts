export const LeaveEvent = 'leave';

import { UserInfoType } from '../IOnlineUserList';
export type LeaveEventHandler = (user: UserInfoType) => void;