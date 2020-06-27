export type XType = number;
export type YType = number;
export type ZType = number | string;
export type LogicPosType = {
    x: XType,
    y: YType,
    z: ZType
}
export type AnyKeyType = XType | YType | ZType;
export type ChessType = object;
export type ChessSetType = Set<ChessType>;
export type ZMapType = Map<ZType, ChessType>;

export interface IBoardData {
    chessToXYZ: Map<ChessType, LogicPosType>;
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
    addChess(chess: ChessType, x: XType, y: YType, z: ZType): this;
    getChess(x: XType, y: YType, z?: ZType): ChessType | ZMapType | undefined;
    removeChess(x: XType, y: YType, z?: ZType): this;
    hasChess(chess: ChessType): boolean;
    contains(x: XType, y: YType, z?: ZType): boolean;
    getXYZ(chess: ChessType): LogicPosType | undefined;
}