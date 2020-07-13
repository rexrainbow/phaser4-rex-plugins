import {
    IMatch,
    SymbolType,
    MatchResult
} from './IMatch';
import { XYType } from '../Types';
import { Nieghbors } from '../board'

export let MatchAtDir = function (
    match: IMatch,
    pattern: number | SymbolType[],
    startTileX: number,
    startTileY: number,
    direction: number
): MatchResult | false {

    let matchNMode = typeof (pattern) === 'number';
    let patternLength: number,
        currSymbol: SymbolType | null;
    if (matchNMode) {
        patternLength = pattern as number;
        currSymbol = null;
    } else {
        patternLength = (pattern as SymbolType[]).length;
    }

    let symbol: SymbolType,
        wildcard = match.wildcard;
    let curTileXY: XYType;
    let board = match.board;
    let matchedTileXY: XYType[] = [];
    for (let i = 0; i < patternLength; i++) {
        if (curTileXY === undefined) {
            curTileXY = {
                x: startTileX,
                y: startTileY
            };
        } else {
            // Get next tileXY 
            curTileXY = Nieghbors.GetNeighborTileXY(board, curTileXY, direction, curTileXY) as XYType;
            if (curTileXY === null) {
                return false;
            }
        }

        symbol = match.getSymbol(curTileXY.x, curTileXY.y);
        if (symbol == null) {
            return false;
        }
        if (symbol !== wildcard) {
            if (matchNMode) { // Match N mode
                if (currSymbol === null) {
                    currSymbol = symbol;
                } else if (currSymbol !== symbol) {
                    return false;
                }
            } else if (pattern[i] !== symbol) { // Pattern list mode
                return false;
            }
        }

        matchedTileXY.push({
            x: curTileXY.x,
            y: curTileXY.y
        });
    }

    return {
        tileXY: matchedTileXY,
        direction: direction,
        pattern: pattern
    };
};