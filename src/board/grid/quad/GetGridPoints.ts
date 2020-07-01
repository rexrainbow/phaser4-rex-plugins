import { IQuadBase, LayoutMode } from './IQuadBase';
import { PositionType } from '../IGrid';
import { FillPositionArray } from '../utils/FillPositionArray';
import { GetWorldXY } from './GetWorldXY';

export let GetGridPoints = function (
    quad: IQuadBase,
    tileX: number | PositionType = 0,
    tileY: number = 0,
    out: PositionType[] | true = []
): PositionType[] {

    if (typeof (tileX) === 'object') {
        let tileXY = tileX;
        tileY = tileXY.y;
        tileX = tileXY.x;
    }
    if (out === true) {
        out = globPoints;
    }

    FillPositionArray(4, out);

    let x: number,
        y: number;
    ({ x, y } = GetWorldXY(quad, tileX, tileY))

    let halfW = quad._halfWidth;
    let halfH = quad._halfHeight;
    switch (quad.mode) {
        case LayoutMode.orthogonal:
            // top-right
            out[0].x = x + halfW;
            out[0].y = y - halfH;
            // bottom-right
            out[1].x = x + halfW;
            out[1].y = y + halfH;
            // bottom-left
            out[2].x = x - halfW;
            out[2].y = y + halfH;
            // top-left
            out[3].x = x - halfW;
            out[3].y = y - halfH;
            break;
        case LayoutMode.isometric:
            // 0
            out[0].x = x + halfW;
            out[0].y = y;
            // 90
            out[1].x = x;
            out[1].y = y + halfH;
            // 180
            out[2].x = x - halfW;
            out[2].y = y;
            // 270
            out[3].x = x;
            out[3].y = y - halfH;
            break;
    }

    return out;
}

var globPoints: PositionType[] = []