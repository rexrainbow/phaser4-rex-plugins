import { IBaseText } from './IBaseText';
import { Clamp } from '@phaserjs/phaser/math/Clamp'


export function SetTextOffsetY(
    baseText: IBaseText,
    offsetY: number,
    isPercent: boolean = false
): void {

    if (isPercent) {
        const t = Clamp(offsetY, 0, 1);
        const displayHeight = baseText.displayTextHeight;
        const totalTextHeight = baseText.totalTextHeight;
        if (totalTextHeight <= displayHeight) {
            offsetY = 0
        } else {
            offsetY = - (totalTextHeight - displayHeight) * t;
        }

    }

    baseText.textOffsetY = offsetY;
}