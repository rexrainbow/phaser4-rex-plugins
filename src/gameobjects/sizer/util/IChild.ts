import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { ISizerState } from './ISizerState';

export interface IChild extends IContainer {
    rexSizer?: ISizerState;
}