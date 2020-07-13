import {
    OrthogonalMap as OrthogonalMapIn,
    IsometricMap as IsometricMapIn,
    DirectionToDeltaXYType
} from './DirectionToDeltaXY';

export type DeltaXYToDirectionType = {
    [x: number]: {
        [y: number]: number
    }
}

function ReverseDirMap(
    dirMap: DirectionToDeltaXYType
): DeltaXYToDirectionType {

    let out: DeltaXYToDirectionType = {},
        entry: [number, number],
        x: number,
        y: number;
    for (let dir in dirMap) {
        entry = dirMap[dir]; // [x, y]
        x = entry[0];
        y = entry[1];
        if (!out.hasOwnProperty(x)) {
            out[x] = {}
        }
        out[x][y] = parseInt(dir);
    }
    return out;
}

const OrthogonalMapOut = ReverseDirMap(OrthogonalMapIn);
const IsometricMapOut = ReverseDirMap(IsometricMapIn);

export {
    OrthogonalMapOut as OrthogonalMap,
    IsometricMapOut as IsometricMap
};