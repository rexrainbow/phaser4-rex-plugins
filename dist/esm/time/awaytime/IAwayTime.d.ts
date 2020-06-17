export declare enum State {
    IDLE = 0,
    UPDATING = 1
}
export interface IConfig {
    key?: string;
    period?: number;
}
export interface IState {
    key?: string;
    period?: number;
}
export interface IAwayTime {
    state: State;
    key: string;
    period: number;
    timer: number;
    awayTime: number;
}
//# sourceMappingURL=IAwayTime.d.ts.map