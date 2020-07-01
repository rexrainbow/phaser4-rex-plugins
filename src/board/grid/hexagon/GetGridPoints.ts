import { IHexagonBase, StaggerAxis } from './IHexagonBase';
import { PositionType } from '../IGrid';
import { FillPositionArray } from '../utils/FillPositionArray';
import { GetWorldXY } from './GetWorldXY';
import { DegToRad } from '../../../utils/math/angle/DegToRad';

export let GetGridPoints = function (
    hexagon: IHexagonBase,
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

    FillPositionArray(6, out);

    let x: number,
        y: number;
    ({ x, y } = GetWorldXY(hexagon, tileX, tileY))

    if (hexagon.radius !== undefined) {
        let radius = hexagon.radius;
        let angleOffset = (hexagon.staggerAxis === StaggerAxis.flat) ? 0 : -30;
        for (let i = 0; i < 6; i++) {
            let angleDeg = (60 * i) + angleOffset;
            let angleRad = DegToRad(angleDeg);
            out[i].x = x + radius * Math.cos(angleRad);
            out[i].y = y + radius * Math.sin(angleRad);
        }

    } else {
        var halfW = hexagon._halfWidth;
        var quarterW = halfW / 2;
        var halfH = hexagon._halfHeight;
        var quarterH = halfH / 2;
        if (hexagon.staggerAxis === StaggerAxis.flat) {
            out[0].x = x + halfW;
            out[0].y = y;

            out[1].x = x + quarterW;
            out[1].y = y + halfH;

            out[2].x = x - quarterW;
            out[2].y = y + halfH;

            out[3].x = x - halfW;
            out[3].y = y;

            out[4].x = x - quarterW;
            out[4].y = y - halfH;

            out[5].x = x + quarterW;
            out[5].y = y - halfH;
        } else { // StaggerAxis.pointy
            out[0].x = x + halfW;
            out[0].y = y - quarterH;

            out[1].x = x + halfW;
            out[1].y = y + quarterH;

            out[2].x = x;
            out[2].y = y + halfH;

            out[3].x = x - halfW;
            out[3].y = y + quarterH;

            out[4].x = x - halfW;
            out[4].y = y - quarterH;

            out[5].x = x;
            out[5].y = y - halfH;
        }
    }

    return out;
}

var globPoints: PositionType[] = []