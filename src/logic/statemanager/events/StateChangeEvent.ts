export const StateChangeEvent = 'statechange';

import { StateNameType, IStateManager } from '../IStateManager';
export type StateChangeEventHandler = (stateManager: IStateManager) => void;