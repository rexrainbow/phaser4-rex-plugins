import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../types';
import { ChessToTileXYZ } from './ChessToTileXYZ';
import { GetWrapTileXY } from './GetWrapTileXY';

export type DistanceConfig = {
    end?: number,
    start?: number,
    step?: number
};

export let GetTileXYAtDirection = function (
    board: IBaseBoard,
    chess: IChess | XYType,
    directions: number | number[] | string | null,
    distance: number | number[] | DistanceConfig,
    out?: XYType | XYType[] | true
): XYType | XYType[] | null {

    let srcTileXY = ChessToTileXYZ(board, chess);
    if (srcTileXY === null) {
        return null;
    }

    if (typeof (directions) === 'string') {
        if (directions.indexOf(',') === -1) {
            directions = parseInt(directions);
        } else {
            directions = directions.split('.').map((dir) => parseInt(dir, 10))
        }
    }

    let isNumberDirection = (typeof (directions) === 'number');
    let isNumberDistance = (typeof (distance) === 'number');
    if (isNumberDirection && isNumberDistance) {
        // Directions is a number, distance is a number, return a singl tileXY
        let result = board.grid.getTileXYAtDirection(
            srcTileXY,
            directions as number,
            distance as number,
            out as XYType | true
        ) as XYType;
        GetWrapTileXY(board, result.x, result.y, result);
        if ((result.x === null) || (result.y === null)) {
            result = null;
        }
        return result;
    }

    if (!Array.isArray(out)) {
        out = [];
    }
    if (directions === null) {
        directions = board.grid.allDirections;
    }

    let resultTileXY: XYType;
    if (isNumberDirection) {
        // Directions is a number, distance is an object or array
        if (Array.isArray(distance)) { // Distance is an array
            for (let i = 0, cnt = distance.length; i < cnt; i++) {
                resultTileXY = GetTileXYAtDirection(board, srcTileXY, directions, distance[i]) as XYType;
                if (resultTileXY !== null) {
                    out.push(resultTileXY);
                }
            }
        } else {
            let end: number,
                start: number,
                step: number;
            ({
                end = 1,
                start = ((end > 0) ? 1 : -1),
                step = ((end >= start) ? 1 : -1)
            } = distance as DistanceConfig);

            if (start === end) {
                resultTileXY = GetTileXYAtDirection(board, srcTileXY, directions, end) as XYType; // Return a single tileXY
                if (resultTileXY !== null) {
                    out.push(resultTileXY);
                }
            } else if (start < end) {
                for (let i = start; i <= end; i += step) {
                    resultTileXY = GetTileXYAtDirection(board, srcTileXY, directions, i) as XYType; // return a single tileXY
                    if (resultTileXY !== null) {
                        out.push(resultTileXY);
                    }
                }
            } else {
                for (let i = start; i >= end; i += step) {
                    resultTileXY = GetTileXYAtDirection(board, srcTileXY, directions, i) as XYType; // Return a single tileXY
                    if (resultTileXY !== null) {
                        out.push(resultTileXY);
                    }
                }
            }

        }

    } else { // Directions is a list
        for (let i = 0, cnt = (directions as number[]).length; i < cnt; i++) {
            if (isNumberDistance) { // Return a single tileXY
                resultTileXY = GetTileXYAtDirection(board, srcTileXY, directions[i], distance) as XYType;
                if (resultTileXY !== null) {
                    out.push(resultTileXY);
                }
            } else { // Append an array of tileXY
                GetTileXYAtDirection(board, srcTileXY, directions[i], distance, out);
            }

        }
    }

    return out;
}