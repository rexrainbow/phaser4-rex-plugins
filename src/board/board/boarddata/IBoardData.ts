import { XType, YType, ZType, XYZType, IChess } from '../ILogicBoard';
export { XType, YType, ZType, XYZType, IChess };

export type AnyKeyType = XType | YType | ZType;
export type ChessSetType = Set<IChess>;
export type ZMapType = Map<ZType, IChess>;

export interface IBoardData {
    chessToXYZ: Map<IChess, XYZType>;
    XYToZMap: Map<string, ZMapType>;
    XToChessSet: Map<XType, ChessSetType>;
    YToChessSet: Map<YType, ChessSetType>;
    ZToChessSet: Map<ZType, ChessSetType>;

    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;

    destroy(): void;
    clear(): this;
    addChess(chess: IChess, x: XType, y: YType, z: ZType): this;
    getChess(x: XType, y: YType, z?: ZType): IChess | ZMapType | undefined;
    removeChess(x: XType, y: YType, z?: ZType): this;
    hasChess(chess: IChess): boolean;
    contains(x: XType, y: YType, z?: ZType): boolean;
    getXYZ(chess: IChess): XYZType | undefined;
}