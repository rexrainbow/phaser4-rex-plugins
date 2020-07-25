import { ICanvasText } from '../canvastext/ICanvasText';
import { WrapMode } from '../Types';
import { PropType } from '../parser/BaseParser';
import { PenManager } from './PenManager';
import { WrapText, LineInfo, NewLineMode } from '../../../../utils/string/WrapText';
import { SyncFont, SyncStyle } from '../canvastext/SyncContextMethods';
import { Clone } from '../../../../utils/object/Clone';
import { GetTextWidth, GetTextHeightMetrics } from './TextMetrics';

export function UpdatePenManager(
    penManager: PenManager,
    text: string,
    canvasText: ICanvasText,
    wrapMode: WrapMode,
    wrapWidth: number
): PenManager {

    penManager.freePens();
    if (text === "") {
        return penManager;
    }

    let canvas = canvasText.canvas,
        context = canvasText.context,
        parent = canvasText.parent;

    let match = canvasText.parser.splitText(text),
        curProp: PropType,
        wrapLines: LineInfo[],
        cursorX = 0;
    for (var i = 0, len = match.length; i < len; i++) {
        let result = canvasText.parser.tagTextToProp(match[i], curProp);
        let plainText = result.text;
        curProp = result.prop;

        if (curProp.img) { // Image tag
            let imgWidth: number,
                imgHeight: number;
            if (canvasText.imageManager) {
                imgWidth = canvasText.imageManager.getOuterWidth(curProp.img);
                imgHeight = canvasText.imageManager.getOuterHeight(curProp.img);
            } else {
                imgWidth = 0;
                imgHeight = 0;
            }

            if ((wrapWidth > 0) && (wrapMode !== WrapMode.none)) {  // Wrap mode
                if (wrapWidth < (cursorX + imgWidth)) { // Image at next new line
                    penManager.addNewLinePen();
                    cursorX = 0;
                }
            }
            penManager.addImagePen(
                cursorX,       // x
                0,             // y : Add line offsetY later
                imgWidth,      // width
                imgHeight,     // height
                Clone(curProp) // prop
            );
            cursorX += imgWidth;

        } else if (plainText !== '') { // Text tag
            // Wrap text to lines
            // Save the current context.
            context.save();
            let curStyle = canvasText.parser.propToStyle(
                parent,
                curProp
            );
            SyncFont(context, curStyle);
            SyncStyle(context, curStyle);
            let strokeThickness = curStyle.strokeThickness,
                halfStrokeThickness = strokeThickness / 2;

            wrapLines = WrapText(plainText, GetTextWidth, context, wrapMode, wrapWidth, cursorX);

            // Style of wrapped lines are the same, and has the same text height
            let textHeightResult = GetTextHeightMetrics('|MÉq', context);

            // Add pens
            for (let j = 0, jcnt = wrapLines.length; j < jcnt; j++) {
                let n = wrapLines[j];
                let textHeight = textHeightResult.height + strokeThickness;
                let ascent = textHeightResult.ascent + halfStrokeThickness;

                penManager.addTextPen(
                    n.text,         // text
                    cursorX,        // x
                    0,              // y : Add line offsetY later
                    n.width,        // width
                    textHeight,     // height
                    ascent,         // ascent
                    Clone(curProp), // prop
                    n.newLineMode   // new-line mode
                );

                if (n.newLineMode !== NewLineMode.none) {
                    cursorX = 0;
                } else {
                    cursorX += n.width;
                }

            }

            context.restore();
        }

    };

    // Update cursorY of each pen in each line
    // Update maxLineWidth, totalLineHeight
    let lineSpacing = canvasText.parent.lineSpacing;
    let currLineHeight = 0,
        cursorY = 0,
        maxLineWidth = 0,
        totalLineHeight = 0;

    // Count cursorY of 1st line by max ascent of pens
    penManager.lines[0].pens.forEach(function (pen) {
        cursorY = Math.max(cursorY, pen.ascent);
    });

    penManager.lines.forEach(function (line) {

        currLineHeight = 0;
        line.pens.forEach(function (pen) {
            pen.y += cursorY;
            currLineHeight = Math.max(currLineHeight, pen.height);
        })

        line.y = cursorY;
        line.height = currLineHeight;
        cursorY += (currLineHeight + lineSpacing);

        maxLineWidth = Math.max(maxLineWidth, line.width);
        totalLineHeight += (currLineHeight + lineSpacing);
    });

    penManager.maxLineWidth = maxLineWidth;
    penManager.totalLineHeight = totalLineHeight - lineSpacing;

    return penManager;
}