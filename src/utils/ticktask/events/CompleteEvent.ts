export const CompleteEvent = 'complete';

import { ITickTask } from '../ITickTask';
export type CompleteEventHandler = (parent: any, behavior: ITickTask) => void;