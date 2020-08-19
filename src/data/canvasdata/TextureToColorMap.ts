import { CanvasData } from './canvasdata/CanvasData';
import { CanvasToData } from './canvasdata/CanvasToData';
import { FourBytesBuffer } from '../../utils/arraybuffers/FourBytesBuffer';
import { GetColor32 } from './fillcallbacks/GetColor32';
import { DrawFrame } from '../../utils/texture/DrawFrameToCanvas';
import { Frame } from '@phaserjs/phaser/textures/Frame';
import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite'
import { CreateCanvas } from '@phaserjs/phaser/textures/CreateCanvas'

interface IConfig {
    x?: number,
    y?: number,
    width?: number,
    height?: number
}

export function TextureToColorMap(
    key: string | Frame | Sprite,
    frameName?: string,
    config: IConfig | CanvasData = {},
    out?: CanvasData
): CanvasData {

    let frame: Frame;
    if (typeof (key) === 'string') {
        const textureManager = TextureManagerInstance.get();
        frame = textureManager.get(key).getFrame(frameName);
    } else if (key instanceof Frame) {
        frame = key;
    } else if (key instanceof Sprite) {
        frame = key.frame;
    }

    if (config instanceof CanvasData) {
        out = config;
        config = {};
    }

    const canvas = DrawFrame(frame, CreateCanvas(1, 1).canvas);
    const {
        x = 0,
        y = 0,
        width = canvas.width - x,
        height = canvas.height - y
    } = config;

    out = CanvasToData(
        canvas,
        x, y, width, height,
        FourBytesBuffer,       // BufferClass
        GetColor32, undefined, // fillCallback, fillCallbackScope
        out
    );

    canvas.width = 1;
    canvas.height = 1;
    return out;
};