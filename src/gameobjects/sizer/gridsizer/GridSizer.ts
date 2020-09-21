import { BaseSizer } from '../basesizer';
import { ISizer, IConfig } from './IGridSizer';
import { IBaseSizer } from '../basesizer/IBaseSizer';
import { IChild } from '../util/IChild';
import { Init } from './Init';
import { GetChildrenSizers } from './layout/GetChildrenSizers';
import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { Layout } from './layout/Layout';

import { Add } from './add/Add';
import { IAddConfig } from './add/IAddConfig';
import { Remove } from './remove/Remove';
import { RemoveAt } from './remove/RemoveAt';
import { RemoveAll } from './remove/RemoveAll';
import { Clear } from './remove/Clear';

import { GetChildAt } from './child/GetChildAt';
import { ChildToGridIndex } from './child/ChildToGridIndex';
import { Vec2Type } from '../../../utils/types/VectorType';
import { ForEachEmptyGrid } from './child/ForEachEmptyGrid';
import { GetEmptyGridCount } from './child/GetEmptyGridCount'; 0


export class GridSizer extends BaseSizer implements ISizer {
    type = 'rexGridSizer';
    sizerChildren: IChild[] = [];
    space: {
        column: number[],
        row: number[]
    } & IBaseSizer["space"];

    columnCount: number;
    rowCount: number;
    columnProportions: number[] = [];
    rowProportions: number[] = [];
    columnWidth: number[] = [];
    rowHeight: number[] = [];

    constructor(config: IConfig = {}) {

        super(config);

        Init(this, config);
    }

    setColumnProportion(
        columnIndex: number,
        proportion: number
    ): this {

        if (columnIndex < this.columnProportions.length) {
            this.columnProportions[columnIndex] = proportion;
        }
        return this;
    }

    setRowProportion(
        rowIndex: number,
        proportion: number
    ): this {

        if (rowIndex < this.rowProportions.length) {
            this.rowProportions[rowIndex] = proportion;
        }
        return this;
    }

    get totalColumnProportions(): number {
        return this.columnProportions.reduce((a, b) => a + b);
    }

    get totalRowProportions(): number {
        return this.rowProportions.reduce((a, b) => a + b);
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

    add(
        child: IChild,
        config?: IAddConfig
    ): this {

        Add(this, child, config);
        return this;
    }

    remove(
        child: IChild,
        destroyChild: boolean = true
    ): this {

        Remove(this, child, destroyChild);
        return this;
    }

    removeAt(
        columnIndex: number,
        rowIndex: number,
        destroyChild: boolean = true
    ): this {

        RemoveAt(this, columnIndex, rowIndex, destroyChild);
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

    getChildAt(
        columnIndex: number,
        rowIndex: number
    ): IChild {

        return GetChildAt(this, columnIndex, rowIndex);
    }

    childToGridIndex(
        child: IChild,
        out?: Vec2Type
    ): Vec2Type {

        return ChildToGridIndex(this, child, out);
    }

    forEachEmptyGrid(
        callback: (columnIndex: number, rowIndex: number, sizer?: ISizer) => any,
        scope?: unknown
    ): this {

        ForEachEmptyGrid(this, callback, scope);
        return this;
    }

    get gridCount(): number {

        return this.sizerChildren.length;
    }

    get emptyGridCount(): number {

        return GetEmptyGridCount(this);
    }
}