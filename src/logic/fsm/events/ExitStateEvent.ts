export function ExitStateEvent(state: string) {
    return `exit_${state}`
}

import { IFSM } from '../IFSM';
export type ExitStateEventHandler = (fsm: IFSM) => void;