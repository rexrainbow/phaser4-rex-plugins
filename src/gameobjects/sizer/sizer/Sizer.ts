import { BaseSizer } from '../basesizer';
import { ISizer, IConfig } from './ISizer';
import { IBaseSizer } from '../basesizer/IBaseSizer';
import { IChild } from '../util/IChild';
import { OrientationMode, OrientationModeString } from '../util/OrientationMode';
import { GetChildrenSizers } from './layout/GetChildrenSizers';
import { GetChildrenProportion } from './layout/GetChildrenProportion';
import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { GetExpandedChildWidth } from './layout/GetExpandedChildWidth';
import { GetExpandedChildHeight } from './layout/GetExpandedChildHeight';
import { PreLayout } from './layout/PreLayout';
import { ResolveWidth } from './layout/ResolveWidth';
import { ResolveHeight } from './layout/ResolveHeight';
import { LayoutChildren } from './layout/LayoutChildren';

import { Add } from './add/Add';
import { IAddConfig } from './add/IAddConfig';
import { AddSpace } from './add/AddSpace';
import { Remove } from './remove/Remove';
import { RemoveAll } from './remove/RemoveAll';
import { Clear } from './remove/Clear';

export class Sizer extends BaseSizer implements ISizer {
    type: string = 'rexSizer';
    sizerChildren: IChild[] = [];
    space: {
        item: number
    } & IBaseSizer["space"];

    orientation: OrientationMode;
    _childrenProportion: number;
    proportionLength: number;


    constructor({
        space = { item: 0 },
        orientation = OrientationMode.x
    }: IConfig = {}) {

        super(arguments[0]);

        this.setOrientation(orientation);
        this.setItemSpacing(space.item);
    }

    setOrientation(
        orientation: OrientationMode | OrientationModeString
    ): this {

        if (typeof (orientation) === 'string') {
            orientation = OrientationMode[orientation];
        }
        this.orientation = orientation;
        return this;
    }

    setItemSpacing(
        space: number = 0
    ): this {

        this.space.item = space;
        return this;
    }

    get childrenProportion() {
        if (this._childrenProportion === undefined) {
            this._childrenProportion = GetChildrenProportion(this);
        }
        return this._childrenProportion;
    }

    getChildrenSizers(
        out: IBaseSizer[] = []
    ): IBaseSizer[] {

        return GetChildrenSizers(this, out);
    }

    getChildrenWidth(
        minimumMode: boolean = true
    ): number {

        return GetChildrenWidth(this, minimumMode)
    }

    getChildrenHeight(
        minimumMode: boolean = true
    ): number {

        return GetChildrenHeight(this, minimumMode);
    }

    getExpandedChildWidth(
        child: IChild,
        parentWidth?: number
    ): number {

        return GetExpandedChildWidth(this, child, parentWidth);
    }

    getExpandedChildHeight(
        child: IChild,
        parentHeight?: number
    ): number {

        return GetExpandedChildHeight(this, child, parentHeight);
    }

    preLayout(): this {

        PreLayout(this);
        return this;
    }

    resolveWidth(
        width?: number
    ): number {

        return ResolveWidth(this, width);
    }

    resolveHeight(
        height?: number
    ): number {

        return ResolveHeight(this, height);
    }

    layoutChildren(): this {

        LayoutChildren(this);
        return this;
    }

    add(
        child: IChild,
        config?: IAddConfig
    ): this {

        Add(this, child, config);
        return this;
    }

    addSpace(
        proportion: number = 1
    ): this {

        AddSpace(this, proportion);
        return this;
    }

    remove(
        child: IChild,
        destroyChild: boolean = true
    ): this {

        Remove(this, child, destroyChild);
        return this;
    }

    removeAll(
        destroyChild: boolean = true
    ): this {

        RemoveAll(this, destroyChild);
        return this;
    }

    clear(
        destroyChild: boolean = true
    ): this {

        Clear(this, destroyChild);
        return this;
    }
}