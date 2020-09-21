import { BaseSizer } from '../basesizer';
import { ISizer, IConfig, AlignMode, AlignModeString } from './IFixedWidthSizer';
import { IBaseSizer } from '../basesizer/IBaseSizer';
import { IChild } from '../util/IChild';
import { OrientationMode, OrientationModeString } from '../util/OrientationMode';
import { GetChildrenSizers } from './layout/GetChildrenSizers';
import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { Layout } from './layout/Layout';
import { LayoutInit } from './layout/LayoutInit';

import { Add } from './add/Add';
import { IAddConfig } from './add/IAddConfig';
import { AddNewLine } from './add/AddNewLine';

export class FixedWidthSizer extends BaseSizer implements ISizer {
    type: string = 'rexFixedWidthSizer';
    sizerChildren: (IChild | '\n')[] = [];
    space: {
        item: number,
        line: number
    } & IBaseSizer["space"];

    orientation: OrientationMode;
    align: AlignMode;
    rtl: boolean;

    maxChildWidth: number;
    _maxChildWidth: number;

    maxChildHeight: number;
    _maxChildHeight: number;


    constructor({
        space = {
            item: 0,
            line: 0
        },
        orientation = OrientationMode.x,
        align = AlignMode.left,
        rtl = false
    }: IConfig = {}) {

        super(arguments[0]);

        this.setOrientation(orientation);
        this.setItemSpacing(space.item);
        this.setLineSpacing(space.line);
        this.setAlign(align);
        this.setRTL(rtl);
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

    setLineSpacing(
        space: number = 0
    ): this {

        this.space.line = space;
        return this;
    }

    setAlign(
        align: AlignMode | AlignModeString
    ): this {

        if (typeof (align) === 'string') {
            align = AlignMode[align];
        }
        this.align = align;
        return this;
    }

    setRTL(
        enabled: boolean = true
    ): this {

        this.rtl = enabled;
        return this;
    }

    getChildrenSizers(
        out: IBaseSizer[] = []
    ): IBaseSizer[] {

        return GetChildrenSizers(this, out);
    }

    getChildrenWidth(): number {

        return GetChildrenWidth(this)
    }

    getChildrenHeight(): number {

        return GetChildrenHeight(this);
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
        child: IChild,
        config?: IAddConfig
    ): this {

        Add(this, child, config);
        return this;
    }

    addNewLine(): this {

        AddNewLine(this);
        return this;
    }

}