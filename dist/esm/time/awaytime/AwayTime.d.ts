import { IAwayTime, State } from './IAwayTime';
import { IConfig } from './IConfig';
export declare class AwayTime implements IAwayTime {
    state: State;
    key: string;
    period: number;
    timer: number;
    constructor(config?: IConfig);
    destroy(): void;
    resetFromJSON(config?: IConfig): this;
    toJSON(): object;
    get awayTime(): number;
    get curTime(): number;
    start(): this;
    stop(): this;
    updateTime(): this;
    setKey(key: string): this;
    setPeriod(time: number): this;
}
//# sourceMappingURL=AwayTime.d.ts.map