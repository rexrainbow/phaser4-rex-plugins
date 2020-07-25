import { ICanvasText } from './ICanvasText';
import { Pen } from '../penmanger/Pen';
import {
    StyleType, FillStyleType,
    HAlignMode, VAlignMode
} from '../Types';
import { SyncFont, SyncStyle, SyncShadow } from './SyncContextMethods';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';
import { PenManager } from '../penmanger/PenManager';

export function Draw(
    canvasText: ICanvasText,
    startX: number = 0,
    startY: number = 0,
    textWidth: number = canvasText.textWidth,
    textHeight: number = canvasText.textHeight,
    penManager: PenManager = canvasText.penManager
) {

    if (canvasText.hitAreaManager) {
        canvasText.hitAreaManager.clear();
    }

    let totalLineHeight = penManager.totalLineHeight;
    if (totalLineHeight === 0) {
        return;
    }

    let context = canvasText.context;
    context.save();

    let defatultStyle = canvasText.defatultStyle;

    DrawBackground(canvasText, defatultStyle.backgroundStyle);

    startX += canvasText.startXOffset;
    startY += canvasText.startYOffset;

    let halign = defatultStyle.halign,
        valign = defatultStyle.valign;

    // Shift offsetY
    let offsetY = startY;
    switch (valign) {
        case VAlignMode.center:
            offsetY += (textHeight - totalLineHeight) / 2;
            break;

        case VAlignMode.bottom:
            offsetY += textHeight - totalLineHeight - 2;
            break;
    }

    // Draw each line
    let lines = penManager.lines;
    for (let lineIdx = 0, lineCnt = lines.length; lineIdx < lineCnt; lineIdx++) {
        let line = lines[lineIdx];
        let lineWidth = line.width;
        if (lineWidth === 0) {
            continue;
        }

        // Shift offsetX
        let offsetX = startX;
        switch (halign) {
            case HAlignMode.center:
                offsetX += (textWidth - lineWidth) / 2;
                break;

            case HAlignMode.right:
                offsetX += textWidth - lineWidth;
                break;
        }

        // Draw each pen in this line
        let pens = line.pens;
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
            pen.height // height
        );
    }
};

export function DrawBackground(
    canvasText: ICanvasText,
    fillStyle: FillStyleType
): void {

    let canvas = canvasText.canvas,
        context = canvasText.context;

    if (fillStyle == null) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        context.fillStyle = fillStyle;
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
    context.strokeStyle = style.underlineStyle;
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

    if (style.fillStyle && (style.fillStyle !== 'none')) {
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