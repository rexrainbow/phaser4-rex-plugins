import { Vec2Type } from '../utils/types/VectorType';
import { IChessData } from './board/chessdata/IChessData';

export type XType = number;
export type YType = number;
export type ZType = number | string;
export type AnyKeyType = XType | YType | ZType;
export type XYType = {
    x: XType,
    y: YType
}
export type XYZType = {
    x: XType,
    y: YType,
    z: ZType
}
export { Vec2Type };
export interface IChess {
    rexChess?: IChessData;
    x: number,
    y: number,
    destroy?: () => unknown;
};
export type ChessSetType = Set<IChess>;
export type ZMapType = Map<ZType, IChess>;