export const ReceiveMessageEvent = 'receive';

import { IMessage } from '../IMessages';
export type ReceiveMessageEventHandler = (message: IMessage) => void;