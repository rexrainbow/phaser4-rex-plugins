export const StateChangeEvent = 'statechange';

import { IFSM } from '../IFSM';
export type StateChangeEventHandler = (fsm: IFSM) => void;