import {
    IState as IClockState,
    IConfig as IClockConfig
} from '../clock/IClock';

export interface IState extends IClockState {
    lifeTime?: number;
    destroy?: boolean;
}

export interface IConfig extends IClockConfig {
    lifeTime?: number;
    destroy?: boolean;
}