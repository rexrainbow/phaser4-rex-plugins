import { ICanvasText } from './ICanvasText';
import { Pen } from '../penmanger/Pen';
import {
    IStyle, FillStyleType,
    HAlignMode, VAlignMode
} from '../Types';
import { SyncFont, SyncStyle, SyncShadow } from './SyncContextMethods';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';
import { PenManager } from '../penmanger/PenManager';
import { DrawRoundRectangle } from '../../../../utils/canvas/DrawRoundRectangle';

export function Draw(
    canvasText: ICanvasText,
    startX: number,
    startY: number,
    textWidth: number,
    textHeight: number,
    penManager: PenManager = canvasText.penManager
) {

    if (canvasText.hitAreaManager) {
        canvasText.hitAreaManager.clear();
    }

    let totalLineHeight = penManager.totalLineHeight;
    if (totalLineHeight === 0) {
        return;
    }

    const clipMode = (textWidth < canvasText.textWidth) || (textHeight < canvasText.textHeight);

    let context = canvasText.context;
    context.save();

    let parent = canvasText.parent;

    DrawBackground(canvasText, parent);

    if (clipMode) {
        context.beginPath();
        context.rect(startX, startY, textWidth, textHeight);
        context.clip();
    }

    const hAlign = parent.hAlign;
    const vAlign = parent.vAlign;
    const lineStartX = startX + canvasText.startXOffset;
    const lineStartY = startY + canvasText.startYOffset;

    // Shift offsetY
    let offsetY = lineStartY;
    switch (vAlign) {
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
        let offsetX = lineStartX;
        switch (hAlign) {
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
        defaultStyle = canvasText.parent;

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
        DrawImage(canvasText,
            offsetX,
            offsetY,
            pen.prop.img,
            curStyle
        );
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
    style: IStyle
): void {

    let canvas = canvasText.canvas,
        context = canvasText.context;

    const fillStyle = style.backgroundFillStyle,
        strokeStyle = style.backgroundStrokeStyle;
    if (fillStyle || strokeStyle) {
        const lineWidth = style.backgroundStrokeThickness,
            halfLineWidth = lineWidth / 2,
            radius = style.cornerRadius,
            x = halfLineWidth,
            y = halfLineWidth,
            width = canvas.width - lineWidth,
            height = canvas.height - lineWidth;

        DrawRoundRectangle(
            canvas, context,
            x, y,
            width, height,
            radius,
            fillStyle, strokeStyle,
            lineWidth
        )

    } else {

        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

export function DrawUnderline(
    canvasText: ICanvasText,
    x: number,
    y: number,
    width: number,
    style: IStyle
): void {

    y += style.underlineOffsetY - (style.underlineThickness / 2);

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
    style: IStyle
): void {

    let context = canvasText.context;
    if (style.strokeStyle && (style.strokeStyle !== 'none') && (style.strokeThickness > 0)) {
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
    style: IStyle
): void {

    let imageManager = canvasText.imageManager;
    if (!imageManager) {
        return;
    }

    let imgInfo = imageManager.get(imgKey);
    let frame = imageManager.getFrame(imgKey);

    x += imgInfo.left;
    y += imgInfo.y - imgInfo.height;

    let context = canvasText.context;
    context.drawImage(
        frame.texture.image as HTMLCanvasElement,
        frame.x, frame.y, frame.width, frame.height,
        x, y, imgInfo.width, imgInfo.height
    );
};