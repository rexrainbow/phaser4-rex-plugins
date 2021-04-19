import { BaseSizer } from '../basesizer';
import { ISizer, IConfig } from './IGridSizer';
import { IBaseSizer } from '../basesizer/IBaseSizer';
import { IChild } from '../util/IChild';
import { Init } from './Init';
import { GetChildrenSizers } from './layout/GetChildrenSizers';
import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { GetExpandedChildWidth } from './layout/GetExpandedChildWidth';
import { GetExpandedChildHeight } from './layout/GetExpandedChildHeight';
import { ResolveWidth } from './layout/ResolveWidth';
import { ResolveHeight } from './layout/ResolveHeight';
import { ResolveChildrenWidth } from './layout/ResolveChildrenWidth';
import { RunWidthWrap } from './layout/RunWidthWrap';
import { LayoutChildren } from './layout/LayoutChildren';
import { GetColumnWidth } from './layout/GetColumnWidth';
import { GetRowHeight } from './layout/GetRowHeight';

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
    _totalColumnProportions: number;
    _totalRowProportions: number;
    proportionWidthLength: number;
    proportionHeightLength: number;
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
        if (this._totalColumnProportions === undefined) {
            this._totalColumnProportions = this.columnProportions.reduce((a, b) => a + b);
        }
        return this._totalColumnProportions;
    }

    get totalRowProportions(): number {
        if (this._totalRowProportions === undefined) {
            this._totalRowProportions = this.rowProportions.reduce((a, b) => a + b);
        }
        return this._totalRowProportions;
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

    getExpandedChildWidth(
        child: IChild,
        colWidth: number
    ): number {

        return GetExpandedChildWidth(child, colWidth);
    }

    getExpandedChildHeight(
        child: IChild,
        rowHeight: number
    ): number {

        return GetExpandedChildHeight(child, rowHeight);
    }

    preLayout(): this {

        this._totalColumnProportions = undefined;
        this._totalRowProportions = undefined;
        this.proportionWidthLength = undefined;
        this.proportionHeightLength = undefined;
        super.preLayout();
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

    resolveChildrenWidth(
        width?: number
    ): void {

        ResolveChildrenWidth(this, width);
    }

    runWidthWrap(
        width: number
    ): void {

        RunWidthWrap(this, width);
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

    getColumnWidth(
        columnIndex: number
    ): number {

        return GetColumnWidth(this, columnIndex);
    }

    getRowHeight(
        rowIndex: number
    ): number {

        return GetRowHeight(this, rowIndex);
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