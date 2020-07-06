import { IBoardBase, IConfig } from './IBoardBase';
import { IGrid } from '../grid/IGrid';
import {
    IBoardData,
    IChess, XType, YType, ZType
} from './boarddata/IBoardData';
import { BoardData, SetBoardWidth, SetBoardHeight } from './boarddata';

import { AddChess } from './chess/AddChess';
import { RemoveChess } from './chess/RemoveChess';

export class BoardBase implements IBoardBase {

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

        // SetBoardWidth(this, width);
        // SetBoardHeight(this, height);
        return this;
    }


    addChess(
        chess: IChess,
        tileX: XType,
        tileY: YType,
        tileZ?: ZType,
        align: boolean = true
    ): this {

        // AddChess(this, chess, tileX, tileY, tileZ, align);
        return this;
    }

    removeChess(
        chess: IChess | null | undefined,
        tileX?: XType,
        tileY?: YType,
        tileZ?: ZType,
        destroy: boolean = false,
        fromBoardRemove: boolean = false
    ): this {

        // RemoveChess(this, chess, tileX, tileY, tileZ, destroy, fromBoardRemove);
        return this;
    }

}