export enum State {
    IDLE, UPDATING
};

export interface IAwayTime {
    state: State;
    key: string;
    period: number;
    timer: number;

    awayTime: number;
}