import { IRadiusConfig, CornerRadiusType } from '../geom/roundrectangle/IRoundRectangle';
import { RoundRectangle } from '../geom/roundrectangle/RoundRectangle';
import { DegToRad } from '../math/angle/DegToRad';

const Rad0 = DegToRad(0);
const Rad90 = DegToRad(90);
const Rad180 = DegToRad(180);
const Rad270 = DegToRad(270);

export function AddRoundRectanglePath(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radiusConfig: IRadiusConfig | number,
) {
    const geom = new RoundRectangle(x, y, width, height, radiusConfig),
        minWidth = geom.minWidth,
        minHeight = geom.minHeight,
        scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
        scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

    const cornerRadius = geom.cornerRadius;
    let radius: CornerRadiusType,
        radiusX: number,
        radiusY: number,
        centerX: number,
        centerY: number;

    context.beginPath();

    context.translate(x, y);

    // Bottom-right
    radius = cornerRadius.br;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = geom.width - radiusX;
    centerY = geom.height - radiusY;
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad0, Rad90);
    } else {
        context.moveTo(geom.width, centerY);
        context.lineTo(geom.width, geom.height);
        context.lineTo(centerX, geom.height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = geom.height - radiusY;
    context.lineTo(radiusX, geom.height);
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad90, Rad180);
    } else {
        context.lineTo(0, geom.height);
        context.lineTo(0, centerY);
    }

    // Top-left
    radius = cornerRadius.tl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = radiusY;
    context.lineTo(0, centerY);
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad180, Rad270);
    } else {
        context.lineTo(0, 0);
        context.lineTo(centerX, 0);
    }

    // Top-right
    radius = cornerRadius.tr;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = geom.width - radiusX;
    centerY = radiusY;
    context.lineTo(centerX, 0);
    if (IsArcCorner(radius)) {
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, Rad270, Rad0);
    } else {
        context.lineTo(geom.width, 0);
        context.lineTo(geom.width, centerY);
    }

    context.closePath();    
}

function IsArcCorner(
    radius: CornerRadiusType
): boolean {

    return ((radius.x !== 0) && (radius.y !== 0));
}