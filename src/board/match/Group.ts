import { IMatch, SymbolType } from './IMatch';
import { XYType } from '../Types';
import { Nieghbors } from '../board';

export function Group(
    match: IMatch,
    startTileX: number,
    startTileY: number,
    out: XYType[] = []
): XYType[] {

    let board = match.board;
    let wildcard = match.wildcard;
    let targetSymbol = match.getSymbol(startTileX, startTileY);
    if ((targetSymbol == null) || (targetSymbol === wildcard)) {
        return out;
    }

    let curTileXY: XYType,
        symbol: SymbolType;
    globalQueue.push(startTileX, startTileY);
    while (globalQueue.length) {
        curTileXY = globalQueue.pop();
        symbol = match.getSymbol(curTileXY.x, curTileXY.y);
        if ((symbol === targetSymbol) || (symbol === wildcard)) {
            out.push(curTileXY);
            globalQueue.push(Nieghbors.GetNeighborTileXY(board, curTileXY));
        }
    }

    globalQueue.clear();
    return out;
}

class Queue {
    data: XYType[] = [];
    visited: Set<string> = new Set();

    push(
        x: number | XYType | XYType[],
        y?: number
    ): this {

        if (Array.isArray(x)) { // XYType[]
            let xyArray = x;
            for (let i = 0, cnt = xyArray.length; i < cnt; i++) {
                this.push(xyArray[i]);
            }
            return this;
        }

        if (typeof (x) === 'object') { // XYType
            let xy = x;
            x = xy.x;
            y = xy.y;
        }
        let key = `${x},${y}`;
        if (this.visited.has(key)) {
            return this;
        }

        this.data.push({ x: x, y: y });
        this.visited.add(key);
        return this;
    }

    pop(): XYType {
        return this.data.pop();
    }

    get length(): number {
        return this.data.length;
    }

    clear(): this {
        this.data.length = 0;
        this.visited.clear();
        return this;
    }
}

let globalQueue = new Queue();