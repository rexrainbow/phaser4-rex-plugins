import { IBoundsObject } from '../../../utils/bounds/IBoundsObject';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';
import { AlignIn } from '../../../utils/AlignIn';

class Zone implements IBoundsObject {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    originX: number = 0;
    originY: number = 0;

    setTo(
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0
    ): this {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    }

    alignIn(
        child: IBoundsObject,
        alignPositionMode: AlignPositionMode = AlignPositionMode.CENTER,
        offsetX: number = 0,
        offsetY: number = 0
    ): this {

        AlignIn(child, this, alignPositionMode, offsetX, offsetY);
        return this;
    }
}

export const AlignZone = new Zone();