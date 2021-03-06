import { IBaseText } from './IBaseText';
import { DIRTY_CONST } from '@phaserjs/phaser/gameobjects/DIRTY_CONST';

export function UpdateText(
    baseText: IBaseText,
    updatePens: boolean = true,
    drawPens: boolean = true
): void {

    let canvasText = baseText.canvasText;
    if (updatePens) {
        canvasText.updatePenManager(
            baseText.text,
            baseText.wrapMode,
            baseText.wrapWidth
        );
    }

    if (drawPens) {
        // Resize
        let padding = baseText.padding;
        let textWidth: number,
            textHeight: number,
            displayWidth: number,
            displayHeight: number;
        if (baseText.fixedWidth === 0) {
            textWidth = canvasText.textWidth;
            displayWidth = textWidth + padding.left + padding.right;
        }
        else {
            displayWidth = baseText.fixedWidth;
            textWidth = displayWidth - padding.left - padding.right;
            if (textWidth > canvasText.textWidth) {
                textWidth = canvasText.textWidth;
            }
        }
        if (baseText.fixedHeight === 0) {
            textHeight = canvasText.textHeight;
            displayHeight = textHeight + padding.top + padding.bottom;
        }
        else {
            displayHeight = baseText.fixedHeight;
            textHeight = displayHeight - padding.top - padding.bottom;
            if (textHeight > canvasText.textHeight) {
                textHeight = canvasText.textHeight;
            }
        }

        let resolution = baseText.resolution;
        let canvasWidth = Math.ceil(displayWidth * resolution);
        let canvasHeight = Math.ceil(displayHeight * resolution);
        let canvas = baseText.canvas;
        if ((canvas.width !== canvasWidth) || (canvas.height !== canvasHeight)) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            baseText.texture.setSize(displayWidth, displayHeight);
            baseText.setSize(displayWidth, displayHeight);
        }

        // Draw content on canvas
        let context = baseText.context;
        context.save();
        context.scale(resolution, resolution);

        canvasText.draw(
            padding.left,
            padding.top,
            textWidth,
            textHeight,
            0,
            baseText.textScrollY
        );

        context.restore();

        // Update texture
        if (baseText.texture.binding) {
            baseText.texture.binding.update();
        }

        baseText.setDirty(DIRTY_CONST.TEXTURE);
    }
}