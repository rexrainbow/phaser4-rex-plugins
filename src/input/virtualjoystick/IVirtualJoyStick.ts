import { IConfig as ITouchCursorConfig } from '../touchcursor/ITouchCursor';
import { IConfig as IEventEmitterConfig } from '../../utils/eventemitter/IBaseEventEmitter';
import { Container } from '@phaserjs/phaser/gameobjects/container';

export interface IConfig extends ITouchCursorConfig, IEventEmitterConfig {
    radius?: number;
    base?: Container;
    thumb?: Container;
    x?: number;
    y?: number;
    fixed?: boolean;
}