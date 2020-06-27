import { ILogicBoard, IConfig } from './ILogicBoard';
import { IGrid } from '../grid/IGrid';
import { SetBoardWidth } from './boarddata/SetBoardWidth';
import { SetBoardHeight } from './boarddata/SetBoardHeight';

export class LogicBoard implements ILogicBoard {
    isBoard: boolean;
    grid: IGrid;
    wrapMode: boolean;
    infinityMode: boolean;
    width: number | undefined;
    height: number | undefined;

    constructor({
        isBoard = true,
        grid = undefined,
        wrap = false,
        inifinity = false,
        width = 0,
        height = 0
    }: IConfig = {}) {

        this.isBoard = isBoard;
        this.setGrid(grid);
        this.setWrapMode(wrap);
        this.setInfinityMode(inifinity);
        this.setBoardSize(width, height);
    }

    destroy() {

    }

    setGrid(grid?: IGrid): this {

        this.grid = grid;
        return this;
    }

    setWrapMode(mode: boolean = true): this {

        this.wrapMode = mode;
        return this;
    }

    setInfinityMode(mode: boolean = true): this {

        this.infinityMode = mode;
        return this;
    }

    setBoardSize(width: number = 0, height: number = 0): this {

        SetBoardWidth(this, width);
        SetBoardHeight(this, height);
        return this;
    }

    setBoardWidth(width: number = 0): this {

        SetBoardWidth(this, width);
        return this
    }

    setBoardHeight(height: number = 0): this {

        SetBoardHeight(this, height);
        return this;
    }
}