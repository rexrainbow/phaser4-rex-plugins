import { IAwayTime, IConfig, IState, State } from './IAwayTime';
export declare class AwayTime implements IAwayTime {
    state: State;
    key: string;
    period: number;
    timer: number;
    constructor(config?: IConfig);
    destroy(): void;
    fromJSON({ key, period }: IState): this;
    toJSON(): IState;
    get awayTime(): number;
    get curTime(): number;
    start(): this;
    stop(): this;
    updateTime(): this;
    setKey(key: string): this;
    setPeriod(time: number): this;
}
//# sourceMappingURL=AwayTime.d.ts.map