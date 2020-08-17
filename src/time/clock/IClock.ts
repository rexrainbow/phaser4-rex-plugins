import {
    IConfig as ITickTaskConfig,
    TickingMode
} from '../../utils/ticktask/ITickTask';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { BaseWorld } from '@phaserjs/phaser/world/BaseWorld';
import { GameObject } from '@phaserjs/phaser/gameobjects/GameObject';

export interface IState {
    isRunning?: boolean;
    timeScale?: number;
    now?: number;
    tickingMode?: TickingMode;
}

export interface IConfig extends ITickTaskConfig {
    updater?: Scene | BaseWorld | GameObject;
    isRunning?: boolean;
    timeScale?: number;
    now?: number;
}