import { IBoardData } from './IBoardData';
import { XType, YType, ZType, XYZType, IChess, ZMapType, ChessSetType } from '../../Types';
import { AddChess } from './methods/AddChess';
import { GetChess } from './methods/GetChess';
import { RemoveChess } from './methods/RemoveChess';
import { HasChess } from './methods/HasChess';
import { Contains } from './methods/Contains';
import { GetXYZ } from './methods/GetXYZ';
import { GetMaxMapKey, GetMinMapKey } from './methods/GetMaxMinMapKey';

export class BoardData implements IBoardData {
    chessToXYZ: Map<IChess, XYZType> = new Map(); // {chess: {x,y,z}}
    XYToZMap: Map<string, Map<ZType, IChess>> = new Map(); // {'x|y': {z:chess}}
    XToChessSet: Map<XType, ChessSetType> = new Map(); // {x, [chess]}
    YToChessSet: Map<YType, ChessSetType> = new Map(); // {y, [chess]}
    ZToChessSet: Map<ZType, ChessSetType> = new Map(); // {z, [chess]}

    _xMax: number | undefined = undefined;
    _xMin: number | undefined = undefined;
    _yMax: number | undefined = undefined;
    _yMin: number | undefined = undefined;

    destroy(): void {
        this.clear();
    }

    clear(): this {
        this.chessToXYZ.clear();
        this.XYToZMap.clear();
        this.XToChessSet.clear();
        this.YToChessSet.clear();
        this.ZToChessSet.clear();
        this.clearBounds();
        return this;
    }

    clearBounds(): this {
        this._xMax = undefined;
        this._xMin = undefined;
        this._yMax = undefined;
        this._yMin = undefined;
        return this;
    }

    addChess(
        chess: IChess,
        x: XType,
        y: YType,
        z: ZType
    ): this {

        AddChess(this, chess, x, y, z);
        this.clearBounds();
        return this;
    }

    getChess(
        x: XType,
        y: YType,
        z?: ZType
    ): IChess | ZMapType | null {

        return GetChess(this, x, y, z);
    }

    removeChess(
        x: XType,
        y: YType,
        z?: ZType
    ): this {

        RemoveChess(this, x, y, z);
        this.clearBounds();
        return this;
    }

    hasChess(
        chess: IChess
    ): boolean {

        return HasChess(this, chess);
    }

    contains(
        x: XType,
        y: YType,
        z?: ZType
    ): boolean {

        return Contains(this, x, y, z);
    }

    getXYZ(
        chess: IChess
    ): XYZType | null {

        return GetXYZ(this, chess);
    }

    get xMax() {
        if (this._xMax === undefined) {
            this._xMax = GetMaxMapKey(this.XToChessSet);
        }
        return this._xMax;
    }

    get xMin() {
        if (this._xMin === undefined) {
            this._xMin = GetMinMapKey(this.XToChessSet);
        }
        return this._xMin;
    }

    get yMax() {
        if (this._yMax === undefined) {
            this._yMax = GetMaxMapKey(this.YToChessSet);
        }
        return this._yMax;
    }

    get yMin() {
        if (this._yMin === undefined) {
            this._yMin = GetMinMapKey(this.YToChessSet);
        }
        return this._yMin;
    }
}


