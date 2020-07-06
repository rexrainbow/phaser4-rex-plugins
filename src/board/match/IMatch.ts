import { IBaseBoard } from '../board/IBaseBoard';
import { XYType } from '../types';

export { IBaseBoard, XYType };

export type DirMaskType = { [dir: number]: boolean };

export type SymbolType = string | number | null;

export type MatchResult = {
    tileXY: XYType[],
    direction: number,
    pattern: number | SymbolType[]
}

export type GetSymbolCallback = (tileXY: XYType, board: IBaseBoard) => SymbolType;
export type MatchCallbackType = (result: MatchResult, board: IBaseBoard) => void;
export type ForEachSymbolCallback = (symbol: SymbolType, tileXY: XYType, board: IBaseBoard) => void

export interface IConfig {
    board?: IBaseBoard;
    wildcard?: SymbolType;
    dirMask?: DirMaskType;
}

export interface IMatch {
    board: IBaseBoard;
    wildcard: SymbolType;
    dirMask: DirMaskType;

    getSymbol(
        tileX: number,
        tileY: number
    ): SymbolType;
}