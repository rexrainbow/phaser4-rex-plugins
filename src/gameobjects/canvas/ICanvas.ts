import { ISprite } from '@phaserjs/phaser/gameobjects/sprite/ISprite';

export interface ICanvas extends ISprite {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    updateTexture(
    ): this;

    resize(
        width: number,
        height: number
    ): this;

    clear(
    ): this;
}