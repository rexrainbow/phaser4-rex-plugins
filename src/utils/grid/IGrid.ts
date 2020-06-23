export interface IGrid {
    x: number,
    y: number,
    width: number,
    height: number,
    _halfWidth: number,
    _halfHeight: number,

    mode: number,
    directions: number
};

import { PositionType } from '../types/PositionType';

export interface IRotateCallback {
    (
        grid: IGrid,
        srcTileXY: PositionType,
        dir: number,
        out?: PositionType | true
    )
        : PositionType;
};