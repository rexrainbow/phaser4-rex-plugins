import { IBaseBoard, IConfig } from './IBaseBoard';
import { IGrid } from '../grid/IGrid';
import { IBoardData } from './boarddata/IBoardData';
import { BoardData, SetBoardWidth, SetBoardHeight } from './boarddata';

export class BaseBoard implements IBaseBoard {

    grid: IGrid;
    wrapMode: boolean;
    infinityMode: boolean;
    width: number | undefined;
    height: number | undefined;
    boardData: IBoardData;
    _isBoard: boolean;

    constructor({
        grid = undefined,
        wrap = false,
        inifinity = false,
        width = 0,
        height = 0
    }: IConfig = {}) {

        this.boardData = new BoardData();
        this._isBoard = true;
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

}