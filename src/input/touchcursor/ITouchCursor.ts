import {
    IConfig as IVectorToCursorKeysConfig
} from '../../utils/input/VectorToCursorKeys';
import { IConfig as IEventEmitterConfig } from '../../utils/eventemitter/IBaseEventEmitter';

export interface IConfig extends IVectorToCursorKeysConfig, IEventEmitterConfig {
    radius?: number
}
