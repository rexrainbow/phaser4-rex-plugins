import { BaseText } from '../basetext/BaseText';
import { IConfig as IBaseConfig } from '../basetext/IBaseText'
import { Parser, PropType } from './Parser';

export interface IConfig extends IBaseConfig {
    tags?: { [name: string]: PropType }
}

export class TagText extends BaseText {

    constructor(
        x: number,
        y: number,
        text: string | string[] = '',
        style?: IConfig
    ) {

        const tags = (style) ? style.tags : undefined;
        super(x, y, text, style, (new Parser(tags)));

        this.type = 'rexTagText';
    }

    get parser(): Parser {

        return this.canvasText.parser as Parser;
    }

    addTag(
        name: string,
        prop: PropType
    ): this {

        this.parser.addTag(name, prop);

        return this;
    }

    addTags(
        tags: { [name: string]: PropType }
    ): this {

        for (const name in tags) {
            this.parser.addTag(name, tags[name]);
        }

        return this;
    }
}