import { BaseText } from '../basetext/BaseText';
import { Parser } from './Parser';

export class BBCodeText extends BaseText {

    constructor(
        x: number,
        y: number,
        text: string | string[] = '',
        font?: string,
        fillStyle?: string | CanvasGradient | CanvasPattern
    ) {

        super(x, y, text, font, fillStyle, (new Parser()));

        this.type = 'rexBBcodeText';
    }
}