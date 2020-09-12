import { StateNameType, IStateManager } from '../IStateManager';

export function ExitStateEvent(name: StateNameType) {
    return `exit_${name.toString()}`
}

export type ExitStateEventHandler = (stateManager: IStateManager) => void;