import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { ISizerState } from '../util/ISizerState';
import { IAddBackgroundConfig } from './add/AddBackground';
import { IPadding } from '../util/IPadding';

export interface ISpace extends IPadding {

}

export interface IConfig {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    space?: ISpace | number;
    name?: string
}

export interface IBaseSizer extends IContainer {
    isRexSizer: boolean;
    isRexSpace: boolean; // TODO: Remove this property
    type: string;

    space: ISpace;
    name: string;
    rexSizer: ISizerState;

    needLayout: boolean;

    left: number;
    centerX: number;
    right: number;
    top: number;
    centerY: number;
    bottom: number;

    innerLeft: number;
    innerRight: number;
    innerWidth: number;
    minWidth: number;
    childrenWidth: number;
    _childrenWidth: number;

    innerTop: number;
    innerBottom: number;
    innerHeight: number;
    minHeight: number;
    childrenHeight: number;
    _childrenHeight: number;

    backgroundChildren: IBaseSizer[];
    sizerChildren: any[] | { [name: string]: any };
    childrenMap: { [name: string]: any };
    
    resize(
        width?: number,
        height?: number
    ): this;

    pin(
        child: any
    ): this;

    addBackground(
        child: any,
        config?: IAddBackgroundConfig
    ): this;

    isBackground(
        child: any
    ): boolean;

    addChildrenMap(
        key: string | number,
        child: any
    ): this;

    layout(): this;

    // Internal method
    getChildrenWidth(): number;
    // Internal method
    getChildrenHeight(): number;
    // Internal method
    getChildrenSizers(
        out?: IBaseSizer[]
    ): IBaseSizer[];
    // Internal method
    _layout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this;
    // Internal method
    preLayout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this;
    // Internal method
    layoutInit(): this;
    // Internal method
    layoutBackgrounds(): this;
    // Internal method
    postLayout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this;

};