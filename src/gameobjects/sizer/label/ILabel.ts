import {
    ISizer,
    IConfig as ISizerConfig,
    ISpace as ISizerSpace,
} from '../sizer/ISizer';
import { IChild } from '../util/IChild';

export interface IText extends IChild {
    text: string | string[];
}

export interface ISpace extends ISizerSpace {
    icon?: number;
    text?: number;
}

export interface IConfig extends ISizerConfig {
    background?: IChild;
    icon?: IChild;
    //iconMask?:IChild;
    text?: IText;
    expandTextWidth?: boolean;
    expandTextHeight?: boolean;
    action?: IChild;
    //actionMask?:IChild;
    align?: 'left' | 'top' | 'center' | 'right' | 'bottom';
    space?: ISpace;
}

export interface ILabel extends ISizer {

    childrenMap: {
        background: IChild,
        icon: IChild,
        //iconMask?:IChild,
        text: IText,
        action?: IChild,
        //actionMask?:IChild
    }
}