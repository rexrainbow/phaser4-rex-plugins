import { IFSM } from '../IFSM';

export const StateChangeEvent = 'statechange';

export type StateChangeEventHandler = (fsm: IFSM) => void;