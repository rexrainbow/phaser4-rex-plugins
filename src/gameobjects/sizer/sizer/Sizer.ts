import { BaseSizer } from '../basesizer/BaseSizer';
import { IConfig, ISpace } from './ISizer';
import { IBaseSizer } from '../basesizer/IBaseSizer'
import { OrientationMode, OrientationModeString } from '../util/OrientationMode';
import { GetChildrenProportion } from './layout/GetChildrenProportion';
import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { GetChildrenSizers } from './layout/GetChildrenSizers';
import { Layout } from './layout/Layout';
import { LayoutInit } from './layout/LayoutInit';
import { Add, IAddConfig } from './add/Add';
import { AddSpace } from './add/AddSpace';

export class Sizer extends BaseSizer {
    type: string = 'sizer';
    space: ISpace;
    orientation: OrientationMode;
    _childrenProportion: number;
    proportionLength: number;
    sizerChildren: IBaseSizer[] = [];

    constructor({
        space = { item: 0 },
        orientation
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

    getChildrenSizers(
        out: IBaseSizer[] = []
    ): IBaseSizer[] {

        return GetChildrenSizers(this, out);
    }

    _layout(
        parent?: IBaseSizer,
        minWidth?: number,
        minHeight?: number
    ): this {

        Layout(this, parent, minWidth, minHeight);
        return this;
    }

    layoutInit(): this {

        LayoutInit(this);
        return this;
    }

    add(
        child: any,
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
}