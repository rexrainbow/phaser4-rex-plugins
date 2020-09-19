import { Sizer } from '../sizer';
import { ILabel, IConfig, IText } from './ILabel';
import { IChild } from '../util/IChild';
import { IPadding } from '../util/IPadding';
import { OrientationMode } from '../util/OrientationMode';
import { AlignPositionMode } from '../../../utils/types/AlignPositionMode';

export class Label extends Sizer implements ILabel {
    type = 'rexLabel';
    childrenMap: {
        background: IChild,
        icon: IChild,
        //iconMask?:IChild,
        text: IText,
        action?: IChild,
        //actionMask?:IChild
    }

    constructor({
        // Elements
        background,
        icon,
        //iconMask,
        text,
        expandTextWidth = false,
        expandTextHeight = false,
        action,
        //actionMask,

        // Align
        align,

        // Space
        space = {}
    }: IConfig = {}) {

        super(arguments[0]);

        if (background) {
            this.addBackground(background);
        }

        // Add space
        if (
            (align === 'right') ||
            (align === 'bottom') ||
            (align === 'center')
        ) {
            this.addSpace();
        }

        if (icon) {
            let padding: IPadding;
            const iconSpace = space.icon ?? 0;
            if (this.orientation === OrientationMode.x) {
                if (text || action) {
                    padding = { right: iconSpace };
                }
            } else {
                if (text || action) {
                    padding = { bottom: iconSpace };
                }
            }

            this.add(
                icon,
                {
                    padding: padding
                }
            );

            //if (iconMask) {
            //    iconMask = this.addChildMask(icon, icon, 1); // Circle mask
            //}
        }

        if (text) {
            let proportion: number,
                padding: IPadding,
                expand: boolean;
            const textSpace = space.text ?? 0;
            if (this.orientation === OrientationMode.x) {
                proportion = (expandTextWidth) ? 1 : 0;
                if (action) {
                    padding = { right: textSpace };
                }
                expand = expandTextHeight;
            } else {
                proportion = (expandTextHeight) ? 1 : 0;
                if (action) {
                    padding = { bottom: textSpace };
                }
                expand = expandTextWidth;
            }

            this.add(
                text,
                {
                    proportion: proportion,
                    align: AlignPositionMode.CENTER,
                    padding: padding,
                    expand: expand
                }
            )
        }

        if (action) {
            this.add(action);

            //if (actionMask) {
            //    actionMask = this.addChildMask(action, action, 1); // Circle mask
            //}
        }

        // Add space
        if (align === 'center') {
            this.addSpace();
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('icon', icon);
        //this.addChildrenMap('iconMask', iconMask);
        this.addChildrenMap('text', text);
        this.addChildrenMap('action', action);
        //this.addChildrenMap('actionMask', actionMask);
    }

    get text(): string {

        const textObject = this.childrenMap.text;
        if (textObject === undefined) {
            return '';
        }

        let value: string | string[];
        if (textObject.text) {
            value = textObject.text;
            if (typeof (value) !== 'string') {
                value = value.join('\n');
            }
        } else {
            value = '';
        }
        return value;
    }

    set text(value: string) {

        const textObject = this.childrenMap.text;
        if (textObject !== undefined) {
            textObject.text = value;
        }
    }

    setText(
        value: string | string[]
    ): this {

        if (typeof (value) !== 'string') {
            value = value.join('\n');
        }
        this.text = value;
        return this;
    }

    appendText(
        value: string | string[]
    ): this {

        if (typeof (value) !== 'string') {
            value = value.join('\n');
        }
        this.text += value;
        return this;
    }

    // _layout(parent, newWidth, newHeight) {
    //     // Skip hidden or !dirty sizer
    //     if (this.rexSizer.hidden || (!this.dirty)) {
    //         return this;
    //     }
    // 
    //     super._layout(parent, newWidth, newHeight);
    //     // Pin icon-mask to icon game object
    //     //const iconMask = this.childrenMap.iconMask;
    //     //if (iconMask) {
    //     //    iconMask.setPosition();
    //     //    this.resetChildPositionState(iconMask);
    //     //}
    //     // Pin action-mask to action game object
    //     //const actionMask = this.childrenMap.actionMask;
    //     //if (actionMask) {
    //     //    actionMask.setPosition();
    //     //    this.resetChildPositionState(actionMask);
    //     //}
    //     return this;
    // }

    // resize(
    //     width: number,
    //     height: number
    // ): this {
    // 
    //     super.resize(width, height);
    //     // Resize icon-mask to icon game object
    //     // const iconMask = this.childrenMap.iconMask;
    //     // if (iconMask) {
    //     //     iconMask.resize();
    //     // }
    //     // Resize action-mask to icon game object
    //     // const actionMask = this.childrenMap.actionMask;
    //     // if (actionMask) {
    //     //     actionMask.resize();
    //     // }
    //     return this;
    // }
}