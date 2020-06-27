import { IGrid } from '../grid/IGrid';

export interface IConfig {
    isBoard?: boolean;
    grid?: IGrid;
    wrap?: boolean;
    inifinity?: boolean;
    width?: number;
    height?: number;

}

export interface ILogicBoard {
    isBoard: boolean;
    grid: IGrid;
    wrapMode: boolean;
    infinityMode: boolean;
    width: number | undefined;
    height: number | undefined;

    destroy(): void;
    setWrapMode(mode?: boolean): this;
    setInfinityMode(mode?: boolean): this;
    setBoardSize(width?: number, height?: number): this;
    setBoardWidth(width?: number): this;
    setBoardHeight(height?: number): this;
}