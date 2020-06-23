import {
    IHexagon, IConfig, IState,
    StaggerAxis, StaggerAxisString, StaggerIndex, StaggerIndexString, LayoutMode
} from './IHexagon';

export class Hexagon implements IHexagon {
    x: number;
    y: number;

    _width: number;
    _height: number;
    _halfWidth: number;
    _halfHeight: number;

    mode: LayoutMode;
    staggerAxis: StaggerAxis;
    staggerIndex: StaggerIndex;
    directions: number;

    constructor({
        x = 0,
        y = 0,
        radius = undefined,
        cellWidth = 0,
        cellHeight = 0,
        staggerAxis = StaggerAxis.x,
        staggerIndex = StaggerIndex.odd
    }: IConfig = {}) {

        this.setType(staggerAxis, staggerIndex);
        this.setDirectionMode();

        this.setOriginPosition(x, y);

        if (radius !== undefined) {
            this.setRadius(radius);
        } else {
            this.setCellSize(cellWidth, cellHeight);
        }
    }

    fromJSON({
        x = 0,
        y = 0,
        cellWidth = 0,
        cellHeight = 0,
        staggerAxis = StaggerAxis.x,
        staggerIndex = StaggerIndex.odd
    }: IState = {}) {

        this.setType(staggerAxis, staggerIndex);
        this.setDirectionMode();

        this.setOriginPosition(x, y);
        this.setCellSize(cellWidth, cellHeight);
    }

    toJSON(): IState {
        return {
            x: this.x,
            y: this.y,
            cellWidth: this.cellWidth,
            cellHeight: this.cellHeight,
            staggerAxis: this.staggerAxis,
            staggerIndex: this.staggerIndex
        }
    }

    setOriginPosition(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this._halfWidth = value / 2;
    }

    get height() {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this._halfHeight = value / 2;
    }

    setCellSize(width: number = 0, height: number = 0): this {

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

    setRadius(radius: number = 0): this {

        let cellWidth: number,
            cellHeight: number;
        if (this.staggerAxis === StaggerAxis.y) {
            cellWidth = 2 * radius;
            cellHeight = SQRT3 * radius;
        } else {
            cellWidth = SQRT3 * radius;
            cellHeight = 2 * radius;
        }
        this.setCellSize(cellWidth, cellHeight);
        return this;
    }

    setDirectionMode(): this {
        this.directions = 6;
        return this;
    }

    setType(
        staggerAxis: StaggerAxis | StaggerAxisString = 1,
        staggerIndex: StaggerIndex | StaggerIndexString = 1
    ): this {

        if (typeof (staggerAxis) === 'string') {
            staggerAxis = StaggerAxis[staggerAxis]
        }
        if (typeof (staggerIndex) === 'string') {
            staggerIndex = StaggerIndex[staggerIndex]
        }

        this.staggerAxis = staggerAxis;
        this.staggerIndex = staggerIndex;
        if (staggerAxis === StaggerAxis.y) { // flat
            this.mode = (staggerIndex === StaggerIndex.even) ? LayoutMode.EVEN_Q : LayoutMode.ODD_Q;
        } else { // pointy
            this.mode = (staggerIndex === StaggerIndex.even) ? LayoutMode.EVEN_R : LayoutMode.ODD_R;
        }
        return this;
    }
}

const SQRT3 = Math.sqrt(3);