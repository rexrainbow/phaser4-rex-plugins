import { BaseText } from './BaseText';

export function FullFill(
    textObject: BaseText,
    width: number,
    height: number
):void {

    textObject.setFixedSize(width, height);
    // Remove padding
    let padding = textObject.padding;
    width -= (padding.left + padding.right);
    height -= (padding.top + padding.bottom);

    // Set wrap width
    textObject.wrapWidth = Math.max(width, 0);

    // Redraw text
    textObject.updateText();
}