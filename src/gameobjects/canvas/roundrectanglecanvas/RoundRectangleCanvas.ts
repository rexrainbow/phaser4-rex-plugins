import { BaseCanvas } from '../canvas/BaseCanvas';
import { IConfig } from './IRoundRectangleCanvas';
import { IRadiusConfig } from '../../../utils/geom/roundrectangle/IRoundRectangle';
import { GetCanvasGradientCallbackType } from '../../../utils/types/GetCanvasGradientCallbackType';
import { DrawRoundRectangle } from '../../../utils/canvas/DrawRoundRectangle';
import { GetStyle } from '../../../utils/canvas/GetStyle';

export class RoundRectangleCanvas extends BaseCanvas {
    type = 'rexCanvasRoundRectangle';
    radius: IRadiusConfig | number;
    iteration: number;
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
        radius = 0,
        iteration,
        fillStyle,
        fillColor2,
        isHorizontalGradient = true,
        strokeStyle,
        lineWidth = 2
    }: IConfig = {}) {

        super(x, y);

        this.setRadius(radius);
        this.setIteration(iteration);
        this.setFillStyle(fillStyle, fillColor2, isHorizontalGradient);
        this.setStrokeStyle(strokeStyle, lineWidth);
        this.resize(width, height);
    }

    setRadius(
        radius: IRadiusConfig | number
    ): this {

        this.radius = radius;
        return this;
    }

    setIteration(
        iteration?: number
    ): this {

        this.iteration = iteration;
        return this;
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

        DrawRoundRectangle(
            this.canvas, this.context,
            x, y,
            width, height,
            this.radius,
            GetStyle(this.fillStyle, this.canvas, this.context),
            GetStyle(this.strokeStyle, this.canvas, this.context),
            lineWidth,
            GetStyle(this.fillColor2, this.canvas, this.context) as string,
            this.isHorizontalGradient,
            this.iteration
        );
        return this;
    }
}