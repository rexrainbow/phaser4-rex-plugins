import { IBoardBase } from '../board/IBoardBase';
import { XYType } from '../types';

export { IBoardBase, XYType };

export type DirMaskType = { [dir: number]: boolean };

export type SymbolType = string | number | null;

export type MatchResult = {
    tileXY: XYType[],
    direction: number,
    pattern: number | SymbolType[]
}

export type GetSymbolCallback = (tileXY: XYType, board: IBoardBase) => SymbolType;
export type MatchCallbackType = (result: MatchResult, board: IBoardBase) => void;
export type ForEachSymbolCallback = (symbol: SymbolType, tileXY: XYType, board: IBoardBase) => void

export interface IConfig {
    board?: IBoardBase;
    wildcard?: SymbolType;
    dirMask?: DirMaskType;
}

export interface IMatch {
    board: IBoardBase;
    wildcard: SymbolType;
    dirMask: DirMaskType;

    getSymbol(
        tileX: number,
        tileY: number
    ): SymbolType;
}