import { BaseCanvas } from '../canvas/BaseCanvas';
import { IConfig, MaskType, MaskTypeString } from './IMaskedImage';
import { MaskImage } from './MaskImage';

export class MaskedImage extends BaseCanvas {
    type = 'rexMaskedImage'

    constructor(
        x: number,
        y: number,
        key: string,
        frame?: string | number,
        config: MaskType | MaskTypeString | IConfig = MaskType.circle
    ) {

        super(x, y);
        MaskImage(this, key, frame, config)
    }

    maskImage(
        key: string,
        frame?: string | number,
        config: MaskType | MaskTypeString | IConfig = MaskType.circle
    ): this {

        MaskImage(this, key, frame, config);
        return this;
    }
}