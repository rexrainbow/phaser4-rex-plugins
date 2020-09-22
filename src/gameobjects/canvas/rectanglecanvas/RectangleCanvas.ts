import { BaseCanvas } from '../canvas/BaseCanvas';
import { IConfig } from './IRectangleCanvas';
import { GetCanvasGradientCallbackType } from '../../../utils/types/GetCanvasGradientCallbackType';
import { DrawRectangle } from '../../../utils/canvas/DrawRectangle';
import { GetStyle } from '../../../utils/canvas/GetStyle';

export class RectangleCanvas extends BaseCanvas {
    fillStyle: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    fillColor2: string | number;
    isHorizontalGradient: boolean;
    strokeStyle: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    lineWidth: number;

    constructor({
        x = 0,
        y = 0,
        width = 1,
        height = 1,
        fillStyle,
        fillColor2,
        isHorizontalGradient = true,
        strokeStyle,
        lineWidth = 2
    }: IConfig = {}) {

        super(x, y);
        this.type = 'rexCanvasRoundRectangle';

        this.setFillStyle(fillStyle, fillColor2, isHorizontalGradient);
        this.setStrokeStyle(strokeStyle, lineWidth);
        this.resize(width, height);
    }

    setFillStyle(
        fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
        fillColor2?: string | number,
        isHorizontalGradient: boolean = true,
    ): this {

        this.fillStyle = fillStyle;
        this.fillColor2 = fillColor2;
        this.isHorizontalGradient = isHorizontalGradient;
        return this;
    }

    setStrokeStyle(
        strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
        lineWidth?: number
    ): this {

        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        return this;
    }

    resize(
        width: number,
        height: number
    ): this {

        super.resize(width, height);

        this.refresh();
        return this;
    }

    refresh(): this {

        let lineWidth = this.lineWidth;
        if (!this.strokeStyle) {
            lineWidth = 0;
        }
        const halfLineWidth = lineWidth / 2;
        const x = halfLineWidth;
        const y = halfLineWidth;
        const width = this.width - lineWidth;
        const height = this.height - lineWidth;

        DrawRectangle(
            this.canvas, this.context,
            x, y,
            width, height,
            GetStyle(this.fillStyle, this.canvas, this.context),
            GetStyle(this.strokeStyle, this.canvas, this.context),
            lineWidth,
            GetStyle(this.fillColor2, this.canvas, this.context) as string,
            this.isHorizontalGradient
        );
        return this;
    }
}