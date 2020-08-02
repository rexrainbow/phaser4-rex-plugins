export const TickEndEvent = 'tickend';

import { ILoopInTicks } from '../ILoopInTicks';
export type TickEndEventHandler = (loopInTicks: ILoopInTicks) => void;