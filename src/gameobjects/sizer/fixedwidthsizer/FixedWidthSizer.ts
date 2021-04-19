import { BaseSizer } from '../basesizer';
import { ISizer, IConfig, AlignMode, AlignModeString } from './IFixedWidthSizer';
import { IBaseSizer } from '../basesizer/IBaseSizer';
import { IChild } from '../util/IChild';
import { WidthWrapResultType } from './layout/RunChildrenWrap';
import { GetMaxChildWidth } from './layout/GetMaxChildWidth';
import { GetMaxChildHeight } from './layout/GetMaxChildHeight';
import { GetChildrenSizers } from './layout/GetChildrenSizers';
import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { PreLayout } from './layout/PreLayout';
import { RunWidthWrap } from './layout/RunWidthWrap';
import { LayoutChildren } from './layout/LayoutChildren';

import { Add } from './add/Add';
import { IAddConfig } from './add/IAddConfig';
import { AddNewLine } from './add/AddNewLine';
import { Remove } from './remove/Remove';
import { RemoveAll } from './remove/RemoveAll';
import { Clear } from './remove/Clear';

export class FixedWidthSizer extends BaseSizer implements ISizer {
    type: string = 'rexFixedWidthSizer';
    sizerChildren: (IChild | '\n')[] = [];
    space: {
        item: number,
        line: number
    } & IBaseSizer["space"];

    widthWrapResult: WidthWrapResultType;
    align: AlignMode;
    rtl: boolean;

    _maxChildWidth: number;
    _maxChildHeight: number;


    constructor({
        space = {
            item: 0,
            line: 0
        },
        align = AlignMode.left,
        rtl = false
    }: IConfig = {}) {

        super(arguments[0]);

        this.setItemSpacing(space.item);
        this.setLineSpacing(space.line);
        this.setAlign(align);
        this.setRTL(rtl);
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

    get maxChildWidth() {
        if (this._maxChildWidth === undefined) {
            this._maxChildWidth = GetMaxChildWidth(this);
        }
        return this._maxChildWidth;
    }

    get maxChildHeight() {
        if (this._maxChildHeight === undefined) {
            this._maxChildHeight = GetMaxChildHeight(this);
        }
        return this._maxChildHeight;
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

    preLayout(): this {

        PreLayout(this)
        return this;
    }

    runWidthWrap(
        width: number
    ): void {

        RunWidthWrap(this, width);
    }

    layoutChildren() {

        LayoutChildren(this);
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