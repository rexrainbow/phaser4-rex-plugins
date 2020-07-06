import {
    IMatch, IConfig,
    IBoardBase, SymbolType, DirMaskType,
    GetSymbolCallback, MatchCallbackType, ForEachSymbolCallback, MatchResult
} from './IMatch';
import { XYType } from '../types';
import { MatchAll, MatchAny } from './MatchBoard';
import { MatchAtDir } from './MatchAtDir';
import { Group } from './Group';
import { TileXY } from '../board'

export class Match implements IMatch {
    board: IBoardBase;
    wildcard: SymbolType;
    symbols: SymbolType[];
    dirMask: DirMaskType;

    constructor({
        board,
        wildcard,
        dirMask
    }: IConfig = {}) {

        this.symbols = []; // tileX+(tileY*board.width)
        this.dirMask = {};

        this.setBoard(board);
        this.setWildcard(wildcard);
        if (dirMask !== undefined) {
            this.setDirMask(dirMask);
        }

        this.boot();
    }

    boot() { }

    destroy() {
        this.board = undefined;
        this.symbols = undefined;
        this.dirMask = undefined;
    }

    setBoard(
        board: IBoardBase
    ): this {

        this.board = board;
        if (board) {
            this.clearSymbols();
        }
        return this;
    }

    setDirMask(
        dir: number | DirMaskType,
        value: boolean = false
    ): this {

        if (typeof (dir) === 'object') {
            let dirMask: DirMaskType = dir;
            for (let _dir in dirMask) {
                this.dirMask[_dir] = dirMask[_dir];
            }
        } else {
            this.dirMask[dir] = value;
        }
        return this;
    }

    setDirectionMode(
        mode: number
    ): this {

        this.board.grid.setDirectionMode(mode);
        return this;
    }

    clearSymbols(): this {

        this.refreshSymbols(null);
        return this;
    }

    setSymbol(
        tileX: number,
        tileY: number,
        symbol: SymbolType
    ) {

        if (!TileXY.Contains(this.board, tileX, tileY)) {
            return this;
        }

        this.symbols[this.tileXYToKey(tileX, tileY)] = symbol;
        return this;
    }

    getSymbol(
        tileX: number,
        tileY: number
    ): SymbolType {

        return this.symbols[this.tileXYToKey(tileX, tileY)];
    }

    forEach(
        callback: ForEachSymbolCallback,
        scope?: any
    ): this {

        let board = this.board;
        let tileXY: XYType,
            symbol: SymbolType;
        for (let i = 0, cnt = this.symbols.length; i < cnt; i++) {
            symbol = this.symbols[i];
            tileXY = this.keyToTileXY(i, true);
            if (scope) {
                callback.call(scope, symbol, tileXY, board);
            } else {
                callback(symbol, tileXY, board);
            }
        }
        return this;
    }

    refreshSymbols(
        callback: SymbolType | GetSymbolCallback,
        scope?: any
    ): this {

        let board = this.board;
        let width = board.width,
            height = board.height;
        this.symbols.length = width * height;

        let symbol: SymbolType,
            tileXY: XYType;
        if (typeof (callback) === 'function') {
            // Get symbol by callback
            for (let i = 0, cnt = this.symbols.length; i < cnt; i++) {
                tileXY = this.keyToTileXY(i, true);
                if (scope) {
                    symbol = callback.call(scope, tileXY, board);
                } else {
                    symbol = callback(tileXY, board);
                }
                this.symbols[i] = symbol;
            }

        } else {
            // Fill a given symbol
            symbol = callback;
            for (let i = 0, cnt = this.symbols.length; i < cnt; i++) {
                this.symbols[i] = symbol;
            }
        }
        return this;
    }

    setWildcard(
        wildcard: SymbolType
    ): this {

        this.wildcard = wildcard;
        return this;
    }

    tileXYToKey(
        tileX: number,
        tileY: number
    ): number {

        return tileX + (tileY * this.board.width);
    }

    keyToTileXY(
        key: number,
        out: XYType | true = { x: 0, y: 0 }
    ): XYType {

        if (out === true) {
            out = globTileXY;
        }
        let width = this.board.width;
        out.x = key % width;
        out.y = Math.floor(key / width);
        return out;
    }

    group(
        startTileX: number,
        startTileY: number,
        out: XYType[] = []
    ): XYType[] {

        return Group(this, startTileX, startTileY, out);
    }

    match(pattern: number | SymbolType[],
        callback?: MatchCallbackType,
        scope?: any,
        getFirst: boolean = false
    ): this {

        MatchAll(this, pattern, callback, scope, getFirst);
        return this;
    }

    matchAny(
        pattern: number | SymbolType[],
    ): MatchResult | false {

        return MatchAny(this, pattern);
    }

    matchAtDir(
        pattern: number | SymbolType[],
        startTileX: number,
        startTileY: number,
        direction: number
    ): MatchResult | false {

        return MatchAtDir(this, pattern, startTileX, startTileY, direction);
    }

}

let globTileXY: XYType = { x: 0, y: 0 };