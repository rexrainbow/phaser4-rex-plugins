import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';
import { DIRTY_CONST } from '@phaserjs/phaser/gameobjects/DIRTY_CONST';
import { GameInstance } from '@phaserjs/phaser/GameInstance';
import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';
import { Resize, Clear } from './CanvasMethods';

export class CanvasBase extends Sprite {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    constructor(x: number, y: number, width: number, height: number) {

        super(x, y, CanvasTexture());
        this.type = 'rexCanvas';

        const game = GameInstance.get();
        this.resolution = game.renderer.resolution;
        this.canvas = this.texture.image as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');

        this.resize(width, height);
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    updateTexture(): this {

        if (this.texture.binding) {
            this.texture.binding.update();
        }

        this.setDirty(DIRTY_CONST.TEXTURE);
        return this;
    }

    destroy(reparentChildren?: IContainer): void {
        this.texture.destroy();

        this.canvas = null;
        this.context = null;

        super.destroy(reparentChildren);
    }

    resize(width: number, height: number): this {

        Resize(this, width, height);
        return this;
    }

    clear(): this {

        Clear(this);
        return this;
    }
}