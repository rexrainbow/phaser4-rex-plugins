import { IRadiusConfig, CornerRadiusType } from '../geom/roundrectangle/IRoundRectangle';
import { RoundRectangle } from '../geom/roundrectangle/RoundRectangle';
import { DegToRad } from '../math/angle/DegToRad';

const Rad0 = DegToRad(0);
const Rad90 = DegToRad(90);
const Rad180 = DegToRad(180);
const Rad270 = DegToRad(270);

export function DrawRoundRectangle(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radiusConfig: IRadiusConfig | number,
    fillStyle?: string | CanvasGradient | CanvasPattern,
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth?: number
) {

    const geom = new RoundRectangle(x, y, width, height, radiusConfig);

    let cornerRadius = geom.cornerRadius,
        radius: CornerRadiusType,
        centerX: number,
        centerY: number;

    context.beginPath();

    context.translate(x, y);

    // Bottom-right
    radius = cornerRadius.br;
    centerX = geom.width - radius.x;
    centerY = geom.height - radius.y;
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad0, Rad90);
    } else {
        context.moveTo(geom.width, centerY);
        context.lineTo(geom.width, geom.height);
        context.lineTo(centerX, geom.height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    centerX = radius.x;
    centerY = geom.height - radius.y;
    context.lineTo(radius.x, geom.height);
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad90, Rad180);
    } else {
        context.lineTo(0, geom.height);
        context.lineTo(0, centerY);
    }

    // Top-left
    radius = cornerRadius.tl;
    centerX = radius.x;
    centerY = radius.y;
    context.lineTo(0, centerY);
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad180, Rad270);
    } else {
        context.lineTo(0, 0);
        context.lineTo(centerX, 0);
    }

    // Top-right
    radius = cornerRadius.tr;
    centerX = geom.width - radius.x;
    centerY = radius.y;
    context.lineTo(centerX, 0);
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radius.x, radius.y, 0, Rad270, Rad0);
    } else {
        context.lineTo(geom.width, 0);
        context.lineTo(geom.width, centerY);
    }
    context.closePath();

    if (fillStyle) {
        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}

function IsArcCorner(
    radius: CornerRadiusType
): boolean {

    return ((radius.x !== 0) && (radius.y !== 0));
}