import { ISizer } from '../IFixedWidthSizer';
import { BaseSizer } from '../../basesizer';
import { IChild } from '../../util/IChild';

type LineType = {
    children: IChild[],
    width: number,
    height: number
}
export type WidthWrapResultType = {
    lines: LineType[],
    width: number,
    height: number
}

export function RunChildrenWrap(
    sizer: ISizer,
    lineWidth: number,
    out?: WidthWrapResultType
): WidthWrapResultType {

    if (out === undefined) {
        out = {
            lines: [],
            width: 0,
            height: 0
        }
    } else {
        out.lines.length = 0;
        out.width = 0;
        out.height = 0;
    }

    const lines = out.lines;
    const children = sizer.sizerChildren;
    let remainder = 0;
    let lastLine: LineType;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        let child = children[i];
        let childWidth: number;
        let newLine: boolean
        if (child === '\n') {
            child = undefined;
            childWidth = 0;
            newLine = true;
        } else {
            if (child.rexSizer.hidden) {
                continue;
            }

            if (child instanceof BaseSizer) {
                child.layout(); // Use original size
            }

            childWidth = GetChildWidth(child);
            newLine = (remainder < childWidth);
        }
        // New line
        if (newLine) {
            if (lastLine) {
                lastLine.width = lineWidth - (remainder + sizer.space.item);
                out.width = Math.max(out.width, lastLine.width);
                out.height += lastLine.height + sizer.space.line;
            }

            lastLine = {
                children: [],
                width: 0,
                height: 0
            };
            lines.push(lastLine);
            remainder = lineWidth;
        }

        remainder -= (childWidth + sizer.space.item);
        if (child) {
            lastLine.children.push(child as IChild);
            const childHeight = GeChildHeight(child as IChild);
            lastLine.height = Math.max(lastLine.height, childHeight);
        }
    }

    if (lastLine) {
        lastLine.width = lineWidth - (remainder + sizer.space.item);
        out.width = Math.max(out.width, lastLine.width);
        out.height += lastLine.height;
    }
    return out;
}

function GetChildWidth(child: IChild): number {
    const padding = child.rexSizer.padding;
    return child.width + padding.left + padding.right;
}

function GeChildHeight(child: IChild): number {
    const padding = child.rexSizer.padding;
    return child.height + padding.top + padding.bottom;
}