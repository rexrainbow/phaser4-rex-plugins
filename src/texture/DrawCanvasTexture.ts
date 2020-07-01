import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { Texture } from '@phaserjs/phaser/textures/Texture';
import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';

export let DrawCanvasTexture = function (
    key: string | Texture,
    callback: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void,
    scope?: any
): void {

    let texture;
    if (typeof (key) === 'string') {
        let textureManager = TextureManagerInstance.get();
        if (!textureManager.has(key)) {
            textureManager.add(key, CanvasTexture());
        }
        texture = textureManager.get(key);
    } else {
        texture = key;
    }

    let canvas = texture.image as HTMLCanvasElement;
    let context = canvas.getContext('2d');

    if (scope) {
        callback.call(scope, canvas, context);
    } else {
        callback(canvas, context);
    }

    let canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    texture.width = canvasWidth;
    texture.height = canvasHeight;
    if (texture.binding) {
        texture.binding.update();
    }

    texture.getFrame('__BASE').setSize(canvasWidth, canvasHeight);
}