import { ICanvas } from './ICanvas';
import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { DrawCanvasTexture } from '../../texture/canvastexture'
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

    let srcCanvas = canvas.canvas,
        srcWidth = Math.ceil(width * resolution),
        srcHeight = Math.ceil(height * resolution)

    DrawCanvasTexture(key, function (destCanvas, destContext) {
        if (destCanvas.width !== srcWidth) {
            destCanvas.width = srcWidth;
        }
        if (destCanvas.height !== srcHeight) {
            destCanvas.height = srcHeight;
        }
        destContext.clearRect(0, 0, srcWidth, srcHeight);
        destContext.drawImage(srcCanvas, x, y, srcWidth, srcHeight);
    }, undefined, canvas.resolution);
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
