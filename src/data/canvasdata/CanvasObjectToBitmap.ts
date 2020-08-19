import { CanvasData } from './canvasdata/CanvasData';
import { CanvasToData } from './canvasdata/CanvasToData';
import { BitBuffer } from '../../utils/arraybuffers/BitBuffer';
import { IsVisible } from './fillcallbacks/IsVisible';

interface IConfig {
    x?: number,
    y?: number,
    width?: number,
    height?: number
}

export function CanvasObjectToBitmap(
    canvasObject: { canvas: HTMLCanvasElement },
    config: IConfig | CanvasData = {},
    out?: CanvasData
): CanvasData {

    if (config instanceof CanvasData) {
        out = config;
        config = {};
    }

    const canvas = canvasObject.canvas;
    const {
        x = 0,
        y = 0,
        width = canvas.width - x,
        height = canvas.height - y
    } = config;

    return CanvasToData(
        canvas,
        x, y, width, height,
        BitBuffer,            // BufferClass
        IsVisible, undefined, // fillCallback, fillCallbackScope
        out
    );
};