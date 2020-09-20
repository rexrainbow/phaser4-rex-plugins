import { ISizer } from "../IGridSizer";
import { IChild } from '../../util/IChild';
import { Vec2Type } from '../../../../utils/types/VectorType';

export function ChildToGridIndex(
    sizer: ISizer,
    child: IChild,
    out?: Vec2Type
): Vec2Type {

    if (!child) {
        return null;
    }

    const index = sizer.grids.indexOf(child);
    if (index === -1) {
        return null;
    }

    if (out === undefined) {
        out = { x: 0, y: 0 };
    }
    out.x = index % sizer.columnCount;
    out.y = Math.floor(index / sizer.columnCount);
    return out;
}