import { IFSM } from '../IFSM';

export function EnterStateEvent(state: string) {
    return `enter_${state}`
}

export type EnterStateEventHandler = (fsm: IFSM) => void;