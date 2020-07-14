import {
    IMatch,
    SymbolType,
    MatchResult,
    MatchCallbackType
} from './IMatch';
import { MatchAtDir } from './MatchAtDir';

export function MatchAll(
    match: IMatch,
    pattern: number | SymbolType[],
    callback?: MatchCallbackType,
    scope?: unknown,
    getFirst: boolean = false
): MatchResult | void {

    let board = match.board,
        grid = board.grid;
    let directions = grid.halfDirections,
        dir: number,
        dirMask = match.dirMask;
    let width = board.width,
        height = board.height;
    let result: MatchResult | false;
    for (let i = 0, cnt = directions.length; i < cnt; i++) {
        dir = directions[i];
        if (dirMask[dir] === false) {
            continue;
        }

        for (let tileY = 0; tileY < height; tileY++) {
            for (let tileX = 0; tileX < width; tileX++) {
                result = MatchAtDir(match, pattern, tileX, tileY, dir);
                if (result === false) {
                    continue;
                }

                if (callback) {
                    if (scope) {
                        callback.call(scope, result, board);
                    } else {
                        callback(result, board);
                    }
                }
                if (getFirst) {
                    return result;
                }
            }
        }
    }
}

export function MatchAny(
    match: IMatch,
    pattern: number | SymbolType[],
): MatchResult | false {

    let result = MatchAll(match, pattern, null, null, true);
    return (result) ? result : false;
}