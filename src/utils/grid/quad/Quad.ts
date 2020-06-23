import {
    IQuad, IConfig, IState,
    LayoutMode, LayoutModeString,
    DirMode, DirModeString
} from './IQuad';

export class Quad implements IQuad {
    x: number;
    y: number;

    _width: number;
    _height: number;
    _halfWidth: number;
    _halfHeight: number;

    mode: LayoutMode;
    directions: DirMode;

    constructor({
        x = 0,
        y = 0,
        cellWidth = 0,
        cellHeight = 0,
        type = LayoutMode.orthogonal,
        dir = DirMode['4dir']
    }: IConfig = {}) {

        this.setOriginPosition(x, y);
        this.setCellSize(cellWidth, cellHeight);
        this.setType(type);
        this.setDirectionMode(dir);
    }

    fromJSON({
        x = 0,
        y = 0,
        cellWidth = 0,
        cellHeight = 0,
        type = LayoutMode.orthogonal,
        dir = DirMode['4dir']
    }: IState = {}) {

        this.setType(type);
        this.setDirectionMode(dir);
        this.setOriginPosition(x, y);
        this.setCellSize(cellWidth, cellHeight);

    }

    toJSON(): IState {
        return {
            x: this.x,
            y: this.y,
            cellWidth: this.cellWidth,
            cellHeight: this.cellHeight,
            type: this.mode,
            dir: this.directions
        }
    }

    setOriginPosition(x: number = 0, y: number = 0): this {

        this.x = x;
        this.y = y;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        this._halfWidth = value / 2;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
        this._halfHeight = value / 2;
    }

    setCellSize(width: number = 0, height: number = 0) {

        this.width = width;
        this.height = height;
        return this;
    }

    get cellWidth() {
        return this.width;
    }

    set cellWidth(value: number) {
        this.width = value;
    }

    get cellHeight() {
        return this.height;
    }

    set cellHeight(value: number) {
        this.height = value;
    }

    setType(type: LayoutMode | LayoutModeString = LayoutMode.orthogonal): this {

        if (typeof (type) === 'string') {
            type = LayoutMode[type]
        }

        this.mode = type;
        return this;
    }

    setDirectionMode(mode: DirMode | DirModeString = DirMode['4dir']): this {

        if (typeof (mode) === 'string') {
            mode = DirMode[mode];
        }

        this.directions = mode;
        return this;
    }
}