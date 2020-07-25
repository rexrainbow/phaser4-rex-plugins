import { BaseText } from '../basetext/BaseText';
import { IStyle } from '../basetext/Types'
import { Parser } from './Parser';

export class BBCodeText extends BaseText {

    constructor(
        x: number,
        y: number,
        text: string | string[] = '',
        style?: IStyle
    ) {

        super(x, y, text, style, (new Parser()));

        this.type = 'rexBBcodeText';
    }
}