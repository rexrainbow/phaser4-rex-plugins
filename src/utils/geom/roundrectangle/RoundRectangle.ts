import { IRoundRectangle, CornerRadiusType, IRadiusConfig } from './IRoundRectangle';

export class RoundRectangle implements IRoundRectangle {
    x: number;
    y: number;
    _width: number = 0;
    _height: number = 0;
    cornerRadius: { tl: CornerRadiusType, tr: CornerRadiusType, bl: CornerRadiusType, br: CornerRadiusType } =
        { tl: GetRadius(0), tr: GetRadius(0), bl: GetRadius(0), br: GetRadius(0) }

    constructor(
        x: number = 0,
        y: number = x,
        width: number = 0,
        height: number = width,
        radiusConfig: IRadiusConfig | number = 0
    ) {

        this.setTo(x, y, width, height, radiusConfig);
    }

    setTo(
        x: number = 0,
        y: number = x,
        width: number = 0,
        height: number = width,
        radiusConfig: IRadiusConfig | number = 0
    ): this {

        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
    }

    setPosition(
        x: number = 0,
        y: number = x
    ): this {

        this.x = x;
        this.y = y;
        return this;
    }

    setRadius(
        config: IRadiusConfig | number = 0
    ): this {

        let radius = this.cornerRadius;
        if (typeof (config) === 'number') {
            const defaultRadiusX = config;
            const defaultRadiusY = config;
            radius.tl = GetRadius(undefined, defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(undefined, defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(undefined, defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(undefined, defaultRadiusX, defaultRadiusY);
        } else {
            const defaultRadiusX = config.x || 0;
            const defaultRadiusY = config.y || 0;
            radius.tl = GetRadius(config.tl, defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(config.tr, defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(config.bl, defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(config.br, defaultRadiusX, defaultRadiusY);
        }

        return this;
    }

    setSize(
        width: number = 0,
        height: number = width
    ): this {

        this.width = width;
        this.height = height;
        return this;
    }

    get minWidth(): number {
        let radius = this.cornerRadius;
        return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
    }

    get minHeight(): number {
        let radius = this.cornerRadius;
        return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
    }

    get width(): number {
        return this._width;
    }

    set width(value) {

        if (value == null) {
            value = 0;
        }
        this._width = Math.max(value, this.minWidth);
    }

    get height(): number {
        return this._height;
    }

    set height(value) {

        if (value == null) {
            value = 0;
        }
        this._height = Math.max(value, this.minHeight);
    }

    get radius() {

        let radius = this.cornerRadius;
        let max = Math.max(
            radius.tl.x,
            radius.tl.y,
            radius.tr.x,
            radius.tr.y,
            radius.bl.x,
            radius.bl.y,
            radius.br.x,
            radius.br.y
        );
        return max;
    }
}

function GetRadius(
    radius: number | CornerRadiusType,
    defaultRadiusX?: number,
    defaultRadiusY?: number
): CornerRadiusType {

    if (radius === undefined) {
        return {
            x: defaultRadiusX,
            y: defaultRadiusY
        };
    } else if (typeof (radius) === 'number') {
        return {
            x: radius,
            y: radius
        };
    } else {
        return radius;
    }
}