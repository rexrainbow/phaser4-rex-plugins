import { StateNameType, IStateManager } from '../IStateManager';

export function EnterStateEvent(name: StateNameType) {
    return `enter_${name.toString()}`
}

export type EnterStateEventHandler = (stateManager: IStateManager) => void;