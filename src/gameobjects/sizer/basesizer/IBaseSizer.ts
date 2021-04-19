import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { ISizerState } from '../util/ISizerState';
import { IChild } from '../util/IChild';
import { IAddBackgroundConfig } from './add/IAddBackgroundConfig';
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
    space: {
        left: number,
        right: number,
        top: number,
        bottom: number
    };
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

    sizerChildren: any;
    backgroundChildren: IChild[];
    childrenMap: { [name: string]: any };
    ignoreLayout: boolean;

    resize(
        width?: number,
        height?: number
    ): this;

    pin(
        child: IChild
    ): this;

    getSizerState(
        child: IChild
    ): ISizerState;

    addBackground(
        child: IChild,
        config?: IAddBackgroundConfig
    ): this;

    addChildrenMap(
        key: string | number,
        child: IChild
    ): this;

    layout(): this;

    // Internal method
    getChildWidth(
        child: IChild
    ): number;

    // Internal method
    getChildHeight(
        child: IChild
    ): number;

    // Internal method
    getChildrenWidth(): number;
    // Internal method
    getChildrenHeight(): number;
    // Internal method
    getExpandedChildWidth(
        child: IChild,
        parentWidth?: number
    ): number;
    // Internal method
    getExpandedChildHeight(
        child: IChild,
        parentHeight?: number
    ): number;
    // Internal method
    getChildrenSizers(
        out?: IBaseSizer[]
    ): IBaseSizer[];
    // Internal method
    runLayout(
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
    resolveWidth(width?: number): number;
    // Internal method
    resolveHeight(height?: number): number;
    // Internal method
    resolveChildrenWidth(width?: number): void;
    // Internal method
    runWidthWrap(width: number): void;
    // Internal method
    layoutChildren(): void;
    // Internal method
    layoutBackgrounds(): this;
    // Internal method
    postLayout(
        parent?: IBaseSizer,
        width?: number,
        height?: number
    ): this;
};