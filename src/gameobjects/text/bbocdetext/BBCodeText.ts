import { BaseText } from '../basetext/BaseText';
import { IConfig } from '../basetext/IBaseText'
import { Parser } from './Parser';

export class BBCodeText extends BaseText {

    constructor(
        x: number,
        y: number,
        text: string | string[] = '',
        style?: IConfig
    ) {

        super(x, y, text, style, (new Parser()));

        this.type = 'rexBBcodeText';
    }
}