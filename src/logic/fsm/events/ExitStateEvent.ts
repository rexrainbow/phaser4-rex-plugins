import { IFSM } from '../IFSM';

export function ExitStateEvent(state: string) {
    return `exit_${state}`
}

export type ExitStateEventHandler = (fsm: IFSM) => void;