import { BaseSizer } from '../basesizer';
import { ISizer, IConfig } from './IGridSizer';
import { IBaseSizer } from '../basesizer/IBaseSizer';
import { IChild } from '../util/IChild';
import { Init } from './Init';
import { Vec2Type } from '../../../utils/types/VectorType';

import { GetChildrenWidth } from './layout/GetChildrenWidth';
import { GetChildrenHeight } from './layout/GetChildrenHeight';
import { Layout } from './layout/Layout';

import { Add } from './add/Add';
import { IAddConfig } from './add/IAddConfig';

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

    getChildAt(
        columnIndex: number,
        rowIndex: number
    ): IChild {

        return this.sizerChildren[(rowIndex * this.columnCount) + columnIndex];
    }

    childToGridIndex(
        child: IChild,
        out?: Vec2Type
    ): Vec2Type {

        if (!child) {
            return null;
        }

        const index = this.sizerChildren.indexOf(child);
        if (index === -1) {
            return null;
        }

        if (out === undefined) {
            out = { x: 0, y: 0 };
        }
        out.x = index % this.columnCount;
        out.y = Math.floor(index / this.columnCount);
        return out;
    }
}