import {
    ILogicBoard,
    XYType
} from '../board/ILogicBoard';

export { ILogicBoard, XYType };

export type DirMaskType = { [dir: number]: boolean };

export type SymbolType = string | number | null;

export type MatchResult = {
    tileXY: XYType[],
    direction: number,
    pattern: number | SymbolType[]
}

export type GetSymbolCallback = (tileXY: XYType, board: ILogicBoard) => SymbolType;
export type MatchCallbackType = (result: MatchResult, board: ILogicBoard) => void;
export type ForEachSymbolCallback = (symbol: SymbolType, tileXY: XYType, board: ILogicBoard) => void

export interface IConfig {
    board?: ILogicBoard;
    wildcard?: SymbolType;
    dirMask?: DirMaskType;
}

export interface IMatch {
    board: ILogicBoard;
    wildcard: SymbolType;
    dirMask: DirMaskType;

    getSymbol(
        tileX: number,
        tileY: number
    ): SymbolType;
}