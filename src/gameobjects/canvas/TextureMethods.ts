import { ICanvas } from './ICanvas';
import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';
import { DrawFrame } from '../../utils/texture/DrawFrameToCanvas';

export let GenerateTexture = function (
    canvas: ICanvas,
    key: string,
    x: number = 0,
    y: number = 0,
    width: number = canvas.width,
    height: number = canvas.height
) {
    let resolution = canvas.resolution;
    width = Math.ceil(width * resolution);
    height = Math.ceil(height * resolution);
    let srcCanvas = canvas.canvas;

    let textureManager = TextureManagerInstance.get();
    if (!textureManager.has(key)) {
        textureManager.add(key, CanvasTexture());
    }
    let texture = textureManager.get(key);
    let destCanvas = texture.image as HTMLCanvasElement;
    if (destCanvas.width !== width) {
        destCanvas.width = width;
    }
    if (destCanvas.height !== height) {
        destCanvas.height = height;
    }
    let destCtx = destCanvas.getContext('2d');
    destCtx.clearRect(0, 0, width, height);
    destCtx.drawImage(srcCanvas, x, y, width, height);

    if (texture.binding) {
        texture.binding.update();
    }

};

export let LoadTexture = function (
    canvas: ICanvas,
    key: string,
    frame?: string | number
): void {

    let textureManager = TextureManagerInstance.get();
    if (!textureManager.has(key)) {
        return;
    }

    DrawFrame(
        textureManager.get(key).getFrame(frame),
        canvas.canvas
    );

    let canvasWidth = canvas.canvas.width,
        canvasHeight = canvas.canvas.height,
        resolution = canvas.resolution;
    let displayWidth = canvasWidth / resolution;
    let displayHeight = canvasHeight / resolution;
    canvas.texture.setSize(displayWidth, displayHeight);
    canvas.setSize(displayWidth, displayHeight);
    canvas.updateTexture();
}
