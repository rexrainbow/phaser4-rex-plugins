import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { Texture } from '@phaserjs/phaser/textures/Texture';
import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';

export let DrawCanvasTexture = function (
    key: string | Texture,
    callback: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void,
    scope?: any,
    resolution: number = 1
): Texture {

    let texture: Texture;
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

    texture.setSize(
        canvas.width / resolution,
        canvas.height / resolution
    );
    if (texture.binding) {
        texture.binding.update();
    }

    return texture;
}