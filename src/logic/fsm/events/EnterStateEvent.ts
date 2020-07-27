export function EnterStateEvent(state: string) {
    return `enter_${state}`
}

import { IFSM } from '../IFSM';
export type EnterStateEventHandler = (fsm: IFSM) => void;