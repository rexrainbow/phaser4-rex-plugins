import { IBaseText } from './IBaseText';
import { Clamp } from '@phaserjs/phaser/math/Clamp'


export function SetTextOffsetY(
    baseText: IBaseText,
    offsetY: number,
    isPercent: boolean = false
): void {

    if (isPercent) {
        const t = Clamp(offsetY, 0, 1);
        const padding = baseText.padding;
        const displayHeight = baseText.height - padding.top - padding.bottom;
        const textHeight = baseText.canvasText.textHeight;
        if (textHeight <= displayHeight) {
            offsetY = 0
        } else {
            offsetY = - (textHeight - displayHeight) * t;
        }

    }

    baseText.textOffsetY = offsetY;
}