
export const ReceiveBroadcastMessageEvent = 'broadcast.receive';

import { IMessage } from '../../broadcast/IBroadcast';
export type ReceiveBroadcastMessageEventHandler = (message: IMessage) => void;