export const ReceiveMessageEvent = 'receive';

import { IMessage } from '../IBroadcast';
export type ReceiveMessageEventHandler = (message: IMessage) => void;