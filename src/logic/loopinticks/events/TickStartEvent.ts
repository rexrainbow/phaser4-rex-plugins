export const TickStartEvent = 'tickstart';

import { ILoopInTicks } from '../ILoopInTicks';
export type TickStartEventHandler = (loopInTicks: ILoopInTicks) => void;