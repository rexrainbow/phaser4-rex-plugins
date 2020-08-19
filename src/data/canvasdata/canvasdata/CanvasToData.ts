import {
    CanvasData,
    FillFromCanvasCallbackType
} from './CanvasData';
import { IBufferConstructor } from '../../../utils/arraybuffers/IBuffer';

export function CanvasToData(
    canvas: HTMLCanvasElement,
    x: number = 0,
    y: number = 0,
    width: number = canvas.width - x,
    height: number = canvas.height - y,
    BufferClass: IBufferConstructor,
    fillCallback: FillFromCanvasCallbackType,
    fillCallbackScope: unknown,
    out?: CanvasData
): CanvasData {

    if (out === undefined) {
        out = new CanvasData(BufferClass, width, height);
    }

    out.fillFromCanvas(canvas, x, y, width, height, fillCallback, fillCallbackScope);
    return out;
}