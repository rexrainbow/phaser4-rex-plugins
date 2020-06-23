import {
    IQuad, IConfig, IState,
    OrientationMode, OrientationModeString,
    DirMode, DirModeString
} from './IQuad';

export class Quad implements IQuad {
    x: number;
    y: number;

    _width: number;
    _height: number;
    _halfWidth: number;
    _halfHeight: number;

    mode: OrientationMode;
    directions: DirMode;

    constructor({
        x = 0,
        y = 0,
        cellWidth = 0,
        cellHeight = 0,
        type = OrientationMode.orthogonal,
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
        type = OrientationMode.orthogonal,
        dir = DirMode['4dir']
    }: IState = {}) {

        this.setOriginPosition(x, y);
        this.setCellSize(cellWidth, cellHeight);
        this.setType(type);
        this.setDirectionMode(dir);
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

    setType(type: OrientationMode | OrientationModeString = OrientationMode.orthogonal): this {

        if (typeof (type) === 'string') {
            type = OrientationMode[type]
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