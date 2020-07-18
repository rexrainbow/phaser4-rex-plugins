import { ICanvasText } from './ICanvasText';
import { Pen } from '../penmanger/Pen';
import { StyleType, HAlignMode, VAlignMode } from '../Types';
import { SyncFont, SyncStyle, SyncShadow } from './SyncContextMethods';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';

export function Draw(
    canvasText: ICanvasText,
    startX: number,
    startY: number,
    boxWidth: number,
    boxHeight: number
) {

    let penManager = canvasText.penManager;
    if (canvasText.hitAreaManager) {
        canvasText.hitAreaManager.clear();
    }

    let context = canvasText.context;
    context.save();

    let defatultStyle = canvasText.defatultStyle;

    DrawBackground(canvasText, defatultStyle.backgroundColor);

    // draw lines
    startX += this.startXOffset;
    startY += this.startYOffset;
    let halign = this.halign,
        valign = this.valign;

    let lineWidth: number,
        lineHeight = defatultStyle.lineHeight;
    let lines = penManager.lines;
    let totalLinesNum = lines.length,
        maxLines = this.maxLines;
    let drawLinesNum: number,
        drawLineStartIdx: number,
        drawLineEndIdx: number;
    if ((maxLines > 0) && (totalLinesNum > maxLines)) {
        drawLinesNum = maxLines;
        if (valign === VAlignMode.center) {
            drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
        } else if (valign === VAlignMode.bottom) {
            drawLineStartIdx = totalLinesNum - drawLinesNum;
        } else {
            drawLineStartIdx = 0;
        }
    } else {
        drawLinesNum = totalLinesNum;
        drawLineStartIdx = 0;
    }
    drawLineEndIdx = drawLineStartIdx + drawLinesNum;

    let offsetX: number,
        offsetY: number;
    if (valign === VAlignMode.center) { // center
        offsetY = Math.max((boxHeight - (drawLinesNum * lineHeight)) / 2, 0);
    } else if (valign === VAlignMode.bottom) { // bottom
        offsetY = Math.max(boxHeight - (drawLinesNum * lineHeight) - 2, 0);
    } else {
        offsetY = 0;
    }
    offsetY += startY;
    for (let lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
        lineWidth = penManager.getLineWidth(lineIdx);
        if (lineWidth === 0) {
            continue;
        }

        if (halign === HAlignMode.center) {
            offsetX = (boxWidth - lineWidth) / 2;
        } else if (halign === HAlignMode.right) {
            offsetX = boxWidth - lineWidth;
        } else {
            offsetX = 0;
        }
        offsetX += startX;

        let pens = lines[lineIdx].pens;
        for (let penIdx = 0, penCnt = pens.length; penIdx < penCnt; penIdx++) {
            DrawPen(canvasText, pens[penIdx], offsetX, offsetY);
        }
    }

    context.restore();
};

export function DrawPen(
    canvasText: ICanvasText,
    pen: Pen,
    offsetX: number,
    offsetY: number
): void {

    offsetX += pen.x;
    offsetY += pen.y;

    let canvas = canvasText.canvas,
        context = canvasText.context,
        defaultStyle = canvasText.defatultStyle;

    context.save();
    let curStyle = canvasText.parser.propToStyle(defaultStyle, pen.prop);
    SyncFont(context, curStyle);
    SyncStyle(context, curStyle);

    // Underline
    if ((curStyle.underlineThickness > 0) && (pen.width > 0)) {
        DrawUnderline(canvasText, offsetX, offsetY, pen.width, curStyle);
    }

    // Text
    if (pen.isTextPen) {
        DrawText(canvasText, offsetX, offsetY, pen.text, curStyle);
    }

    // Image
    if (pen.isImagePen) {
        DrawImage(canvasText, offsetX, offsetY, pen.prop.img, curStyle);
    }

    context.restore();

    if (pen.hasAreaMarker && (pen.width > 0)) {
        if (!canvasText.hitAreaManager) {
            canvasText.hitAreaManager = new HitAreaManager();
        }
        canvasText.hitAreaManager.add(
            pen.prop.area, // key
            offsetX, // x
            (offsetY - canvasText.startYOffset), // y
            pen.width, // width
            defaultStyle.lineHeight // height
        );
    }
};

export function DrawBackground(
    canvasText: ICanvasText,
    color: string
): void {

    let canvas = canvasText.canvas,
        context = canvasText.context;

    if (color == null) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};

export function DrawUnderline(
    canvasText: ICanvasText,
    x: number,
    y: number,
    width: number,
    style: StyleType
): void {

    y += style.underlineOffset - (style.underlineThickness / 2);

    let context = canvasText.context;
    let savedLineCap = context.lineCap;
    context.lineCap = 'butt';
    context.beginPath();
    context.strokeStyle = style.underlineColor;
    context.lineWidth = style.underlineThickness;
    context.moveTo(x, y);
    context.lineTo((x + width), y);
    context.stroke();
    context.lineCap = savedLineCap;
};

export function DrawText(
    canvasText: ICanvasText,
    x: number,
    y: number,
    text: string,
    style: StyleType
): void {

    let context = canvasText.context;
    if (style.strokeThickness) {
        SyncShadow(context, style, style.shadowStroke);
        context.strokeText(text, x, y);
    }

    if (style.color && (style.color !== 'none')) {
        SyncShadow(context, style, style.shadowFill);
        context.fillText(text, x, y);
    }
};

export function DrawImage(
    canvasText: ICanvasText,
    x: number,
    y: number,
    imgKey: string,
    style: StyleType
): void {

    let imageManager = canvasText.imageManager;
    if (!imageManager) {
        return;
    }

    let imgInfo = imageManager.get(imgKey);
    let frame = imageManager.getFrame(imgKey);

    x += imgInfo.left;
    y += - canvasText.startYOffset + imgInfo.y;

    let context = canvasText.context;
    context.drawImage(
        frame.texture.image as HTMLCanvasElement,
        frame.x, frame.y, frame.width, frame.height,
        x, y, imgInfo.width, imgInfo.height
    );
};