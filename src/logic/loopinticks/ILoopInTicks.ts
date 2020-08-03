import { CurrentIndexesType } from '../loopindexgenerator/ILoopIndexGenerator';

export type TickCallbackType = (
    currentIndexes: CurrentIndexesType,
    loopInTicks: ILoopInTicks
) => void

export interface IConfig {
    callback?: TickCallbackType,
    scope?: unknown,
    deltaPercentage?: number
}

export interface ILoopInTicks {
    progress: number;
}