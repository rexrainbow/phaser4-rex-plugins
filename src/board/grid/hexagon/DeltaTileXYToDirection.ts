import {
    DirectionToDeltaTileXY,
    DirectionToDeltaXYEntryType
} from './DirectionToDeltaTileXY';

type DeltaXYToDirectionEntryType = {
    [x: number]: {
        [y: number]: number
    }
}

let ReverseDirMap = function (
    dirMap: DirectionToDeltaXYEntryType
): DeltaXYToDirectionEntryType {

    let out: DeltaXYToDirectionEntryType = {},
        x: number, y: number;
    for (let dir in dirMap) {
        ([x, y] = dirMap[dir]);
        if (!out.hasOwnProperty(x)) {
            out[x] = {}
        }
        out[x][y] = parseInt(dir);
    }
    return out;
}

type ParityToDirectionType = DeltaXYToDirectionEntryType[];
export type DeltaTileXYToDirectionType = ParityToDirectionType[];
export let DeltaTileXYToDirection: DeltaTileXYToDirectionType = [
    [
        ReverseDirMap(DirectionToDeltaTileXY[0][0]),
        ReverseDirMap(DirectionToDeltaTileXY[0][1])
    ],
    [
        ReverseDirMap(DirectionToDeltaTileXY[1][0]),
        ReverseDirMap(DirectionToDeltaTileXY[1][1])
    ],
    [
        ReverseDirMap(DirectionToDeltaTileXY[2][0]),
        ReverseDirMap(DirectionToDeltaTileXY[2][1])
    ],
    [
        ReverseDirMap(DirectionToDeltaTileXY[3][0]),
        ReverseDirMap(DirectionToDeltaTileXY[3][1])
    ]
];
// DeltaTileXYToDirection[mode][parity][x][y]: dir