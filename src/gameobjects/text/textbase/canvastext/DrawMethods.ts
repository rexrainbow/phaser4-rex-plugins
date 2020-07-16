import { ICanvasText } from './ICanvasText';
import { StyleType } from '../Types';
import { SyncFont, SyncStyle, SyncShadow } from './SyncContextMethods';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';

export function Draw(
    canvasText: ICanvasText,
    startX: number,
    startY: number,
    boxWidth: number,
    boxHeight: number
) {

    var penManager = this.penManager;
    this.hitAreaManager.clear();

    var context = this.context;
    context.save();

    // this.clear();
    this.drawBackground(this.defatultStyle.backgroundColor);

    // draw lines
    var defatultStyle = this.defatultStyle;
    startX += this.startXOffset;
    startY += this.startYOffset;
    var halign = defatultStyle.halign,
        valign = defatultStyle.valign;

    var lineWidth, lineHeight = defatultStyle.lineHeight;
    var lines = penManager.lines;
    var totalLinesNum = lines.length,
        maxLines = defatultStyle.maxLines;
    var drawLinesNum, drawLineStartIdx, drawLineEndIdx;
    if ((maxLines > 0) && (totalLinesNum > maxLines)) {
        drawLinesNum = maxLines;
        if (valign === 'center') { // center
            drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
        } else if (valign === 'bottom') { // bottom
            drawLineStartIdx = totalLinesNum - drawLinesNum;
        } else {
            drawLineStartIdx = 0;
        }
    } else {
        drawLinesNum = totalLinesNum;
        drawLineStartIdx = 0;
    }
    drawLineEndIdx = drawLineStartIdx + drawLinesNum;

    var offsetX, offsetY;
    if (valign === 'center') { // center
        offsetY = Math.max((boxHeight - (drawLinesNum * lineHeight)) / 2, 0);
    } else if (valign === 'bottom') { // bottom
        offsetY = Math.max(boxHeight - (drawLinesNum * lineHeight) - 2, 0);
    } else {
        offsetY = 0;
    }
    offsetY += startY;
    for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
        lineWidth = penManager.getLineWidth(lineIdx);
        if (lineWidth === 0) {
            continue;
        }

        if (halign === 'center') { // center
            offsetX = (boxWidth - lineWidth) / 2;
        } else if (halign === 'right') { // right
            offsetX = boxWidth - lineWidth;
        } else {
            offsetX = 0;
        }
        offsetX += startX;

        var pens = lines[lineIdx];
        for (var penIdx = 0, pensLen = pens.length; penIdx < pensLen; penIdx++) {
            this.drawPen(pens[penIdx], offsetX, offsetY);
        }
    }

    context.restore();
};

export function DrawPen(
    canvasText: ICanvasText,
    pen,
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

    // TODO
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

export function Clear(
    canvasText: ICanvasText
): void {

    let canvas = canvasText.canvas,
        context = canvasText.context;
    context.clearRect(0, 0, canvas.width, canvas.height);
};

export function DrawBackground(
    canvasText: ICanvasText,
    color: string
): void {

    if (color === null) {
        return;
    }

    let canvas = canvasText.canvas,
        context = canvasText.context;
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
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

// TODO
export function DrawImage(
    canvasText: ICanvasText,
    x: number,
    y: number,
    imgKey: string,
    style: StyleType
): void {

    var imageManager = this.parent.imageManager;
    var imgData = imageManager.get(imgKey);
    var frame = imageManager.getFrame(imgKey);

    x += imgData.left;
    y += - this.startYOffset + imgData.y;
    if (this.autoRound) {
        x = Math.round(x);
        y = Math.round(y);
    }

    var context = this.context;
    context.drawImage(
        frame.source.image,
        frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
        x, y, imgData.width, imgData.height
    );
};