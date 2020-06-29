import { ICanvas } from './ICanvas';
import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';

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
    let texture = textureManager.get(key);
    let frameObject = texture.getFrame(frame);
    let resolution = canvas.resolution;
    let displayWidth = frameObject.width / resolution,
        displayHeight = frameObject.height / resolution;
    canvas.resize(displayWidth, displayHeight);

    let srcCanvas = canvas.canvas;
    let srcContext = canvas.context;
    srcContext.drawImage(texture.image as HTMLCanvasElement,
        frameObject.x, frameObject.y, frameObject.width, frameObject.height,
        0, 0, srcCanvas.width, srcCanvas.height);

    canvas.updateTexture();
}
