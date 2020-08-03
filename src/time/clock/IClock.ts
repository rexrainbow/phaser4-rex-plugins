import {
    IConfig as ITickTaskConfig,
    TickingMode
} from '../../utils/ticktask/ITickTask';

export interface IState {
    isRunning?: boolean;
    timeScale?: number;
    now?: number;
    tickingMode?: TickingMode;
}

export interface IConfig extends ITickTaskConfig {
    isRunning?: boolean;
    timeScale?: number;
    now?: number;
}