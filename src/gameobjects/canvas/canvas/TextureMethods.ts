import { ICanvas } from './ICanvas';
import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { DrawCanvasTexture } from '../../../texture/canvastexture'
import { DrawFrame } from '../../../utils/texture/DrawFrameToCanvas';

export function GenerateTexture(
    canvas: ICanvas,
    key: string,
    x: number = 0,
    y: number = 0,
    width: number = canvas.width,
    height: number = canvas.height
) {

    const resolution = canvas.resolution;
    const srcCanvas = canvas.canvas;
    const srcWidth = Math.ceil(width * resolution);
    const srcHeight = Math.ceil(height * resolution);

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

export function LoadTexture(
    canvas: ICanvas,
    key: string,
    frame?: string | number
): void {

    const textureManager = TextureManagerInstance.get();
    if (!textureManager.has(key)) {
        return;
    }

    DrawFrame(
        textureManager.get(key).getFrame(frame),
        canvas.canvas
    );

    const canvasWidth = canvas.canvas.width;
    const canvasHeight = canvas.canvas.height;
    const resolution = canvas.resolution;
    const displayWidth = canvasWidth / resolution;
    const displayHeight = canvasHeight / resolution;
    canvas.texture.setSize(displayWidth, displayHeight);
    canvas.setSize(displayWidth, displayHeight);
    canvas.updateTexture();
}
