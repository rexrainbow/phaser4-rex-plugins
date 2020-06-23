import {
    OrthogonalMap as OrthogonalMapIn,
    IsometricMap as IsometricMapIn,
    DirMapType
} from './DistanceToDeltaTileXY';

export type ReverseDirMapType = {
    [x: number]: {
        [y: number]: number
    }
}

let ReverseDirMap = function (dirMap: DirMapType): ReverseDirMapType {
    let out: ReverseDirMapType = {},
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